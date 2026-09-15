/**
 * Repricing Engine — T7
 * 
 * Deterministic, auditable pricing function.
 * Every price change writes a factor attribution record.
 * Published in advance to investors.
 */
import prisma from '../../utils/prisma.js';
import { notifyFarmer, notifyFieldAgent, notifyAdmin } from './notificationService.js';
import crypto from 'crypto';

// Default weights — configurable
const WEIGHTS = {
  w1: 0.30, // Δhealth_index
  w2: 0.15, // growth_stage_progress
  w3: 0.15, // input_compliance
  w4: 0.15, // market_price_signal
  w5: 0.15, // disease_penalty
  w6: 0.10, // non_submission_penalty
};

const GROWTH_STAGE_MAP = {
  VEGETATIVE: 0.25,
  FLOWERING: 0.50,
  FRUITING: 0.75,
  MATURITY: 1.00,
};

const SEVERITY_WEIGHTS = {
  LOW: 0.1,
  MODERATE: 0.3,
  SEVERE: 0.6,
};

const MAX_CLAMP_PCT = 8;
const CIRCUIT_BREAKER_PCT = 15;

/**
 * Compute a new price for a crop cycle state based on this week's analysis.
 * @param {Object} cycleState — CropCycleState from Prisma
 * @param {Object} analysis — CropHealthAnalysis with detections
 * @param {Object|null} report — WeeklyCropReport (optional, for linking)
 * @returns {Object} PriceChange record
 */
export const computeNewPrice = async (cycleState, analysis, report) => {
  const priorPrice = cycleState.currentPriceInr || 100;
  
  // Parse health history to get previous health index
  const healthHistory = JSON.parse(cycleState.healthIndexHistory || '[]');
  const prevHealthIndex = healthHistory.length > 0
    ? healthHistory[healthHistory.length - 1].index
    : 65;

  // --- Factor 1: Δhealth_index ---
  const currentHealthIndex = analysis?.healthIndex ?? prevHealthIndex;
  let deltaHealthIndex = (currentHealthIndex - prevHealthIndex) / 100;
  deltaHealthIndex = Math.max(-1, Math.min(1, deltaHealthIndex));

  // --- Factor 2: Growth stage progress ---
  const growthStageProgress = GROWTH_STAGE_MAP[cycleState.cropStage] || 0.25;

  // --- Factor 3: Input compliance (stub — uses 0.8 default) ---
  const inputCompliance = 0.8;

  // --- Factor 4: Market price signal (stub — no market data yet) ---
  const marketSignal = 0.0;

  // --- Factor 5: Disease penalty ---
  const detections = analysis?.detections || [];
  let diseasePenalty = 0;
  for (const d of detections) {
    const severityWeight = SEVERITY_WEIGHTS[d.severity] || 0;
    const affectedPct = (d.affectedPct || 0) / 100;
    diseasePenalty += severityWeight * affectedPct;
  }

  // --- Factor 6: Non-submission penalty ---
  const missedCount = cycleState.consecutiveMissedSubmissions || 0;
  const nonSubmissionPenalty = missedCount * 0.05;

  // Compute Δprice%
  const deltaPct = (
    WEIGHTS.w1 * deltaHealthIndex +
    WEIGHTS.w2 * growthStageProgress +
    WEIGHTS.w3 * inputCompliance +
    WEIGHTS.w4 * marketSignal -
    WEIGHTS.w5 * diseasePenalty -
    WEIGHTS.w6 * nonSubmissionPenalty
  ) * 100; // convert to percentage

  // Apply clamping and circuit breaker
  let actualDelta = deltaPct;
  let clamped = false;
  let circuitBreakerTriggered = false;

  if (Math.abs(deltaPct) > CIRCUIT_BREAKER_PCT) {
    circuitBreakerTriggered = true;
    actualDelta = 0; // No price change — escalate to admin
    await notifyAdmin('CIRCUIT_BREAKER_TRIGGERED', {
      cycleStateId: cycleState.id,
      computedDelta: deltaPct,
    });
  } else if (Math.abs(deltaPct) > MAX_CLAMP_PCT) {
    actualDelta = MAX_CLAMP_PCT * Math.sign(deltaPct);
    clamped = true;
  }

  // Missed submission overrides
  let newPrice = priorPrice * (1 + actualDelta / 100);

  if (missedCount === 1) {
    // Week 1: price frozen + warning
    newPrice = priorPrice;
    await notifyFarmer(cycleState.farmerId, 'SUBMISSION_MISSED_WARNING', {}, 'en');
  } else if (missedCount === 2) {
    // Week 2: -3% penalty
    newPrice = priorPrice * 0.97;
    await notifyFarmer(cycleState.farmerId, 'SUBMISSION_MISSED_PENALTY', {}, 'en');
  } else if (missedCount >= 3) {
    // Week 3+: instrument suspended
    newPrice = priorPrice;
    await prisma.cropCycleState.update({
      where: { id: cycleState.id },
      data: { status: 'CONTRACT_TERMINATED' },
    });
    await notifyFieldAgent(cycleState.farmerId, 'CONTRACT_TERMINATED_MISSED_SUBMISSIONS', {
      cycleStateId: cycleState.id,
    });
  }

  // Floor at ₹1
  newPrice = Math.max(Math.round(newPrice * 100) / 100, 1);
  const finalDeltaPercent = priorPrice > 0
    ? ((newPrice - priorPrice) / priorPrice) * 100
    : 0;

  // Compute publish time — next Friday 18:00 IST (12:30 UTC)
  const publishAt = getNextFriday1800IST();

  // Create PriceChange record (linked to report if available)
  const priceChangeData = {
    cycleStateId: cycleState.id,
    cycleWeek: cycleState.cycleWeek,
    priorPriceInr: priorPrice,
    newPriceInr: newPrice,
    deltaPercent: Math.round(finalDeltaPercent * 100) / 100,
    clamped,
    circuitBreakerTriggered,
    publishAt,
    published: false,
  };

  // Link to report if provided
  if (report?.id) {
    priceChangeData.reportId = report.id;
  }

  const priceChange = await prisma.priceChange.create({
    data: priceChangeData,
  });

  // Create factor attributions
  const attributions = [
    {
      priceChangeId: priceChange.id,
      factor: 'HEALTH_INDEX',
      weight: WEIGHTS.w1,
      rawValue: deltaHealthIndex,
      basisPoints: Math.round(WEIGHTS.w1 * deltaHealthIndex * 10000),
      description: `Health index changed from ${prevHealthIndex} to ${currentHealthIndex}`,
    },
    {
      priceChangeId: priceChange.id,
      factor: 'GROWTH_STAGE',
      weight: WEIGHTS.w2,
      rawValue: growthStageProgress,
      basisPoints: Math.round(WEIGHTS.w2 * growthStageProgress * 10000),
      description: `Crop stage: ${cycleState.cropStage}`,
    },
    {
      priceChangeId: priceChange.id,
      factor: 'INPUT_COMPLIANCE',
      weight: WEIGHTS.w3,
      rawValue: inputCompliance,
      basisPoints: Math.round(WEIGHTS.w3 * inputCompliance * 10000),
      description: 'Input compliance ratio (stub: 0.8)',
    },
    {
      priceChangeId: priceChange.id,
      factor: 'MARKET_SIGNAL',
      weight: WEIGHTS.w4,
      rawValue: marketSignal,
      basisPoints: Math.round(WEIGHTS.w4 * marketSignal * 10000),
      description: 'Market price signal (stub: no data)',
    },
    {
      priceChangeId: priceChange.id,
      factor: 'DISEASE_PENALTY',
      weight: WEIGHTS.w5,
      rawValue: -diseasePenalty,
      basisPoints: Math.round(-WEIGHTS.w5 * diseasePenalty * 10000),
      description: `${detections.length} detection(s) — penalty ${(diseasePenalty * 100).toFixed(1)}%`,
    },
    {
      priceChangeId: priceChange.id,
      factor: 'NON_SUBMISSION_PENALTY',
      weight: WEIGHTS.w6,
      rawValue: -nonSubmissionPenalty,
      basisPoints: Math.round(-WEIGHTS.w6 * nonSubmissionPenalty * 10000),
      description: `${missedCount} consecutive missed submission(s)`,
    },
  ];

  await prisma.priceAttribution.createMany({ data: attributions });

  console.log(`[REPRICE] Cycle ${cycleState.id}: ₹${priorPrice} → ₹${newPrice} (${finalDeltaPercent.toFixed(2)}%) ${clamped ? '[CLAMPED]' : ''} ${circuitBreakerTriggered ? '[CIRCUIT BREAKER]' : ''}`);

  return priceChange;
};

