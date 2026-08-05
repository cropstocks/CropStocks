import { Router } from 'express';
import prisma from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, requireRole(['INVESTOR']), async (req, res) => {
  try {
    const { listingId, amount } = req.body;
    const val = parseFloat(amount);
    
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing || listing.status !== 'FUNDING') {
      return res.status(400).json({ error: 'Listing not available for funding' });
    }
    
    if (listing.capitalRaised + val > listing.capitalRequired) {
      return res.status(400).json({ error: 'Amount exceeds required capital' });
    }
    
    const investorProfile = await prisma.investorProfile.findUnique({ where: { userId: req.user.userId } });
    if (investorProfile.walletBalance < val) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    
    await prisma.investorProfile.update({
      where: { userId: req.user.userId },
      data: { walletBalance: { decrement: val }, totalInvested: { increment: val } }
    });
    
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: { capitalRaised: { increment: val } }
    });
    
    const investment = await prisma.investment.create({
      data: {
        investorId: req.user.userId,
        listingId,
        amount: val,
        sharePercent: (val / updatedListing.capitalRequired) * 100
      }
    });
    
    if (updatedListing.capitalRaised >= updatedListing.capitalRequired) {
      await prisma.listing.update({
        where: { id: listingId },
        data: { status: 'ACTIVE', fundedAt: new Date() }
      });
    }
    
    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get investor's portfolio
router.get('/my', authenticate, requireRole(['INVESTOR']), async (req, res) => {
  try {
    const investments = await prisma.investment.findMany({
      where: { investorId: req.user.userId },
      include: { listing: { include: { farmer: true } } },
      orderBy: { createdAt: 'desc' }
    });
    
    const profile = await prisma.investorProfile.findUnique({
      where: { userId: req.user.userId }
    });
    
    res.json({ investments, profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all investments for a specific listing
router.get('/listing/:id', authenticate, async (req, res) => {
  try {
    const investments = await prisma.investment.findMany({
      where: { listingId: req.params.id },
      include: { investor: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

