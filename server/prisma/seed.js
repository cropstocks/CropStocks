import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean slate
  await prisma.priceAttribution.deleteMany();
  await prisma.priceChange.deleteMany();
  await prisma.weeklyCropReport.deleteMany();
  await prisma.remediationCard.deleteMany();
  await prisma.healthDetection.deleteMany();
  await prisma.cropHealthAnalysis.deleteMany();
  await prisma.verificationResult.deleteMany();
  await prisma.submissionBill.deleteMany();
  await prisma.submissionImage.deleteMany();
  await prisma.farmerSubmission.deleteMany();
  await prisma.satelliteSnapshot.deleteMany();
  await prisma.submissionWindow.deleteMany();
  await prisma.farmerAppeal.deleteMany();
  await prisma.cropCycleState.deleteMany();
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

  // ════ WEEKLY LOOP SEED DATA ════
  const cycle1 = await prisma.cropCycleState.create({
    data: {
      listingId: listing1.id,
      farmerId: farmer1.id,
      cycleWeek: 14,
      cropStage: "FLOWERING",
      geofenceLat: 30.901,
      geofenceLng: 75.8573,
      geofenceRadiusM: 100,
      capitalGrantedInr: 120000,
      capitalDisbursedInr: 95000,
      currentPriceInr: 1560,
      priceHistory: JSON.stringify([{ week: 10, price: 1500 }, { week: 11, price: 1520 }, { week: 12, price: 1540 }, { week: 13, price: 1560 }]),
      healthIndexHistory: JSON.stringify([{ week: 10, index: 68 }, { week: 11, index: 70 }, { week: 12, index: 71 }, { week: 13, index: 72 }])
    }
  });

  const cycle2 = await prisma.cropCycleState.create({
    data: {
      listingId: listing2.id,
      farmerId: farmer2.id,
      cycleWeek: 10,
      cropStage: "VEGETATIVE",
      geofenceLat: 22.7196,
      geofenceLng: 75.8577,
      geofenceRadiusM: 100,
      capitalGrantedInr: 80000,
      capitalDisbursedInr: 40000,
      currentPriceInr: 2800,
      priceHistory: JSON.stringify([{ week: 7, price: 2750 }, { week: 8, price: 2780 }, { week: 9, price: 2800 }]),
      healthIndexHistory: JSON.stringify([{ week: 7, index: 65 }, { week: 8, index: 66 }, { week: 9, index: 68 }])
    }
  });

  const window1 = await prisma.submissionWindow.create({
    data: {
      cycleStateId: cycle1.id,
      cycleWeek: 13,
      opensAt: new Date('2026-08-31'),
      closesAt: new Date('2026-09-06'),
      status: 'CLOSED'
    }
  });
  await prisma.submissionWindow.create({
    data: {
      cycleStateId: cycle1.id,
      cycleWeek: 14,
      opensAt: new Date('2026-09-07'),
      closesAt: new Date('2026-09-13'),
      status: 'OPEN'
    }
  });

  const snap1 = await prisma.satelliteSnapshot.create({
    data: {
      cycleStateId: cycle1.id,
      cycleWeek: 13,
      ndviMean: 0.76,
      cloudCoverPct: 5,
      acquisitionDate: '2026-09-02'
    }
  });
  await prisma.satelliteSnapshot.create({
    data: {
      cycleStateId: cycle1.id,
      cycleWeek: 14,
      ndviMean: 0.78,
      cloudCoverPct: 2,
      acquisitionDate: '2026-09-09'
    }
  });

  const sub1 = await prisma.farmerSubmission.create({
    data: {
      cycleStateId: cycle1.id,
      cycleWeek: 13,
      status: 'VERIFIED',
      submittedAt: new Date('2026-09-05'),
      images: {
        create: [
          { fileUrl: 'https://example.com/img1.jpg', captureLat: 30.9011, captureLng: 75.8574, captureAccuracyM: 5, subLocationIndex: 1 },
          { fileUrl: 'https://example.com/img2.jpg', captureLat: 30.9012, captureLng: 75.8572, captureAccuracyM: 4, subLocationIndex: 2 },
          { fileUrl: 'https://example.com/img3.jpg', captureLat: 30.9009, captureLng: 75.8575, captureAccuracyM: 6, subLocationIndex: 3 },
          { fileUrl: 'https://example.com/img4.jpg', captureLat: 30.9008, captureLng: 75.8571, captureAccuracyM: 5, subLocationIndex: 4 }
        ]
      },
      bills: {
        create: [
          { fileUrl: 'https://example.com/bill1.jpg', fileType: 'IMAGE', extractedAmount: 5000, extractedVendor: 'Agri Supply' },
          { fileUrl: 'https://example.com/bill2.jpg', fileType: 'IMAGE', extractedAmount: 2000, extractedVendor: 'Local Labor' }
        ]
      }
    }
  });

  await prisma.verificationResult.create({
    data: {
      submissionId: sub1.id,
      geofencePass: true, livenessPass: true, noveltyPass: true, legibilityPass: true, billSanityPass: true, overallPass: true
    }
  });

  const analysis1 = await prisma.cropHealthAnalysis.create({
    data: {
      submissionId: sub1.id,
      healthIndex: 72,
      confidence: 0.85,
      modelVersion: 'crop-health-v1.0.0-mock',
      kbVersion: 'agronomy-kb-v1.0.0',
      detections: {
        create: [ { diseaseName: 'Minor Leaf Spot', severity: 'LOW', affectedPct: 5, confidence: 0.88 } ]
      }
    }
  });

  await prisma.remediationCard.create({
    data: {
      analysisId: analysis1.id,
      diseaseName: 'Minor Leaf Spot',
      explanation: JSON.stringify({ en: 'Minor fungal infection detected.', hi: 'मामूली फंगल संक्रमण पाया गया।', gu: 'નાનો ફંગલ ચેપ જોવા મળ્યો.' }),
      treatment: JSON.stringify({ en: 'Apply copper-based fungicide.', hi: 'तांबे आधारित कवकनाशी लगाएं।', gu: 'તાંબા આધારિત ફૂગનાશક લગાવો.' }),
      urgencyLevel: 'LOW'
    }
  });

  const report1 = await prisma.weeklyCropReport.create({
    data: {
      cycleStateId: cycle1.id,
      cycleWeek: 13,
      status: 'APPROVED',
      contentHash: 'mock-sha-256-hash',
      reportData: JSON.stringify({ health: 'Good', growth: 'Normal', issues: ['Minor Leaf Spot'] }),
      modelVersion: '1.0', kbVersion: '1.0'
    }
  });

  await prisma.priceChange.create({
    data: {
      cycleStateId: cycle1.id,
      reportId: report1.id,
      cycleWeek: 13,
      priorPriceInr: 1540,
      newPriceInr: 1560,
      deltaPercent: 1.3,
      publishAt: new Date('2026-09-06'),
      published: true,
      attributions: {
        create: [
          { factor: 'HEALTH_INDEX', weight: 0.3, rawValue: 0.5, basisPoints: 15 },
          { factor: 'GROWTH_STAGE', weight: 0.15, rawValue: 0.5, basisPoints: 7 },
          { factor: 'DISEASE_PENALTY', weight: 0.15, rawValue: 0.1, basisPoints: -2 }
        ]
      }
    }
  });

  console.log('✅ Seed completed — Demo data with stock prices & NDVI loaded');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
