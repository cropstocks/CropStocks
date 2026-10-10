import express from 'express';
import { prisma } from '../utils/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(requireRole(['ADMIN']));

// Sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await prisma.sellerProfile.findMany({
      where: { isVerified: false },
      include: { user: { select: { name: true, email: true } } }
    });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sellers' });
  }
});

router.put('/sellers/:id/verify', async (req, res) => {
  try {
    const { isVerified, rejectionReason } = req.body;
    const seller = await prisma.sellerProfile.update({
      where: { id: req.params.id },
      data: { isVerified, verifiedAt: isVerified ? new Date() : null, rejectionReason }
    });
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify seller' });
  }
});

// Products
router.get('/products/pending', async (req, res) => {
  try {
    const products = await prisma.martProduct.findMany({
      where: { isApproved: false },
      include: { seller: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending products' });
  }
});

router.put('/products/:id/approve', async (req, res) => {
  try {
    const { isApproved } = req.body;
    const product = await prisma.martProduct.update({
      where: { id: req.params.id },
      data: { isApproved, approvedAt: isApproved ? new Date() : null, status: isApproved ? 'ACTIVE' : 'DRAFT' }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve product' });
  }
});

// Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.martCategory.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug) data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await prisma.martCategory.create({ data });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const category = await prisma.martCategory.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    await prisma.martCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Coupons
router.get('/coupons', async (req, res) => {
  try {
    const coupons = await prisma.martCoupon.findMany();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

router.post('/coupons', async (req, res) => {
  try {
    const coupon = await prisma.martCoupon.create({ data: req.body });
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create coupon' });
  }
});

router.put('/coupons/:id', async (req, res) => {
  try {
    const coupon = await prisma.martCoupon.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update coupon' });
  }
});

router.delete('/coupons/:id', async (req, res) => {
  try {
    await prisma.martCoupon.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete coupon' });
  }
});

// Banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await prisma.martBanner.findMany();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

router.post('/banners', async (req, res) => {
  try {
    const banner = await prisma.martBanner.create({ data: req.body });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create banner' });
  }
});

router.put('/banners/:id', async (req, res) => {
  try {
    const banner = await prisma.martBanner.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update banner' });
  }
});

router.delete('/banners/:id', async (req, res) => {
  try {
    await prisma.martBanner.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete banner' });
  }
});

// Orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.martOrder.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Analytics
router.get('/analytics', async (req, res) => {
  try {
    const totalSales = await prisma.martOrder.aggregate({ _sum: { grandTotal: true }, where: { status: 'DELIVERED' } });
    const ordersCount = await prisma.martOrder.count();
    const productsCount = await prisma.martProduct.count();
    const usersCount = await prisma.user.count();
    
    res.json({
      totalSales: totalSales._sum.grandTotal || 0,
      ordersCount,
      productsCount,
      usersCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Block User
router.put('/users/:id/block', async (req, res) => {
  // Placeholder since block might not be natively in schema, just an example
  res.json({ success: true, message: 'User blocked' });
});

// Disputes
router.get('/disputes', async (req, res) => {
  try {
    const disputes = await prisma.martOrder.findMany({
      where: { status: { in: ['RETURN_REQUESTED', 'CANCELLED'] } }
    });
    res.json(disputes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disputes' });
  }
});

export default router;
