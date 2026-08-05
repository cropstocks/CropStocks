import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.payout.deleteMany();
  await prisma.investment.deleteMany();
  await prisma.progressUpdate.deleteMany();
  await prisma.guidanceTip.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.farmerProfile.deleteMany();
  await prisma.investorProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: { name: 'Admin', email: 'admin@cropstocks.in', passwordHash, role: 'ADMIN', kycStatus: 'VERIFIED' }
  });

  const farmerHash = await bcrypt.hash('farmer123', 10);
  const farmer = await prisma.user.create({
    data: {
      name: 'Farmer John', email: 'farmer@example.com', passwordHash, role: 'FARMER', kycStatus: 'VERIFIED',
      farmerProfile: { create: { farmAddress: 'Punjab', farmSize: '5 acres', verificationStatus: 'VERIFIED' } }
    }
  });

  const investorHash = await bcrypt.hash('investor123', 10);
  const investor = await prisma.user.create({
    data: {
      name: 'Investor Jane', email: 'investor@example.com', passwordHash, role: 'INVESTOR', kycStatus: 'VERIFIED',
      investorProfile: { create: { walletBalance: 500000 } }
    }
  });

  const listing1 = await prisma.listing.create({
    data: {
      farmerId: farmer.id, type: 'CROP', produceName: 'Wheat', region: 'Punjab', landSize: '5',
      capitalRequired: 50000, capitalRaised: 50000, status: 'ACTIVE', cycleDuration: 120, riskTier: 'MEDIUM',
      fundedAt: new Date(), insuranceFlag: true
    }
  });

  const listing2 = await prisma.listing.create({
    data: {
      farmerId: farmer.id, type: 'CROP', produceName: 'Rice', region: 'Punjab', landSize: '10',
      capitalRequired: 100000, capitalRaised: 0, status: 'FUNDING', cycleDuration: 150, riskTier: 'MEDIUM',
      insuranceFlag: true
    }
  });

  await prisma.investment.create({
    data: { investorId: investor.id, listingId: listing1.id, amount: 50000, sharePercent: 100 }
  });

  await prisma.progressUpdate.create({
    data: { listingId: listing1.id, stage: 'SOWING', notes: 'Seeds sown successfully' }
  });

  await prisma.guidanceTip.create({
    data: { applicableType: 'wheat', stage: 'SOWING', content: 'Ensure soil is moist before sowing.' }
  });
  
  await prisma.guidanceTip.create({
    data: { applicableType: 'rice', stage: 'GROWTH', content: 'Maintain water levels.' }
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
