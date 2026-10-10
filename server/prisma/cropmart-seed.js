import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCropMart() {
  console.log('Seeding CropMart...');

  // 1. Categories
  const categoriesData = [
    { name: 'Seeds & Plants', slug: 'seeds-plants', description: 'High quality seeds, saplings and plants' },
    { name: 'Fertilizers & Manures', slug: 'fertilizers-manures', description: 'Organic and chemical fertilizers' },
    { name: 'Pesticides & Crop Protection', slug: 'crop-protection', description: 'Pesticides, insecticides and fungicides' },
    { name: 'Farming Tools & Machinery', slug: 'tools-machinery', description: 'Tractors, tillers, hand tools' },
    { name: 'Irrigation Equipment', slug: 'irrigation', description: 'Pipes, pumps, drip irrigation systems' },
    { name: 'Livestock & Poultry Feed', slug: 'livestock-feed', description: 'Nutritious feed for animals' },
    { name: 'Harvesting & Storage', slug: 'harvesting-storage', description: 'Bags, tarps, silos, harvesting tools' },
    { name: 'Farm Produce', slug: 'farm-produce', description: 'Fresh fruits, vegetables and grains straight from farms' }
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.martCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, isActive: true }
    });
    categories.push(created);
  }

  // 2. Sellers (and their users)
  const sellers = [];
  for (let i = 1; i <= 2; i++) {
    const user = await prisma.user.upsert({
      where: { email: `seller${i}@cropmart.com` },
      update: {},
      create: {
        name: `Seller ${i}`,
        email: `seller${i}@cropmart.com`,
        passwordHash: '$2b$10$xyz', // dummy hash
        role: 'VENDOR',
        phone: `987654321${i}`
      }
    });

    const seller = await prisma.sellerProfile.upsert({
      where: { userId: user.id },
      update: { isVerified: true },
      create: {
        userId: user.id,
        businessName: `Agri Traders ${i}`,
        gstNumber: `22AAAAA0000A1Z${i}`,
        pickupAddress: `123 Farm Road, Block ${i}`,
        pickupPincode: `11000${i}`,
        isVerified: true,
        verifiedAt: new Date()
      }
    });
    sellers.push(seller);
  }

  // 3. Products
  const productsData = [
    {
      categoryId: categories[0].id,
      title: 'Hybrid Tomato Seeds (10g)',
      slug: 'hybrid-tomato-seeds',
      price: 150,
      quantity: 500,
      unit: 'piece',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'High yield disease-resistant tomato seeds suitable for tropical climate.'
    },
    {
      categoryId: categories[0].id,
      title: 'Basmati Rice Seeds Pusa 1121 (10kg)',
      slug: 'basmati-pusa-1121',
      price: 1200,
      quantity: 100,
      unit: 'kg',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Premium long-grain Basmati rice seeds.'
    },
    {
      categoryId: categories[1].id,
      title: 'Organic Vermicompost (50kg)',
      slug: 'organic-vermicompost',
      price: 450,
      quantity: 200,
      unit: 'kg',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Rich organic vermicompost for all types of crops.'
    },
    {
      categoryId: categories[1].id,
      title: 'Urea Fertilizer 46% N (50kg Bag)',
      slug: 'urea-fertilizer',
      price: 266.50, // Government subsidized rate
      quantity: 1000,
      unit: 'kg',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      govSubsidyTag: 'Govt. Subsidized',
      description: 'High nitrogen content fertilizer for rapid plant growth.'
    },
    {
      categoryId: categories[2].id,
      title: 'Neem Oil Organic Pesticide (1L)',
      slug: 'neem-oil-1l',
      price: 350,
      quantity: 300,
      unit: 'piece',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: '100% cold-pressed neem oil for natural pest control.'
    },
    {
      categoryId: categories[3].id,
      title: 'Heavy Duty Rotary Tiller',
      slug: 'heavy-duty-rotary-tiller',
      price: 45000,
      quantity: 5,
      unit: 'piece',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      isRentalAvailable: true,
      rentalPricePerDay: 1500,
      description: 'Tractor drawn rotary tiller for field preparation.'
    },
    {
      categoryId: categories[3].id,
      title: 'Battery Operated Knapsack Sprayer (16L)',
      slug: 'battery-knapsack-sprayer',
      price: 2200,
      quantity: 50,
      unit: 'piece',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Efficient and easy-to-use battery sprayer for pesticides.'
    },
    {
      categoryId: categories[4].id,
      title: 'Drip Irrigation Kit (1 Acre)',
      slug: 'drip-irrigation-kit-1acre',
      price: 15000,
      quantity: 20,
      unit: 'piece',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Complete drip irrigation setup including laterals and emitters.'
    },
    {
      categoryId: categories[5].id,
      title: 'Premium Dairy Cattle Feed (50kg)',
      slug: 'dairy-cattle-feed',
      price: 1300,
      quantity: 150,
      unit: 'kg',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Balanced nutritional feed for milking cows.'
    },
    {
      categoryId: categories[6].id,
      title: 'Hermetic Storage Bags (100kg capacity)',
      slug: 'hermetic-storage-bags',
      price: 120,
      quantity: 1000,
      unit: 'piece',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Airtight grain storage bags to prevent moisture and pest damage.'
    },
    {
      categoryId: categories[7].id,
      title: 'Farm Fresh Organic Potatoes (1 Quintal)',
      slug: 'organic-potatoes-quintal',
      price: 1800,
      quantity: 50,
      unit: 'quintal',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Freshly harvested potatoes without chemical fertilizers.'
    },
    {
      categoryId: categories[7].id,
      title: 'Premium Alphonso Mangoes (1 Dozen)',
      slug: 'premium-alphonso',
      price: 800,
      quantity: 100,
      unit: 'piece',
      condition: 'NEW',
      status: 'ACTIVE',
      isApproved: true,
      description: 'Export quality, naturally ripened Alphonso mangoes.'
    }
  ];

  for (let i = 0; i < productsData.length; i++) {
    const p = productsData[i];
    await prisma.martProduct.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        sellerId: sellers[i % sellers.length].id
      }
    });
  }

  // 4. Coupons
  await prisma.martCoupon.upsert({
    where: { code: 'WELCOME500' },
    update: {},
    create: {
      code: 'WELCOME500',
      description: 'Flat Rs. 500 off on first order',
      discountType: 'FLAT',
      discountValue: 500,
      minOrderAmount: 2000,
      validFrom: new Date(),
      validTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      isActive: true
    }
  });

  await prisma.martCoupon.upsert({
    where: { code: 'MONSOON10' },
    update: {},
    create: {
      code: 'MONSOON10',
      description: '10% off on all seeds',
      discountType: 'PERCENT',
      discountValue: 10,
      minOrderAmount: 500,
      maxDiscount: 1000,
      validFrom: new Date(),
      validTo: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      isActive: true
    }
  });

  // 5. Banners
  await prisma.martBanner.create({
    data: {
      title: 'Monsoon Seed Sale',
      imageUrl: '/images/banners/monsoon-sale.jpg',
      position: 1,
      isActive: true
    }
  });

  console.log('CropMart seeded successfully!');
}

// Allow running standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCropMart()
    .catch(e => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
