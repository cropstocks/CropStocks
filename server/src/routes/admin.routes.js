import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, requireRole(['ADMIN']));

router.post('/listings/:id/approve', async (req, res) => {
  try {
    const listing = await prisma.listing.update({
      where: { id: req.params.id },
      data: { status: 'FUNDING', approvedAt: new Date() }
    });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/surveys', async (req, res) => {
  try {
    const surveys = await prisma.surveyResponse.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
