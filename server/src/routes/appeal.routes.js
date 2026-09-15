import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// POST / — authenticate, requireRole(['FARMER']) — File an appeal
router.post('/', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { cycleStateId, cycleWeek, appealType, reason } = req.body;

    const cycleState = await prisma.cropCycleState.findUnique({
      where: { id: cycleStateId },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Crop cycle not found' });
    }

    if (cycleState.farmerId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized for this crop cycle' });
    }

    const slaDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    const appeal = await prisma.farmerAppeal.create({
      data: {
        cycleStateId,
        cycleWeek,
        appealType,
        reason,
        status: 'PENDING',
        farmerId: req.user.userId,
        slaDeadline,
      },
    });

    console.log(`[Admin Notice] New appeal filed: ${appeal.id} by farmer ${req.user.userId}`);

    res.status(201).json(appeal);
  } catch (error) {
    console.error('Error filing appeal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /:listingId — authenticate, requireRole(['FARMER']) — Get appeal history
router.get('/:listingId', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { listingId } = req.params;

    const cycleState = await prisma.cropCycleState.findFirst({
      where: {
        listingId,
        farmerId: req.user.userId,
      },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Crop cycle not found' });
    }

    const appeals = await prisma.farmerAppeal.findMany({
      where: { cycleStateId: cycleState.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(appeals);
  } catch (error) {
    console.error('Error fetching appeal history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /:appealId — authenticate, requireRole(['ADMIN', 'FIELD_AGENT']) — Resolve appeal
router.put('/:appealId', authenticate, requireRole(['ADMIN', 'FIELD_AGENT']), async (req, res) => {
  try {
    const { appealId } = req.params;
    const { status, resolutionNotes } = req.body;

    if (!['UPHELD', 'OVERTURNED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const appeal = await prisma.farmerAppeal.update({
      where: { id: appealId },
      data: {
        status,
        resolutionNotes,
        resolvedAt: new Date(),
        reviewerId: req.user.userId,
      },
    });

    if (status === 'OVERTURNED') {
      console.log(`[System Notice] Appeal ${appealId} OVERTURNED. Manual price/health correction may be needed.`);
    }

    await prisma.auditLog.create({
      data: {
        action: 'APPEAL_RESOLVED',
        userId: req.user.userId,
        details: JSON.stringify({ appealId, status, resolutionNotes }),
      },
    });

    res.json(appeal);
  } catch (error) {
    console.error('Error resolving appeal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
