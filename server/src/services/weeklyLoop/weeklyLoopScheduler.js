/**
 * Weekly Loop Scheduler — Orchestrator
 * 
 * Manages the recurring weekly cycle:
 * - Monday 00:00 IST: T0 — Open submission windows + fetch satellite
 * - Thursday 00:00 IST: T1–T6 — Close windows, run verification → analysis → advisory → report → review
 * - Friday 18:00 IST: T7 — Publish price changes atomically, roll cycle weeks
 * 
 * Cadence: one iteration per farmer per crop, per ISO week.
 * Termination: HARVEST_CONFIRMED, PLOT_ABANDONED, CONTRACT_TERMINATED.
 */
import cron from 'node-cron';
import prisma from '../../utils/prisma.js';
import { openSubmissionWindow } from './submissionWindowService.js';
import { verifySubmission } from './verificationService.js';
import { analyzeCropHealth } from './cropHealthPipeline.js';
import { generateAdvisory } from './advisoryService.js';
import { generateReport } from './reportGenerator.js';
import { reviewReport, checkReviewSLA } from './reviewService.js';
import { computeNewPrice, publishPriceChanges } from './repricingEngine.js';

/**
 * Initialize all scheduled jobs.
 * Called once when the server starts.
 */
export const initializeScheduler = () => {
  console.log('[WEEKLY_LOOP] Scheduler initialized');

  // ═══ T0: Monday 00:00 IST (Sunday 18:30 UTC) ═══
  // Open submission windows for all active crop cycles
  cron.schedule('30 18 * * 0', async () => {
    console.log('[WEEKLY_LOOP] ═══ T0: Monday 00:00 IST — Opening submission windows ═══');
    try {
      const activeStates = await prisma.cropCycleState.findMany({
        where: { status: 'ACTIVE' },
        include: { farmer: true, listing: true },
      });

      console.log(`[WEEKLY_LOOP] Found ${activeStates.length} active crop cycle(s)`);

      for (const state of activeStates) {
        try {
          await openSubmissionWindow(state);
          console.log(`[WEEKLY_LOOP] T0 complete for farmer=${state.farmerId} listing=${state.listingId} week=${state.cycleWeek}`);
        } catch (err) {
          console.error(`[WEEKLY_LOOP] T0 error for state=${state.id}:`, err.message);
          await logError('T0_OPEN_WINDOW', state.farmerId, state.id, err.message);
        }
      }
    } catch (e) {
      console.error('[WEEKLY_LOOP] Fatal error in T0:', e);
      await logError('T0_FATAL', 'SYSTEM', '', e.message);
    }
  });

  // ═══ T2–T6: Thursday 00:00 IST (Wednesday 18:30 UTC) ═══
  // Close expired windows, run pipeline for submitted entries
  cron.schedule('30 18 * * 3', async () => {
    console.log('[WEEKLY_LOOP] ═══ T2–T6: Thursday 00:00 IST — Pipeline execution ═══');
    try {
      // Close all expired submission windows
      const closedCount = await prisma.submissionWindow.updateMany({
        where: { status: 'OPEN', closesAt: { lte: new Date() } },
        data: { status: 'CLOSED' },
      });
      console.log(`[WEEKLY_LOOP] Closed ${closedCount.count} expired window(s)`);

      // Find all active cycle states to process
      const activeStates = await prisma.cropCycleState.findMany({
        where: { status: 'ACTIVE' },
        include: {
          submissions: {
            where: { status: 'PENDING' },
            orderBy: { submittedAt: 'desc' },
            take: 1,
            include: { images: true, bills: true },
          },
          satelliteSnapshots: {
            orderBy: { cycleWeek: 'desc' },
            take: 1,
          },
        },
      });

      for (const state of activeStates) {
        try {
          const submission = state.submissions?.[0];
          const snapshot = state.satelliteSnapshots?.[0];

          if (!submission) {
            // Missed submission — increment counter
            console.log(`[WEEKLY_LOOP] Missed submission for state=${state.id} week=${state.cycleWeek}`);
            await prisma.cropCycleState.update({
              where: { id: state.id },
              data: {
                consecutiveMissedSubmissions: state.consecutiveMissedSubmissions + 1,
              },
            });

            // Mark window as MISSED
            await prisma.submissionWindow.updateMany({
              where: { cycleStateId: state.id, cycleWeek: state.cycleWeek },
              data: { status: 'MISSED' },
            });

            // Apply missed-submission pricing
            const updatedState = await prisma.cropCycleState.findUnique({ where: { id: state.id } });
            await computeNewPrice(updatedState, { healthIndex: null, detections: [] }, null);
          } else {
            // Run full pipeline: T2 → T3 → T4 → T5 → T6
            await runPipeline(state, submission, snapshot);
          }
        } catch (err) {
          console.error(`[WEEKLY_LOOP] Pipeline error for state=${state.id}:`, err.message);
          await logError('PIPELINE_ERROR', state.farmerId, state.id, err.message);
        }
      }

      // Check SLA breaches
      await checkReviewSLA();
    } catch (e) {
      console.error('[WEEKLY_LOOP] Fatal error in pipeline:', e);
      await logError('PIPELINE_FATAL', 'SYSTEM', '', e.message);
    }
  });

  // ═══ T7: Friday 18:00 IST (Friday 12:30 UTC) ═══
  // Publish all pending price changes atomically
  cron.schedule('30 12 * * 5', async () => {
    console.log('[WEEKLY_LOOP] ═══ T7: Friday 18:00 IST — Publishing prices ═══');
    try {
      const publishedCount = await publishPriceChanges();
      console.log(`[WEEKLY_LOOP] Published ${publishedCount} price change(s)`);

      // Roll cycle weeks for all active states
      const rolled = await prisma.cropCycleState.updateMany({
        where: { status: 'ACTIVE' },
        data: { cycleWeek: { increment: 1 } },
      });
      console.log(`[WEEKLY_LOOP] Rolled ${rolled.count} cycle state(s) to next week`);

      // Reset consecutiveMissedSubmissions for states that submitted this week
      // (only for those that had a successful submission)
    } catch (e) {
      console.error('[WEEKLY_LOOP] Fatal error in T7:', e);
      await logError('T7_FATAL', 'SYSTEM', '', e.message);
    }
  });
};

