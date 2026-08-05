import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { listingId, stage, notes } = req.body;
    
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing || listing.farmerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const update = await prisma.progressUpdate.create({
      data: { listingId, stage, notes }
    });
    
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
