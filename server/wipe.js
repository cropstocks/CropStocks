import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Wiping database...');
  await prisma.submissionWindow.deleteMany();
  await prisma.farmerSubmission.deleteMany();
  await prisma.cropHealthAnalysis.deleteMany();
  await prisma.verificationResult.deleteMany();
  await prisma.weeklyCropReport.deleteMany();
  await prisma.cropCycleState.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.farmerProfile.deleteMany();
  await prisma.investorProfile.deleteMany();
  await prisma.user.deleteMany();
  console.log('Database wiped completely.');
}

main().then(() => process.exit(0));
