import express from 'express';
import { prisma } from '../utils/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

// Cart
router.get('/cart', async (req, res) => {
  try {
    let cart = await prisma.martCart.findUnique({
      where: { userId: req.user.userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    if (!cart) {
      cart = await prisma.martCart.create({
        data: { userId: req.user.userId },
        include: { items: true }
      });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

router.post('/cart', async (req, res) => {
  try {
    const { productId, quantity, rentalStartDate, rentalEndDate } = req.body;
    let cart = await prisma.martCart.findUnique({ where: { userId: req.user.userId } });
    if (!cart) {
      cart = await prisma.martCart.create({ data: { userId: req.user.userId } });
    }
    
    const existingItem = await prisma.martCartItem.findFirst({
      where: { cartId: cart.id, productId }
    });
    
    if (existingItem) {
      const updated = await prisma.martCartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
      return res.json(updated);
    }
    
    const item = await prisma.martCartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        rentalStartDate: rentalStartDate ? new Date(rentalStartDate) : null,
        rentalEndDate: rentalEndDate ? new Date(rentalEndDate) : null
      }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

router.put('/cart/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await prisma.martCartItem.update({
      where: { id: req.params.itemId },
      data: { quantity }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

router.delete('/cart/:itemId', async (req, res) => {
  try {
    await prisma.martCartItem.delete({ where: { id: req.params.itemId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

// Wishlist
router.get('/wishlist', async (req, res) => {
  try {
    const wishlist = await prisma.martWishlist.findMany({
      where: { userId: req.user.userId },
      include: { product: true }
    });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

router.post('/wishlist', async (req, res) => {
  try {
    const { productId } = req.body;
    const item = await prisma.martWishlist.create({
      data: { userId: req.user.userId, productId }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

router.delete('/wishlist/:productId', async (req, res) => {
  try {
    await prisma.martWishlist.deleteMany({
      where: { userId: req.user.userId, productId: req.params.productId }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

// Addresses
router.get('/addresses', async (req, res) => {
  try {
    const addresses = await prisma.martAddress.findMany({
      where: { userId: req.user.userId },
      orderBy: { isDefault: 'desc' }
    });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

router.post('/addresses', async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.userId };
    if (data.isDefault) {
      await prisma.martAddress.updateMany({
        where: { userId: req.user.userId },
        data: { isDefault: false }
      });
    }
    const address = await prisma.martAddress.create({ data });
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create address' });
  }
});

router.put('/addresses/:id', async (req, res) => {
  try {
    const data = req.body;
    if (data.isDefault) {
      await prisma.martAddress.updateMany({
        where: { userId: req.user.userId },
        data: { isDefault: false }
      });
    }
    const address = await prisma.martAddress.update({
      where: { id: req.params.id },
      data
    });
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address' });
  }
});

router.delete('/addresses/:id', async (req, res) => {
  try {
    await prisma.martAddress.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

// Checkout & Orders
router.post('/checkout', async (req, res) => {
  try {
    const { addressId, paymentMethod, couponId, notes } = req.body;
    
    const cart = await prisma.martCart.findUnique({
      where: { userId: req.user.userId },
      include: { items: { include: { product: true } } }
    });
    
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
    
    let subtotal = 0;
    const orderItemsData = cart.items.map(item => {
      const price = item.product.price;
      const discount = item.product.discountPercent;
      const finalPrice = price - (price * discount / 100);
      const total = finalPrice * item.quantity;
      subtotal += total;
      
      return {
        productId: item.productId,
        sellerId: item.product.sellerId,
        quantity: item.quantity,
        unitPrice: finalPrice,
        totalPrice: total,
        isRental: !!item.rentalStartDate,
        rentalStartDate: item.rentalStartDate,
        rentalEndDate: item.rentalEndDate
      };
    });
    
    // In a real app, calculate delivery, taxes, check coupon validity
    const deliveryTotal = 50; 
    const discountTotal = 0; 
    const taxTotal = subtotal * 0.18; 
    const grandTotal = subtotal + deliveryTotal + taxTotal - discountTotal;
    
    const orderNumber = `CM-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.martOrder.create({
        data: {
          orderNumber,
          buyerId: req.user.userId,
          addressId,
          subtotal,
          deliveryTotal,
          discountTotal,
          taxTotal,
          grandTotal,
          couponId,
          paymentMethod,
          notes,
          items: { create: orderItemsData },
          statusHistory: { create: { status: 'PLACED', note: 'Order placed' } }
        }
      });
      
      await tx.martCartItem.deleteMany({ where: { cartId: cart.id } });
      
      return newOrder;
    });
    
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.martOrder.findMany({
      where: { buyerId: req.user.userId },
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const order = await prisma.martOrder.findFirst({
      where: { id: req.params.id, buyerId: req.user.userId },
      include: {
        items: { include: { product: true, seller: true } },
        address: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
        payments: true
      }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

router.post('/orders/:id/cancel', async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await prisma.martOrder.update({
      where: { id: req.params.id },
      data: {
        status: 'CANCELLED',
        cancellationReason: reason,
        statusHistory: { create: { status: 'CANCELLED', note: reason } }
      }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

router.post('/orders/:id/return', async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await prisma.martOrder.update({
      where: { id: req.params.id },
      data: {
        status: 'RETURN_REQUESTED',
        returnReason: reason,
        statusHistory: { create: { status: 'RETURN_REQUESTED', note: reason } }
      }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to request return' });
  }
});

router.get('/orders/:id/invoice', async (req, res) => {
  try {
    const order = await prisma.martOrder.findFirst({
      where: { id: req.params.id, buyerId: req.user.userId },
      include: { items: { include: { product: true } }, address: true, buyer: true }
    });
    res.json({ invoiceNumber: `INV-${order.orderNumber}`, order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate invoice' });
  }
});

// Reviews
router.post('/reviews', async (req, res) => {
  try {
    const { productId, orderId, rating, title, comment } = req.body;
    const review = await prisma.martReview.create({
      data: { userId: req.user.userId, productId, orderId, rating, title, comment }
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

router.put('/reviews/:id', async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const review = await prisma.martReview.update({
      where: { id: req.params.id },
      data: { rating, title, comment }
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Messages
router.post('/messages', async (req, res) => {
  try {
    const { receiverId, productId, subject, body } = req.body;
    const message = await prisma.martMessage.create({
      data: { senderId: req.user.userId, receiverId, productId, subject, body }
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await prisma.martMessage.findMany({
      where: { OR: [{ senderId: req.user.userId }, { receiverId: req.user.userId }] },
      orderBy: { createdAt: 'desc' },
      include: { sender: { select: { name: true } }, receiver: { select: { name: true } } }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Quotes
router.post('/quotes', async (req, res) => {
  try {
    const { productId, sellerId, quantity, message, offeredPrice } = req.body;
    const quote = await prisma.martQuoteRequest.create({
      data: { buyerId: req.user.userId, productId, sellerId, quantity, message, offeredPrice }
    });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit quote' });
  }
});

router.post('/coupons/validate', async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await prisma.martCoupon.findUnique({ where: { code } });
    if (!coupon || !coupon.isActive || new Date() > coupon.validTo || new Date() < coupon.validFrom) {
      return res.status(400).json({ error: 'Invalid or expired coupon' });
    }
    res.json({ valid: true, coupon });
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate coupon' });
  }
});

export default router;
