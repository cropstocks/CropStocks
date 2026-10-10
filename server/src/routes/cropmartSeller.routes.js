import express from 'express';
import { prisma } from '../utils/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

// Middleware to ensure user has VENDOR role and verified SellerProfile
const requireSeller = async (req, res, next) => {
  try {
    const profile = await prisma.sellerProfile.findUnique({ where: { userId: req.user.userId } });
    if (!profile) return res.status(403).json({ error: 'Seller profile not found' });
    req.sellerId = profile.id;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Register as seller
router.post('/register', async (req, res) => {
  try {
    const { businessName, gstNumber, bankAccountNo, bankIfsc, pickupAddress, pickupPincode, pickupLat, pickupLng } = req.body;
    let profile = await prisma.sellerProfile.findUnique({ where: { userId: req.user.userId } });
    if (profile) return res.status(400).json({ error: 'Already registered as seller' });
    
    profile = await prisma.sellerProfile.create({
      data: { userId: req.user.userId, businessName, gstNumber, bankAccountNo, bankIfsc, pickupAddress, pickupPincode, pickupLat, pickupLng }
    });
    
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { role: 'VENDOR' }
    });
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register seller' });
  }
});

router.use(requireSeller);

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const productsCount = await prisma.martProduct.count({ where: { sellerId: req.sellerId } });
    const ordersCount = await prisma.martOrderItem.count({ where: { sellerId: req.sellerId } });
    res.json({ productsCount, ordersCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Products CRUD
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.martProduct.findMany({
      where: { sellerId: req.sellerId },
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const data = { ...req.body, sellerId: req.sellerId };
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    }
    const product = await prisma.martProduct.create({ data });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await prisma.martProduct.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await prisma.martProduct.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

router.post('/products/bulk-upload', async (req, res) => {
  // Placeholder for CSV bulk upload
  res.json({ success: true, message: 'Bulk upload placeholder' });
});

// Orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.martOrderItem.findMany({
      where: { sellerId: req.sellerId },
      include: { order: true, product: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const item = await prisma.martOrderItem.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Earnings
router.get('/earnings', async (req, res) => {
  try {
    const items = await prisma.martOrderItem.findMany({
      where: { sellerId: req.sellerId, status: 'DELIVERED' }
    });
    const totalEarnings = items.reduce((sum, item) => sum + item.totalPrice, 0);
    res.json({ totalEarnings, itemsCount: items.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch earnings' });
  }
});

// Messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await prisma.martMessage.findMany({
      where: { receiverId: req.user.userId },
      orderBy: { createdAt: 'desc' },
      include: { sender: { select: { name: true } } }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.put('/messages/:id/reply', async (req, res) => {
  try {
    const { body } = req.body;
    const parentMsg = await prisma.martMessage.findUnique({ where: { id: req.params.id } });
    if (!parentMsg) return res.status(404).json({ error: 'Message not found' });
    
    const reply = await prisma.martMessage.create({
      data: {
        senderId: req.user.userId,
        receiverId: parentMsg.senderId,
        productId: parentMsg.productId,
        subject: `Re: ${parentMsg.subject || ''}`,
        body,
        parentId: parentMsg.id
      }
    });
    res.json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

// Quotes
router.post('/quotes/:id/respond', async (req, res) => {
  try {
    const { status, sellerResponse } = req.body;
    const quote = await prisma.martQuoteRequest.update({
      where: { id: req.params.id },
      data: { status, sellerResponse }
    });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to quote' });
  }
});

// Q&A
router.post('/products/:id/questions/:qid/answer', async (req, res) => {
  try {
    const { answer } = req.body;
    const question = await prisma.martProductQuestion.update({
      where: { id: req.params.qid },
      data: { answer, answeredBy: req.user.userId, answeredAt: new Date() }
    });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to answer question' });
  }
});

export default router;
