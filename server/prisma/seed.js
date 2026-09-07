import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean slate
  await prisma.payout.deleteMany();
  await prisma.investment.deleteMany();
  await prisma.progressUpdate.deleteMany();
  await prisma.guidanceTip.deleteMany();
  await prisma.inputOrder.deleteMany();
  await prisma.insuranceClaim.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.farmerProfile.deleteMany();
  await prisma.investorProfile.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.surveyResponse.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash('password123', 10);

  // ─── Admin ───
  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@cropstocks.in', passwordHash: hash, role: 'ADMIN', kycStatus: 'VERIFIED' }
  });

  // ─── Farmers ───
  const farmer1 = await prisma.user.create({
    data: {
      name: 'Rajesh Kumar', email: 'rajesh@example.com', passwordHash: hash, phone: '9876543210',
      role: 'FARMER', kycStatus: 'VERIFIED',
      farmerProfile: { create: { 
        farmAddress: 'Punjab', farmSize: '8 acres', verificationStatus: 'VERIFIED',
        aadhaarNo: '1234-5678-9012', panNo: 'ABCDE1234F',
        latitude: 30.9010, longitude: 75.8573,
        landDetails: JSON.stringify({ crops: 'Wheat, Rice', soil: 'Alluvial' })
      }}
    }
  });

  const farmer2 = await prisma.user.create({
    data: {
      name: 'Priya Patel', email: 'priya@example.com', passwordHash: hash, phone: '9988776655',
      role: 'FARMER', kycStatus: 'VERIFIED',
      farmerProfile: { create: { 
        farmAddress: 'Maharashtra', farmSize: '12 acres', verificationStatus: 'VERIFIED',
        aadhaarNo: '9876-5432-1098', panNo: 'FGHIJ5678K',
        latitude: 19.0760, longitude: 72.8777,
        landDetails: JSON.stringify({ crops: 'Soybean, Cotton', soil: 'Black' })
      }}
    }
  });

  const farmer3 = await prisma.user.create({
    data: {
      name: 'Amit Singh', email: 'amit@example.com', passwordHash: hash, phone: '9112233445',
      role: 'FARMER', kycStatus: 'VERIFIED',
      farmerProfile: { create: { 
        farmAddress: 'Madhya Pradesh', farmSize: '5 acres', verificationStatus: 'VERIFIED',
        latitude: 23.2599, longitude: 77.4126,
        landDetails: JSON.stringify({ crops: 'Wheat', soil: 'Red' })
      }}
    }
  });

  // ─── Investors ───
  const investor1 = await prisma.user.create({
    data: {
      name: 'Vikram Mehta', email: 'vikram@example.com', passwordHash: hash,
      role: 'INVESTOR', kycStatus: 'VERIFIED',
      investorProfile: { create: { walletBalance: 500000, totalInvested: 150000, totalReturns: 18000 } }
    }
  });

  const investor2 = await prisma.user.create({
    data: {
      name: 'Ananya Sharma', email: 'ananya@example.com', passwordHash: hash,
      role: 'INVESTOR', kycStatus: 'VERIFIED',
      investorProfile: { create: { walletBalance: 250000, totalInvested: 75000, totalReturns: 9500 } }
    }
  });

  // ─── Listings with NDVI + Stock Price ───
  const listing1 = await prisma.listing.create({
    data: {
      farmerId: farmer1.id, type: 'CROP', produceName: 'Wheat', region: 'Punjab',
      landSize: '8', capitalRequired: 120000, capitalRaised: 95000,
      status: 'ACTIVE', cycleDuration: 120, riskTier: 'LOW',
      expectedReturn: 18, insuranceFlag: true,
      ndviScore: 0.78, stockPrice: 1560, vegetationStatus: 'Good',
      profitSplitFarmer: 70, profitSplitInvestor: 30,
      inputBreakdown: JSON.stringify([
        { name: 'Seeds', quantity: 8, unitCost: 2500, totalCost: 20000 },
        { name: 'Fertilizer', quantity: 8, unitCost: 4000, totalCost: 32000 },
        { name: 'Labor', quantity: 8, unitCost: 5000, totalCost: 40000 },
        { name: 'Insurance', quantity: 1, unitCost: 3600, totalCost: 3600 }
      ]),
      fundedAt: new Date('2026-07-15')
    }
  });

  const listing2 = await prisma.listing.create({
    data: {
      farmerId: farmer2.id, type: 'CROP', produceName: 'Soybean', region: 'Maharashtra',
      landSize: '12', capitalRequired: 200000, capitalRaised: 200000,
      status: 'ACTIVE', cycleDuration: 100, riskTier: 'MEDIUM',
      expectedReturn: 22, insuranceFlag: true,
      ndviScore: 0.85, stockPrice: 2340, vegetationStatus: 'Excellent',
      profitSplitFarmer: 60, profitSplitInvestor: 40,
      inputBreakdown: JSON.stringify([
        { name: 'Seeds', quantity: 12, unitCost: 3000, totalCost: 36000 },
        { name: 'Fertilizer', quantity: 12, unitCost: 5000, totalCost: 60000 },
        { name: 'Labor', quantity: 12, unitCost: 6000, totalCost: 72000 },
        { name: 'Insurance', quantity: 1, unitCost: 8000, totalCost: 8000 }
      ]),
      fundedAt: new Date('2026-06-20')
    }
  });

  const listing3 = await prisma.listing.create({
    data: {
      farmerId: farmer1.id, type: 'CROP', produceName: 'Rice', region: 'Punjab',
      landSize: '5', capitalRequired: 85000, capitalRaised: 30000,
      status: 'FUNDING', cycleDuration: 150, riskTier: 'MEDIUM',
      expectedReturn: 15, insuranceFlag: true,
      ndviScore: 0.45, stockPrice: 780, vegetationStatus: 'Fair',
      profitSplitFarmer: 60, profitSplitInvestor: 40,
      inputBreakdown: JSON.stringify([
        { name: 'Seeds', quantity: 5, unitCost: 3500, totalCost: 17500 },
        { name: 'Fertilizer', quantity: 5, unitCost: 5500, totalCost: 27500 },
        { name: 'Labor', quantity: 5, unitCost: 6000, totalCost: 30000 },
        { name: 'Insurance', quantity: 1, unitCost: 3400, totalCost: 3400 }
      ])
    }
  });

  const listing4 = await prisma.listing.create({
    data: {
      farmerId: farmer3.id, type: 'CROP', produceName: 'Cotton', region: 'Madhya Pradesh',
      landSize: '5', capitalRequired: 75000, capitalRaised: 0,
      status: 'FUNDING', cycleDuration: 180, riskTier: 'HIGH',
      expectedReturn: 28, insuranceFlag: true,
      ndviScore: null, stockPrice: 680, vegetationStatus: null,
      profitSplitFarmer: 50, profitSplitInvestor: 50,
      inputBreakdown: JSON.stringify([
        { name: 'Seeds', quantity: 5, unitCost: 4000, totalCost: 20000 },
        { name: 'Fertilizer', quantity: 5, unitCost: 3500, totalCost: 17500 },
        { name: 'Labor', quantity: 5, unitCost: 5500, totalCost: 27500 },
        { name: 'Insurance', quantity: 1, unitCost: 3750, totalCost: 3750 }
      ])
    }
  });

  const listing5 = await prisma.listing.create({
    data: {
      farmerId: farmer2.id, type: 'CROP', produceName: 'Mango', region: 'Maharashtra',
      landSize: '6', capitalRequired: 150000, capitalRaised: 110000,
      status: 'ACTIVE', cycleDuration: 200, riskTier: 'LOW',
      expectedReturn: 25, insuranceFlag: true,
      ndviScore: 0.92, stockPrice: 2890, vegetationStatus: 'Excellent',
      profitSplitFarmer: 70, profitSplitInvestor: 30,
      inputBreakdown: JSON.stringify([
        { name: 'Saplings', quantity: 6, unitCost: 8000, totalCost: 48000 },
        { name: 'Fertilizer', quantity: 6, unitCost: 6000, totalCost: 36000 },
        { name: 'Labor', quantity: 6, unitCost: 7000, totalCost: 42000 },
        { name: 'Insurance', quantity: 1, unitCost: 4500, totalCost: 4500 }
      ]),
      fundedAt: new Date('2026-05-10')
    }
  });

  // ─── Investments ───
  await prisma.investment.create({
    data: { investorId: investor1.id, listingId: listing1.id, amount: 60000, sharePercent: 50 }
  });
  await prisma.investment.create({
    data: { investorId: investor2.id, listingId: listing1.id, amount: 35000, sharePercent: 29.17 }
  });
  await prisma.investment.create({
    data: { investorId: investor1.id, listingId: listing2.id, amount: 90000, sharePercent: 45 }
  });
  await prisma.investment.create({
    data: { investorId: investor2.id, listingId: listing2.id, amount: 40000, sharePercent: 20 }
  });
  await prisma.investment.create({
    data: { investorId: investor1.id, listingId: listing3.id, amount: 30000, sharePercent: 35.29 }
  });
  await prisma.investment.create({
    data: { investorId: investor1.id, listingId: listing5.id, amount: 110000, sharePercent: 73.33 }
  });

  // ─── Progress Updates ───
  await prisma.progressUpdate.create({
    data: { listingId: listing1.id, stage: 'SOWING', notes: 'Wheat seeds sown across 8 acres. Soil moisture optimal.' }
  });
  await prisma.progressUpdate.create({
    data: { listingId: listing1.id, stage: 'GROWTH', notes: 'Healthy germination observed. NDVI at 0.78 — Good vegetation coverage.' }
  });
  await prisma.progressUpdate.create({
    data: { listingId: listing2.id, stage: 'GROWTH', notes: 'Soybean crop thriving. Satellite shows excellent NDVI of 0.85.' }
  });
  await prisma.progressUpdate.create({
    data: { listingId: listing5.id, stage: 'GROWTH', notes: 'Mango trees in full bloom. NDVI 0.92 — best in portfolio.' }
  });

  // ─── Guidance Tips ───
  await prisma.guidanceTip.create({
    data: { applicableType: 'wheat', stage: 'SOWING', content: 'Ensure soil moisture is adequate before sowing. Optimal temperature: 10-25°C.' }
  });
  await prisma.guidanceTip.create({
    data: { applicableType: 'wheat', stage: 'GROWTH', content: 'Apply nitrogen fertilizer at 30 days. Monitor for yellow rust.' }
  });
  await prisma.guidanceTip.create({
    data: { applicableType: 'rice', stage: 'SOWING', content: 'Transplant seedlings at 20-25 days. Maintain 5cm water depth.' }
  });
  await prisma.guidanceTip.create({
    data: { applicableType: 'soybean', stage: 'GROWTH', content: 'Monitor for pod borer insects. Apply organic pesticide if needed.' }
  });

  console.log('✅ Seed completed — Demo data with stock prices & NDVI loaded');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