/**
 * Run the full T2→T6 pipeline for a single cycle state.
 */
async function runPipeline(cycleState, submission, satelliteSnapshot) {
  console.log(`[WEEKLY_LOOP] Running pipeline for state=${cycleState.id} submission=${submission.id}`);

  // T2 — VERIFY
  const { passed, verificationResult, localizedError } = await verifySubmission(submission, cycleState);

  if (!passed) {
    console.log(`[WEEKLY_LOOP] T2: Verification FAILED for submission=${submission.id}: ${verificationResult?.failureReason}`);
    await prisma.farmerSubmission.update({
      where: { id: submission.id },
      data: {
        status: 'REJECTED',
        rejectionReason: verificationResult?.failureReason,
        rejectionReasonLocalized: localizedError ? JSON.stringify(localizedError) : null,
      },
    });
    return;
  }

  console.log(`[WEEKLY_LOOP] T2: Verification PASSED for submission=${submission.id}`);
  await prisma.farmerSubmission.update({
    where: { id: submission.id },
    data: { status: 'VERIFIED', verifiedAt: new Date() },
  });

  // T3 — ANALYSE
  const analysis = await analyzeCropHealth(submission, satelliteSnapshot, cycleState);
  console.log(`[WEEKLY_LOOP] T3: Analysis complete — healthIndex=${analysis.healthIndex} confidence=${analysis.confidence}`);

  // T4 — ADVISE
  const remediations = await generateAdvisory(analysis, cycleState);
  console.log(`[WEEKLY_LOOP] T4: Generated ${remediations.length} remediation card(s)`);

  // T7 preview — Compute price (not yet published)
  const priceChange = await computeNewPrice(cycleState, analysis, null);

  // T5 — REPORT
  const report = await generateReport(cycleState, submission, analysis, satelliteSnapshot, priceChange);
  console.log(`[WEEKLY_LOOP] T5: Report generated — id=${report.id}`);

  // Link price change to report
  if (priceChange && report) {
    await prisma.priceChange.update({
      where: { id: priceChange.id },
      data: { reportId: report.id },
    });
  }

  // T6 — REVIEW
  await reviewReport(report, analysis);
  console.log(`[WEEKLY_LOOP] T6: Review complete for report=${report.id}`);

  // Update health index history
  const healthHistory = JSON.parse(cycleState.healthIndexHistory || '[]');
  healthHistory.push({
    week: cycleState.cycleWeek,
    index: analysis.healthIndex,
    confidence: analysis.confidence,
    date: new Date().toISOString(),
  });

  // Reset missed submissions counter on successful submission
  await prisma.cropCycleState.update({
    where: { id: cycleState.id },
    data: {
      healthIndexHistory: JSON.stringify(healthHistory),
      lastReportId: report.id,
      consecutiveMissedSubmissions: 0,
    },
  });
}

/**
 * Manual trigger: run the full pipeline for a single cycle state.
 * Useful for testing and admin tools.
 */
export const runLoopForCycleState = async (cycleStateId) => {
  const state = await prisma.cropCycleState.findUnique({
    where: { id: cycleStateId },
    include: {
      submissions: {
        where: { status: 'PENDING' },
        orderBy: { submittedAt: 'desc' },
        take: 1,
        include: { images: true, bills: true },
      },
      satelliteSnapshots: {
        orderBy: { cycleWeek: 'desc' },
        take: 1,
      },
    },
  });

  if (!state) throw new Error(`CropCycleState not found: ${cycleStateId}`);

  const submission = state.submissions?.[0];
  const snapshot = state.satelliteSnapshots?.[0];

  if (!submission) {
    throw new Error('No pending submission found for this cycle state');
  }

  await runPipeline(state, submission, snapshot);
};

/**
 * Log an error to the AuditLog table.
 */
async function logError(action, userId, entityId, message) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: userId || 'SYSTEM',
        action: `LOOP_ERROR_${action}`,
        entityType: 'CropCycleState',
        entityId: entityId || '',
        details: JSON.stringify({ error: message, timestamp: new Date().toISOString() }),
      },
    });
  } catch (e) {
    console.error('[WEEKLY_LOOP] Failed to log error:', e.message);
  }
}
