import { Router } from 'express';
import prisma from '../utils/prisma.js';

const router = Router();

router.get('/:type', async (req, res) => {
  try {
    const tips = await prisma.guidanceTip.findMany({
      where: { applicableType: req.params.type }
    });
    res.json(tips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
