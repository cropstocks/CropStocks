import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * POST / — Initialize a crop cycle for a listing
 * Auth: FARMER
 */
router.post('/', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { listingId } = req.body;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    if (listing.farmerId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized for this listing' });
    }
    if (listing.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Listing must be ACTIVE to start a crop cycle' });
    }

    // Check if an active cycle already exists
    const existing = await prisma.cropCycleState.findFirst({
      where: { listingId, status: 'ACTIVE' },
    });
    if (existing) {
      return res.status(400).json({ error: 'An active crop cycle already exists for this listing' });
    }

    // Get farmer profile for geofence coordinates
    const farmerProfile = await prisma.farmerProfile.findUnique({
      where: { userId: req.user.userId },
    });

    if (!farmerProfile || !farmerProfile.latitude || !farmerProfile.longitude) {
      return res.status(400).json({ error: 'Farmer profile with GPS coordinates is required' });
    }

    const cycleState = await prisma.cropCycleState.create({
      data: {
        farmerId: req.user.userId,
        listingId,
        cycleWeek: 1,
        cropStage: 'VEGETATIVE',
        status: 'ACTIVE',
        geofenceLat: farmerProfile.latitude,
        geofenceLng: farmerProfile.longitude,
        geofenceRadiusM: 150,
        capitalGrantedInr: listing.capitalRequired,
        capitalDisbursedInr: listing.capitalRaised,
        currentPriceInr: listing.stockPrice || 0,
        priceHistory: JSON.stringify([{ week: 0, price: listing.stockPrice || 0, date: new Date().toISOString() }]),
        healthIndexHistory: JSON.stringify([]),
        openDiseaseFlags: JSON.stringify([]),
        consecutiveMissedSubmissions: 0,
        trustScore: 0.5,
      },
    });

    res.status(201).json(cycleState);
  } catch (error) {
    console.error('Error initializing crop cycle:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /:listingId — Get current active cycle state
 * Auth: FARMER
 */
router.get('/:listingId', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { listingId } = req.params;

    const cycleState = await prisma.cropCycleState.findFirst({
      where: {
        listingId,
        status: 'ACTIVE',
        farmerId: req.user.userId,
      },
      include: {
        submissionWindows: {
          take: 4,
          orderBy: { createdAt: 'desc' },
        },
        reports: {
          take: 4,
          orderBy: { cycleWeek: 'desc' },
        },
        submissions: {
          take: 1,
          orderBy: { submittedAt: 'desc' },
          include: {
            verification: true,
            analysis: true,
          },
        },
      },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Active crop cycle not found for this listing' });
    }

    res.json(cycleState);
  } catch (error) {
    console.error('Error fetching crop cycle state:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /:listingId/history — Get full price + health history
 * Auth: FARMER, INVESTOR
 */
router.get('/:listingId/history', authenticate, requireRole(['FARMER', 'INVESTOR']), async (req, res) => {
  try {
    const { listingId } = req.params;

    const cycleState = await prisma.cropCycleState.findFirst({
      where: { listingId },
      include: {
        priceChanges: {
          include: { attributions: true },
          orderBy: { cycleWeek: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!cycleState) {
      return res.status(404).json({ error: 'Crop cycle not found' });
    }

    res.json({
      priceHistory: JSON.parse(cycleState.priceHistory || '[]'),
      healthIndexHistory: JSON.parse(cycleState.healthIndexHistory || '[]'),
      priceChanges: cycleState.priceChanges,
    });
  } catch (error) {
    console.error('Error fetching crop cycle history:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
