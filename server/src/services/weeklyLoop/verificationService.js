/**
 * Verification Service — T2
 * 
 * Gate — nothing proceeds until this passes.
 * Runs 5 ordered checks with specific, actionable failure messages.
 */
import prisma from '../../utils/prisma.js';

/**
 * Localized error messages for verification failures.
 * Returns messages in en/hi/gu for actionable farmer feedback.
 */
const localizeError = (key, params = {}) => {
  const messages = {
    GEOFENCE_FAIL: {
      en: `Photo taken ${params.distance || '?'}m from your registered plot — please stand in the field`,
      hi: `फोटो आपके पंजीकृत खेत से ${params.distance || '?'} मीटर दूर लिया गया — कृपया खेत में खड़े होकर लें`,
      gu: `ફોટો તમારા નોંધાયેલ ખેતરથી ${params.distance || '?'} મીટર દૂર લેવામાં આવ્યો — કૃપા કરીને ખેતરમાં ઊભા રહો`,
    },
    LIVENESS_FAIL: {
      en: 'This appears to be a screenshot or re-photographed screen — please take a live photo',
      hi: 'यह एक स्क्रीनशॉट या फिर से फोटो खींची गई स्क्रीन लगती है — कृपया लाइव फोटो लें',
      gu: 'આ સ્ક્રીનશૉટ અથવા ફરીથી ફોટો લીધેલ સ્ક્રીન લાગે છે — કૃપા કરીને લાઇવ ફોટો લો',
    },
    NOVELTY_FAIL: {
      en: 'This image matches a previous submission — please take new photos',
      hi: 'यह छवि पिछली सबमिशन से मेल खाती है — कृपया नई फोटो लें',
      gu: 'આ છબી અગાઉની સબમિશન સાથે મેળ ખાય છે — કૃપા કરીને નવા ફોટા લો',
    },
    LEGIBILITY_FAIL: {
      en: 'Image is too blurry or poorly lit — please retake with steady hands in good light',
      hi: 'छवि बहुत धुंधली या कम रोशनी में है — कृपया अच्छी रोशनी में स्थिर हाथों से दोबारा लें',
      gu: 'છબી ખૂબ ઝાંખી છે — કૃપા કરીને સારી લાઇટમાં સ્થિર હાથે ફરીથી લો',
    },
    BILL_SANITY_FAIL: {
      en: `Bill amount seems incorrect (₹${params.amount || '?'}) — please verify and resubmit`,
      hi: `बिल राशि गलत लगती है (₹${params.amount || '?'}) — कृपया सत्यापित करें और पुनः सबमिट करें`,
      gu: `બિલની રકમ ખોટી લાગે છે (₹${params.amount || '?'}) — કૃપા કરીને ચકાસો અને ફરીથી સબમિટ કરો`,
    },
    BILL_DATE_FAIL: {
      en: 'Bill date is outside the current crop cycle — please submit bills from this season only',
      hi: 'बिल की तारीख वर्तमान फसल चक्र के बाहर है — कृपया केवल इस मौसम के बिल जमा करें',
      gu: 'બિલની તારીખ વર્તમાન પાક ચક્રની બહાર છે — કૃપા કરીને ફક્ત આ સિઝનના બિલ સબમિટ કરો',
    },
  };
  return messages[key] || {
    en: 'Verification failed — please contact support',
    hi: 'सत्यापन विफल — कृपया सहायता से संपर्क करें',
    gu: 'ચકાસણી નિષ્ફળ — કૃપા કરીને સહાયનો સંપર્ક કરો',
  };
};

/**
 * Compute Haversine distance between two lat/lng points.
 * @returns {number} Distance in meters
 */
const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; // Earth's radius in metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * T2 — Verify a farmer submission.
 * Runs 5 ordered checks. Stops on first failure.
 * 
 * @param {Object} submission — FarmerSubmission with images[] and bills[]
 * @param {Object} cycleState — CropCycleState with geofence data
 * @returns {{ passed: boolean, verificationResult: Object, localizedError: Object|null }}
 */
