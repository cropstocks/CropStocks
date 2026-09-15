import crypto from 'crypto';
import prisma from '../../utils/prisma.js';

export const analyzeCropHealth = async (submission, satelliteSnapshot, cycleState) => {
  const baseHealth = satelliteSnapshot ? satelliteSnapshot.ndviMean * 100 : 65;
  
  // Hash for pseudo-random deterministic variation
  const hash = crypto.createHash('md5').update(`${cycleState.farmerId}-${cycleState.cycleWeek}`).digest('hex');
  const delta = (parseInt(hash.substring(0, 4), 16) / 65535) * 10 - 5; // -5 to +5
  
  let healthIndex = Math.max(0, Math.min(100, baseHealth + delta));
  
  let confidence = 0.85;
  if (!satelliteSnapshot) confidence -= 0.1;
  if (!submission.images || submission.images.length < 4) confidence -= 0.05;
  
  const detections = [];
  if (healthIndex < 40) {
    detections.push({ type: 'SEVERE', name: 'Late Blight' });
  } else if (healthIndex < 60) {
    detections.push({ type: 'MODERATE', name: 'Nutrient Deficiency' });
  } else if (healthIndex < 75) {
    detections.push({ type: 'LOW', name: 'Minor Leaf Spot' });
  }
  
  const anomalyFlags = [];
  if (satelliteSnapshot && satelliteSnapshot.ndviMean > 0.7 && healthIndex < 50) {
    anomalyFlags.push('NDVI_HEALTH_MISMATCH');
  }

  const analysis = await prisma.cropHealthAnalysis.create({
    data: {
      submissionId: submission.id,
      healthIndex,
      confidence,
      anomalyFlags: JSON.stringify(anomalyFlags),
      modelVersion: 'crop-health-v1.0.0-mock',
      kbVersion: 'agronomy-kb-v1.0.0'
    }
  });
  
  for (const det of detections) {
    await prisma.healthDetection.create({
      data: {
        analysisId: analysis.id,
        severity: det.type,
        diseaseName: det.name
      }
    });
  }

  return { analysis, detections, anomalyFlags };
};
