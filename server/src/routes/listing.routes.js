import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { calculateCapital } from '../services/capitalCalculator.js';
import { computePayout } from '../services/payoutEngine.js';
import { computeStockPrice, computeVegetationStatus, getVegetationColor } from '../services/stockPriceEngine.js';

const router = Router();

// Enrich listings with computed stock price
const enrichListing = (listing) => {
  const stockPrice = computeStockPrice(listing);
  const vegetationStatus = computeVegetationStatus(listing.ndviScore);
  return {
    ...listing,
    stockPrice,
    vegetationStatus,
    vegetationColor: getVegetationColor(vegetationStatus),
    shareUnits: 100,
    fundingPercent: listing.capitalRequired > 0
      ? Math.round((listing.capitalRaised / listing.capitalRequired) * 100)
      : 0
  };
};

router.post('/', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { type, produceName, region, landSize, animalCount, cycleDuration } = req.body;
    const size = type === 'CROP' ? parseFloat(landSize) : parseInt(animalCount);
    
    const calc = calculateCapital(type, produceName, size);
    
    const listing = await prisma.listing.create({
      data: {
        farmerId: req.user.userId,
        type, produceName, region, landSize: type === 'CROP' ? landSize : null,
        animalCount: type === 'ANIMAL' ? animalCount : null,
        cycleDuration: parseInt(cycleDuration),
        ...calc
      }
    });

    // Set initial stock price
    const enriched = enrichListing(listing);
    await prisma.listing.update({
      where: { id: listing.id },
      data: { stockPrice: enriched.stockPrice }
    });

    res.status(201).json(enriched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      include: { farmer: { select: { id: true, name: true, email: true, role: true, kycStatus: true } } },
      where: req.query.status ? { status: req.query.status } : {},
      orderBy: { createdAt: 'desc' }
    });
    res.json(listings.map(enrichListing));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: req.params.id },
      include: {
        farmer: { select: { id: true, name: true, email: true, role: true, kycStatus: true } },
        progressUpdates: { orderBy: { createdAt: 'desc' } },
        investments: { include: { investor: { select: { id: true, name: true, email: true } } } }
      }
    });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(enrichListing(listing));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update NDVI score from satellite microservice
router.patch('/:id/ndvi', async (req, res) => {
  try {
    const { ndviScore } = req.body;
    if (ndviScore === undefined || ndviScore < 0 || ndviScore > 1) {
      return res.status(400).json({ error: 'ndviScore must be between 0.0 and 1.0' });
    }

    const vegetationStatus = computeVegetationStatus(ndviScore);
    
    let listing = await prisma.listing.update({
      where: { id: req.params.id },
      data: { ndviScore, vegetationStatus }
    });

    // Recompute stock price
    const stockPrice = computeStockPrice(listing);
    listing = await prisma.listing.update({
      where: { id: req.params.id },
      data: { stockPrice }
    });

    res.json(enrichListing(listing));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/harvest', authenticate, requireRole(['FARMER']), async (req, res) => {
  try {
    const { harvestRevenue, harvestQuantity } = req.body;
    const listing = await prisma.listing.update({
      where: { id: req.params.id },
      data: { status: 'HARVESTED', harvestRevenue: parseFloat(harvestRevenue), harvestQuantity }
    });
    
    const investments = await prisma.investment.findMany({ where: { listingId: listing.id } });
    const payouts = computePayout(listing, investments);
    
    for (const p of payouts) {
      if (p.investorId) {
        await prisma.payout.create({
          data: { listingId: listing.id, recipientId: p.investorId, amount: p.amount, type: p.type }
        });
        await prisma.investment.update({
          where: { id: p.investmentId },
          data: { payoutAmount: p.amount, payoutStatus: 'PENDING' }
        });
      }
      if (p.farmerId) {
        await prisma.payout.create({
          data: { listingId: listing.id, recipientId: p.farmerId, amount: p.amount, type: p.type }
        });
      }
    }
    
    res.json({ listing: enrichListing(listing), payouts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
