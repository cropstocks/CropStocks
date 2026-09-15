import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, profile } = req.body;
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { name, email, passwordHash, role: role || 'FARMER', phone }
    });
    
    if (user.role === 'FARMER') {
      await prisma.farmerProfile.create({ 
        data: { 
          userId: user.id,
          aadhaarNo: profile?.aadhaarNo || null,
          panNo: profile?.panNo || null,
          farmSize: profile?.farmSize || null,
          farmAddress: profile?.state || null,
          latitude: profile?.latitude ? parseFloat(profile.latitude) : null,
          longitude: profile?.longitude ? parseFloat(profile.longitude) : null,
          landDetails: profile?.crops ? JSON.stringify({ crops: profile.crops }) : null
        } 
      });

      // Automatically generate a mock funded listing and active crop cycle 
      // so the new user instantly sees the 6-panel Weekly Valuation Loop dashboard.
      const cropName = (profile?.crops && profile.crops.length > 0) ? profile.crops[0] : 'Corn';
      
      const newListing = await prisma.listing.create({
        data: {
          farmerId: user.id,
          type: 'CROP',
          produceName: cropName,
          region: profile?.state || 'Local Region',
          landSize: profile?.farmSize || '5 acres',
          cycleDuration: 20,
          capitalRequired: 150000,
          capitalRaised: 150000, // Fully funded
          expectedRevenue: 250000,
          stockPrice: 1200,
          status: 'ACTIVE' // Ready for cycle
        }
      });

      await prisma.cropCycleState.create({
        data: {
          listingId: newListing.id,
          farmerId: user.id,
          cycleWeek: 5,
          cropStage: "VEGETATIVE",
          geofenceLat: profile?.latitude ? parseFloat(profile.latitude) : 28.7041,
          geofenceLng: profile?.longitude ? parseFloat(profile.longitude) : 77.1025,
          geofenceRadiusM: 150,
          capitalGrantedInr: 150000,
          capitalDisbursedInr: 50000,
          currentPriceInr: 1250,
          priceHistory: JSON.stringify([{ week: 1, price: 1200 }, { week: 2, price: 1210 }, { week: 3, price: 1230 }, { week: 4, price: 1250 }]),
          healthIndexHistory: JSON.stringify([{ week: 1, index: 65 }, { week: 2, index: 68 }, { week: 3, index: 70 }, { week: 4, index: 75 }]),
          openDiseaseFlags: JSON.stringify([]),
        }
      });
    } else if (user.role === 'INVESTOR') {
      await prisma.investorProfile.create({ data: { userId: user.id, walletBalance: 100000 } });
    }
    
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    const { passwordHash: _, ...safeUser } = user;
    res.status(201).json({ user: safeUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    const { passwordHash: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { farmerProfile: true, investorProfile: true }
    });
    const { passwordHash: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
