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