/**
 * Publish all pending price changes atomically.
 * Called Friday 18:00 IST.
 */
export const publishPriceChanges = async () => {
  const pending = await prisma.priceChange.findMany({
    where: {
      published: false,
      publishAt: { lte: new Date() },
      circuitBreakerTriggered: false,
    },
    include: { cycleState: true },
  });

  console.log(`[REPRICE] Publishing ${pending.length} price change(s)`);

  for (const pc of pending) {
    // Update listing stock price
    await prisma.listing.update({
      where: { id: pc.cycleState.listingId },
      data: { stockPrice: pc.newPriceInr },
    });

    // Update cycle state
    const priceHistory = JSON.parse(pc.cycleState.priceHistory || '[]');
    priceHistory.push({
      week: pc.cycleWeek,
      price: pc.newPriceInr,
      delta: pc.deltaPercent,
      date: new Date().toISOString(),
    });

    await prisma.cropCycleState.update({
      where: { id: pc.cycleStateId },
      data: {
        currentPriceInr: pc.newPriceInr,
        priceHistory: JSON.stringify(priceHistory),
      },
    });

    // Mark as published
    await prisma.priceChange.update({
      where: { id: pc.id },
      data: { published: true },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: pc.cycleState.farmerId,
        action: 'PRICE_PUBLISHED',
        entityType: 'PriceChange',
        entityId: pc.id,
        details: JSON.stringify({
          priorPrice: pc.priorPriceInr,
          newPrice: pc.newPriceInr,
          deltaPercent: pc.deltaPercent,
        }),
      },
    });
  }

  return pending.length;
};

/**
 * Get the next Friday 18:00 IST (12:30 UTC).
 */
function getNextFriday1800IST() {
  const now = new Date();
  const friday = new Date(now);
  const dayOfWeek = friday.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
  friday.setDate(friday.getDate() + daysUntilFriday);
  friday.setUTCHours(12, 30, 0, 0);
  return friday;
}
