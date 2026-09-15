import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /:listingId — authenticate, requireRole(['FARMER', 'INVESTOR', 'ADMIN']) — List all reports
router.get('/:listingId', authenticate, requireRole(['FARMER', 'INVESTOR', 'ADMIN']), async (req, res) => {
  try {
    const { listingId } = req.params;

    const cycleState = await prisma.cropCycleState.findFirst({
      where: { listingId },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Crop cycle not found' });
    }

    const reports = await prisma.weeklyCropReport.findMany({
      where: { cycleStateId: cycleState.id },
      orderBy: { cycleWeek: 'desc' },
      include: { priceChange: true },
    });

    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /:listingId/:week — authenticate, requireRole(['FARMER', 'INVESTOR', 'ADMIN']) — Get specific report
router.get('/:listingId/:week', authenticate, requireRole(['FARMER', 'INVESTOR', 'ADMIN']), async (req, res) => {
  try {
    const { listingId, week } = req.params;
    const cycleWeek = parseInt(week, 10);

    const cycleState = await prisma.cropCycleState.findFirst({
      where: { listingId },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Crop cycle not found' });
    }

    const report = await prisma.weeklyCropReport.findFirst({
      where: {
        cycleStateId: cycleState.id,
        cycleWeek,
      },
      include: {
        priceChange: true,
      },
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const reportData = typeof report.reportData === 'string' ? JSON.parse(report.reportData) : report.reportData;

    res.json({
      ...report,
      reportData,
    });
  } catch (error) {
    console.error('Error fetching specific report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /download/:reportId — authenticate, requireRole(['FARMER']) — Download report
router.get('/download/:reportId', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await prisma.weeklyCropReport.findUnique({
      where: { id: reportId },
      include: {
        cycleState: true,
      },
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Verify access
    if (report.cycleState.farmerId !== req.user.userId) {
       return res.status(403).json({ error: 'Not authorized' });
    }

    const reportData = typeof report.reportData === 'string' ? JSON.parse(report.reportData) : report.reportData;

    res.setHeader('Content-Disposition', `attachment; filename=report-${report.id}.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(reportData, null, 2));
  } catch (error) {
    console.error('Error downloading report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
