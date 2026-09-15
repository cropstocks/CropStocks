import prisma from '../../utils/prisma.js';
import { notifyAdmin } from './notificationService.js';

export const reviewReport = async (report, analysis, detections = [], anomalyFlags = [], pricePreview) => {
  const hasSevere = detections.some(d => d.severity === 'SEVERE');
  const priceMovePct = pricePreview ? (pricePreview.newPrice - pricePreview.oldPrice) / pricePreview.oldPrice : 0;
  
  if (analysis.confidence >= 0.70 && !hasSevere && anomalyFlags.length === 0 && Math.abs(priceMovePct) <= 0.08) {
    return await prisma.weeklyCropReport.update({
      where: { id: report.id },
      data: { status: 'APPROVED' }
    });
  } else {
    notifyAdmin('MANUAL_REVIEW_REQUIRED', { reportId: report.id });
    return await prisma.weeklyCropReport.update({
      where: { id: report.id },
      data: { status: 'MANUAL_REVIEW' }
    });
  }
};

export const manualReview = async (reportId, reviewerId, decision, notes) => {
  const report = await prisma.weeklyCropReport.update({
    where: { id: reportId },
    data: { status: decision }
  });
  
  await prisma.auditLog.create({
    data: {
      action: 'MANUAL_REVIEW',
      details: JSON.stringify({ decision, notes }),
      userId: reviewerId,
      reportId: reportId
    }
  });
  
  return report;
};

export const checkReviewSLA = async () => {
  const deadline = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const overdue = await prisma.weeklyCropReport.findMany({
    where: { status: 'MANUAL_REVIEW', createdAt: { lt: deadline } }
  });
  
  for (const rep of overdue) {
    await prisma.weeklyCropReport.update({
      where: { id: rep.id },
      data: { status: 'SLA_APPROVED_CONSERVATIVE' }
    });
  }
};
