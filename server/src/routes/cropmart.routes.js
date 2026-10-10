import express from 'express';
import { prisma } from '../utils/prisma.js';

const router = express.Router();

/**
 * GET /categories
 * List all categories with product counts
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.martCategory.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true }
        },
        children: true
      },
      orderBy: { sortOrder: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * GET /banners
 * Active banners
 */
router.get('/banners', async (req, res) => {
  try {
    const now = new Date();
    const banners = await prisma.martBanner.findMany({
      where: {
        isActive: true,
        OR: [
          { startsAt: null },
          { startsAt: { lte: now } }
        ],
        AND: [
          {
            OR: [
              { endsAt: null },
              { endsAt: { gte: now } }
            ]
          }
        ]
      },
      orderBy: { position: 'asc' }
    });
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

/**
 * GET /featured
 * Featured products
 */
router.get('/featured', async (req, res) => {
  try {
    const products = await prisma.martProduct.findMany({
      where: { isFeatured: true, status: 'ACTIVE', isApproved: true },
      include: {
        seller: {
          select: { businessName: true, isVerified: true }
        },
        category: {
          select: { name: true, slug: true }
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

/**
 * GET /deals
 * Seasonal deals / discounted products
 */
router.get('/deals', async (req, res) => {
  try {
    const products = await prisma.martProduct.findMany({
      where: { discountPercent: { gt: 0 }, status: 'ACTIVE', isApproved: true },
      include: {
        seller: {
          select: { businessName: true, isVerified: true }
        },
        category: {
          select: { name: true, slug: true }
        }
      },
      take: 10,
      orderBy: { discountPercent: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

/**
 * GET /search/suggest
 * Autosuggest for search
 */
router.get('/search/suggest', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json([]);
    const products = await prisma.martProduct.findMany({
      where: {
        status: 'ACTIVE',
        isApproved: true,
        title: { contains: q, mode: 'insensitive' }
      },
      select: { id: true, title: true, slug: true },
      take: 5
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

/**
 * GET /
 * List products with pagination, filters, sorting
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, minPrice, maxPrice, brand, rating, location, condition, search, sort } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {
      status: 'ACTIVE',
      isApproved: true
    };
    
    if (category) where.categoryId = category;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (brand) where.brand = brand;
    if (rating) where.avgRating = { gte: parseFloat(rating) };
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (condition) where.condition = condition;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    let orderBy = {};
    switch (sort) {
      case 'price_asc': orderBy = { price: 'asc' }; break;
      case 'price_desc': orderBy = { price: 'desc' }; break;
      case 'rating': orderBy = { avgRating: 'desc' }; break;
      case 'newest': orderBy = { createdAt: 'desc' }; break;
      default: orderBy = { createdAt: 'desc' };
    }

    const [total, products] = await Promise.all([
      prisma.martProduct.count({ where }),
      prisma.martProduct.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy,
        include: {
          seller: { select: { businessName: true, isVerified: true } },
          category: { select: { name: true, slug: true } }
        }
      })
    ]);

    res.json({
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * GET /products/:id
 * Product detail
 */
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.martProduct.findUnique({
      where: { id },
      include: {
        seller: true,
        category: true
      }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * GET /products/:id/reviews
 * Reviews with pagination
 */
router.get('/products/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [total, reviews] = await Promise.all([
      prisma.martReview.count({ where: { productId: id } }),
      prisma.martReview.findMany({
        where: { productId: id },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true } }
        }
      })
    ]);
    
    res.json({
      data: reviews,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

/**
 * GET /products/:id/questions
 * Q&A
 */
router.get('/products/:id/questions', async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await prisma.martProductQuestion.findMany({
      where: { productId: id },
      orderBy: { createdAt: 'desc' },
      include: {
        asker: { select: { name: true } }
      }
    });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

export default router;
