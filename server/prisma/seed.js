import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Running minimal seed (No demo data)...');

  // We only seed a default admin to avoid getting locked out of admin routes
  const hash = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cropstocks.in' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@cropstocks.in',
      passwordHash: hash,
      role: 'ADMIN',
      kycStatus: 'VERIFIED'
    }
  });

  console.log('✅ Minimal seed complete. Admin created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
