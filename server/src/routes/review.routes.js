import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /queue — authenticate, requireRole(['ADMIN', 'FIELD_AGENT']) — Get pending reviews
router.get('/queue', authenticate, requireRole(['ADMIN', 'FIELD_AGENT']), async (req, res) => {
  try {
    const pendingReports = await prisma.weeklyCropReport.findMany({
      where: {
        status: {
          in: ['MANUAL_REVIEW', 'PENDING_REVIEW'], // Depending on actual enum values in schema
        },
      },
      include: {
        cycleState: {
          include: {
            farmer: true,
          }
        },
        analysis: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const withSla = pendingReports.map(report => {
      // Basic SLA calculation, e.g., 48 hours
      const deadline = new Date(report.createdAt.getTime() + 48 * 60 * 60 * 1000);
      const now = new Date();
      return {
        ...report,
        slaDeadline: deadline,
        slaExpired: now > deadline,
      };
    });

    res.json(withSla);
  } catch (error) {
    console.error('Error fetching review queue:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /:reportId — authenticate, requireRole(['ADMIN', 'FIELD_AGENT']) — Approve or override
router.put('/:reportId', authenticate, requireRole(['ADMIN', 'FIELD_AGENT']), async (req, res) => {
  try {
    const { reportId } = req.params;
    const { decision, notes, overrideHealthIndex } = req.body;

    const report = await prisma.weeklyCropReport.findUnique({
      where: { id: reportId },
      include: { analysis: true },
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    if (decision === 'APPROVE') {
      const updatedReport = await prisma.weeklyCropReport.update({
        where: { id: reportId },
        data: {
          status: 'APPROVED',
          reviewerId: req.user.userId,
          approvedAt: new Date(),
        },
      });
      return res.json(updatedReport);
    } else if (decision === 'OVERRIDE') {
      const updatedReport = await prisma.weeklyCropReport.update({
        where: { id: reportId },
        data: {
          status: 'APPROVED',
          reviewerId: req.user.userId,
          approvedAt: new Date(),
          notes, // assuming notes field exists on report or handle appropriately
        },
      });

      if (overrideHealthIndex !== undefined && report.analysisId) {
        await prisma.cropHealthAnalysis.update({
          where: { id: report.analysisId },
          data: { healthIndex: overrideHealthIndex },
        });
      }

      await prisma.auditLog.create({
        data: {
          action: 'REPORT_OVERRIDE',
          userId: req.user.userId,
          details: JSON.stringify({ reportId, notes, overrideHealthIndex }),
        },
      });

      return res.json(updatedReport);
    } else {
      return res.status(400).json({ error: 'Invalid decision' });
    }
  } catch (error) {
    console.error('Error reviewing report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /:reportId — authenticate, requireRole(['ADMIN']) — Get review details
router.get('/:reportId', authenticate, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await prisma.weeklyCropReport.findUnique({
      where: { id: reportId },
      include: {
        cycleState: true,
        submission: true,
        analysis: true, // Assuming detections/remediations are JSON or relations within analysis
        priceChange: true, // Assuming attributions are included or are JSON
      },
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Error fetching review details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