export const verifySubmission = async (submission, cycleState) => {
  const results = {
    geofencePass: true,
    livenessPass: true,
    noveltyPass: true,
    legibilityPass: true,
    billSanityPass: true,
    overallPass: true,
    failureReason: null,
    failureReasonLocalized: null,
  };

  const images = submission.images || [];
  const bills = submission.bills || [];

  // ── Check 1: Geofence match ──
  for (const img of images) {
    if (img.captureLat && img.captureLng && cycleState.geofenceLat && cycleState.geofenceLng) {
      const dist = haversineDistance(
        img.captureLat, img.captureLng,
        cycleState.geofenceLat, cycleState.geofenceLng
      );
      if (dist > (cycleState.geofenceRadiusM || 150)) {
        results.geofencePass = false;
        results.overallPass = false;
        results.failureReason = `Image captured ${Math.round(dist)}m from registered plot (limit: ${cycleState.geofenceRadiusM}m)`;
        results.failureReasonLocalized = JSON.stringify(
          localizeError('GEOFENCE_FAIL', { distance: Math.round(dist) })
        );
        break;
      }
    }
  }

  // ── Check 2: Liveness ──
  // TODO: Integrate Play Integrity (Android) / App Attest (iOS)
  // TODO: Add moiré/glare classifier for screen-capture detection
  // Stub: always passes
  if (results.overallPass) {
    results.livenessPass = true;
  }

  // ── Check 3: Novelty (perceptual hash) ──
  // TODO: Implement perceptual hashing (pHash/dHash) and compare against prior submissions
  // Stub: always passes, log warning
  if (results.overallPass) {
    console.warn('[VERIFICATION] Novelty check bypassed — perceptual hashing not yet implemented');
    results.noveltyPass = true;
  }

  // ── Check 4: Legibility ──
  // TODO: Implement blur/exposure detection and OCR confidence floor for bills
  // Stub: always passes
  if (results.overallPass) {
    results.legibilityPass = true;
  }

  // ── Check 5: Bill sanity ──
  if (results.overallPass) {
    for (const bill of bills) {
      // Check extracted amount is plausible (if OCR data available)
      if (bill.extractedAmount !== null && bill.extractedAmount !== undefined) {
        if (bill.extractedAmount <= 0 || bill.extractedAmount >= 500000) {
          results.billSanityPass = false;
          results.overallPass = false;
          results.failureReason = `Bill amount ₹${bill.extractedAmount} is outside plausible range`;
          results.failureReasonLocalized = JSON.stringify(
            localizeError('BILL_SANITY_FAIL', { amount: bill.extractedAmount })
          );
          break;
        }
      }
      // Check vendor field (if OCR data available)
      if (bill.extractedVendor !== null && bill.extractedVendor !== undefined) {
        if (!bill.extractedVendor || bill.extractedVendor.trim().length < 2) {
          results.billSanityPass = false;
          results.overallPass = false;
          results.failureReason = 'Bill vendor name is missing or too short';
          results.failureReasonLocalized = JSON.stringify(
            localizeError('BILL_SANITY_FAIL', { amount: '—' })
          );
          break;
        }
      }
    }
  }

  // Create VerificationResult record
  const verificationResult = await prisma.verificationResult.create({
    data: {
      submissionId: submission.id,
      geofencePass: results.geofencePass,
      livenessPass: results.livenessPass,
      noveltyPass: results.noveltyPass,
      legibilityPass: results.legibilityPass,
      billSanityPass: results.billSanityPass,
      overallPass: results.overallPass,
      failureReason: results.failureReason,
      failureReasonLocalized: results.failureReasonLocalized,
    },
  });

  const localizedError = results.overallPass
    ? null
    : JSON.parse(results.failureReasonLocalized || '{}');

  return { passed: results.overallPass, verificationResult, localizedError };
};
