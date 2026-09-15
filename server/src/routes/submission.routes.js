import { Router } from 'express';
import multer from 'multer';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// Configure multer for submission uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/submissions/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/**
 * GET /window/:listingId — Get current submission window
 * Auth: FARMER
 */
router.get('/window/:listingId', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { listingId } = req.params;

    const cycleState = await prisma.cropCycleState.findFirst({
      where: {
        listingId,
        status: 'ACTIVE',
        farmerId: req.user.userId,
      },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Active crop cycle not found' });
    }

    const latestWindow = await prisma.submissionWindow.findFirst({
      where: { cycleStateId: cycleState.id },
      orderBy: { cycleWeek: 'desc' },
    });

    if (!latestWindow) {
      return res.status(404).json({ error: 'No submission window found' });
    }

    // Check if a submission already exists for this window's week
    const existingSubmission = await prisma.farmerSubmission.findFirst({
      where: {
        cycleStateId: cycleState.id,
        cycleWeek: latestWindow.cycleWeek,
      },
    });

    const now = new Date();
    const timeRemaining = latestWindow.closesAt.getTime() - now.getTime();

    res.json({
      windowId: latestWindow.id,
      status: latestWindow.status,
      opensAt: latestWindow.opensAt,
      closesAt: latestWindow.closesAt,
      cycleWeek: latestWindow.cycleWeek,
      timeRemaining: timeRemaining > 0 ? timeRemaining : 0,
      submissionExists: !!existingSubmission,
      submissionStatus: existingSubmission?.status || null,
    });
  } catch (error) {
    console.error('Error fetching submission window:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /:listingId — Submit images + bills (multipart/form-data)
 * Auth: FARMER
 * Fields: images (max 10), bills (max 5), imageMetadata (JSON string)
 */
router.post(
  '/:listingId',
  authenticate,
  requireRole(['FARMER']),
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'bills', maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { listingId } = req.params;
      const { imageMetadata } = req.body;
      const imageFiles = req.files?.['images'] || [];
      const billFiles = req.files?.['bills'] || [];

      // Parse image metadata
      let metadata = [];
      try {
        if (imageMetadata) {
          metadata = JSON.parse(imageMetadata);
        }
      } catch (e) {
        return res.status(400).json({ error: 'Invalid imageMetadata JSON' });
      }

      // Validate minimums
      if (imageFiles.length < 4) {
        return res.status(400).json({ error: 'Minimum 4 crop images required' });
      }
      if (billFiles.length < 1) {
        return res.status(400).json({ error: 'Minimum 1 agricultural bill required' });
      }

      // Check distinct sub-locations (≥3 required)
      const subLocations = new Set(
        metadata.map(m => m.subLocationIndex).filter(i => i !== undefined)
      );
      if (subLocations.size < 3) {
        return res.status(400).json({
          error: 'Images must cover at least 3 distinct sub-locations within the plot'
        });
      }

      // Validate GPS accuracy (≤30m)
      for (const m of metadata) {
        if (m.accuracyM && m.accuracyM > 30) {
          return res.status(400).json({
            error: `GPS accuracy ${Math.round(m.accuracyM)}m exceeds the 30m threshold — move to an open area`
          });
        }
      }

      // Find active cycle
      const cycleState = await prisma.cropCycleState.findFirst({
        where: {
          listingId,
          status: 'ACTIVE',
          farmerId: req.user.userId,
        },
      });

      if (!cycleState) {
        return res.status(404).json({ error: 'Active crop cycle not found' });
      }

      // Find open submission window
      const window = await prisma.submissionWindow.findFirst({
        where: {
          cycleStateId: cycleState.id,
          status: 'OPEN',
          closesAt: { gt: new Date() },
        },
        orderBy: { cycleWeek: 'desc' },
      });

      if (!window) {
        return res.status(400).json({ error: 'No open submission window — the 72-hour window has expired' });
      }

      // Check if already submitted for this week
      const existing = await prisma.farmerSubmission.findFirst({
        where: {
          cycleStateId: cycleState.id,
          cycleWeek: window.cycleWeek,
          status: { not: 'REJECTED' },
        },
      });
      if (existing) {
        return res.status(400).json({ error: 'Evidence already submitted for this week' });
      }

      // Create submission with images and bills
      const submission = await prisma.farmerSubmission.create({
        data: {
          cycleStateId: cycleState.id,
          cycleWeek: window.cycleWeek,
          status: 'PENDING',
          resubmitCount: 0,
          images: {
            create: imageFiles.map((img, index) => {
              const meta = metadata[index] || {};
              return {
                fileUrl: `/uploads/submissions/${img.filename}`,
                captureLat: meta.lat || 0,
                captureLng: meta.lng || 0,
                captureAccuracyM: meta.accuracyM || 0,
                subLocationIndex: meta.subLocationIndex || 0,
              };
            }),
          },
          bills: {
            create: billFiles.map(bill => ({
              fileUrl: `/uploads/submissions/${bill.filename}`,
              fileType: bill.mimetype?.includes('pdf') ? 'PDF' : 'IMAGE',
            })),
          },
        },
        include: {
          images: true,
          bills: true,
        },
      });

      res.status(201).json(submission);
    } catch (error) {
      console.error('Error submitting evidence:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * POST /:submissionId/resubmit — Resubmit after rejection (≤2 times)
 * Auth: FARMER
 */
router.post(
  '/:submissionId/resubmit',
  authenticate,
  requireRole(['FARMER']),
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'bills', maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { submissionId } = req.params;
      const { imageMetadata } = req.body;
      const imageFiles = req.files?.['images'] || [];
      const billFiles = req.files?.['bills'] || [];

      let metadata = [];
      try {
        if (imageMetadata) metadata = JSON.parse(imageMetadata);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid imageMetadata JSON' });
      }

      // Find submission and validate
      const submission = await prisma.farmerSubmission.findUnique({
        where: { id: submissionId },
        include: { cycleState: true },
      });

      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      if (submission.cycleState.farmerId !== req.user.userId) {
        return res.status(403).json({ error: 'Not authorized for this submission' });
      }
      if (submission.status !== 'REJECTED') {
        return res.status(400).json({ error: 'Only rejected submissions can be resubmitted' });
      }
      if (submission.resubmitCount >= 2) {
        return res.status(400).json({
          error: 'Maximum resubmissions reached. A Field Agent will be dispatched to your plot.'
        });
      }

      // Update submission with new files
      const updated = await prisma.farmerSubmission.update({
        where: { id: submissionId },
        data: {
          status: 'PENDING',
          resubmitCount: { increment: 1 },
          rejectionReason: null,
          rejectionReasonLocalized: null,
          images: {
            create: imageFiles.map((img, index) => {
              const meta = metadata[index] || {};
              return {
                fileUrl: `/uploads/submissions/${img.filename}`,
                captureLat: meta.lat || 0,
                captureLng: meta.lng || 0,
                captureAccuracyM: meta.accuracyM || 0,
                subLocationIndex: meta.subLocationIndex || 0,
              };
            }),
          },
          bills: {
            create: billFiles.map(bill => ({
              fileUrl: `/uploads/submissions/${bill.filename}`,
              fileType: bill.mimetype?.includes('pdf') ? 'PDF' : 'IMAGE',
            })),
          },
        },
        include: {
          images: true,
          bills: true,
        },
      });

      res.json(updated);
    } catch (error) {
      console.error('Error resubmitting:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * GET /:listingId/status — Get latest submission verification status
 * Auth: FARMER
 */
router.get('/:listingId/status', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { listingId } = req.params;

    const cycleState = await prisma.cropCycleState.findFirst({
      where: {
        listingId,
        status: 'ACTIVE',
        farmerId: req.user.userId,
      },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Active crop cycle not found' });
    }

    const submission = await prisma.farmerSubmission.findFirst({
      where: { cycleStateId: cycleState.id },
      orderBy: { submittedAt: 'desc' },
      include: {
        verification: true,
        analysis: {
          include: {
            detections: true,
            remediations: true,
          },
        },
        images: true,
        bills: true,
      },
    });

    if (!submission) {
      return res.status(404).json({ error: 'No submissions found for this cycle' });
    }

    // Determine pipeline step
    let currentStep = 'CAPTURED';
    if (submission.status === 'PENDING') currentStep = 'VERIFYING';
    if (submission.verification?.overallPass === true) currentStep = 'VERIFIED';
    if (submission.analysis) currentStep = 'ANALYZED';
    if (submission.status === 'REJECTED') currentStep = 'REJECTED';

    res.json({
      currentStep,
      submission,
    });
  } catch (error) {
    console.error('Error fetching submission status:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
