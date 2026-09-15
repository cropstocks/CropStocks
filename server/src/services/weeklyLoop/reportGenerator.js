import crypto from 'crypto';
import prisma from '../../utils/prisma.js';

export const generateReport = async (cycleState, submission, analysis, satelliteSnapshot, pricePreview, detections = [], remediations = []) => {
  const reportData = {
    header: {
      farmerId: cycleState.farmerId,
      plotId: cycleState.plotId,
      crop: cycleState.crop,
      isoWeek: getIsoWeek(),
      cycleWeek: cycleState.cycleWeek,
      geoVerified: true
    },
    summary: `Crop health is currently at ${analysis.healthIndex.toFixed(1)}. Found ${detections.length} issues.`,
    fieldEvidence: submission.images ? submission.images.map(i => ({ url: i.url, lat: i.lat, lng: i.lng })) : [],
    satellite: {
      ndviMean: satelliteSnapshot?.ndviMean,
      imageUrl: satelliteSnapshot?.rawImageUrl
    },
    health: {
      index: analysis.healthIndex,
      confidence: analysis.confidence
    },
    diagnostics: detections.map((d, i) => ({ disease: d.diseaseName, severity: d.severity, remediationId: remediations[i]?.id })),
    financials: {
      bills: submission.bills,
      spendLimit: cycleState.grantedCapital
    },
    valuation: {
      priorPrice: cycleState.currentPriceInr,
      pricePreview: pricePreview
    },
    audit: {
      modelVersion: analysis.modelVersion,
      kbVersion: analysis.kbVersion,
      reviewerId: null
    }
  };

  const hash = crypto.createHash('sha256').update(JSON.stringify(reportData)).digest('hex');

  const report = await prisma.weeklyCropReport.create({
    data: {
      cycleStateId: cycleState.id,
      submissionId: submission.id,
      data: JSON.stringify(reportData),
      hash,
      status: 'PENDING_REVIEW'
    }
  });
  
  return report;
};

const getIsoWeek = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
