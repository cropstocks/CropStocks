import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const survey = await prisma.surveyResponse.create({
      data: {
        data: JSON.stringify(req.body)
      }
    });
    res.status(201).json(survey);
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ error: 'Failed to save survey' });
  }
});

export default router;
