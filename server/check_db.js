import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const profiles = await prisma.farmerProfile.findMany();
  console.log("Found profiles:", profiles.length);
  for (const p of profiles) {
    console.log(`User ${p.userId}: Lat=${p.latitude}, Lon=${p.longitude}, Polygon=${p.polygonData ? 'YES' : 'NO'}`);
  }
}
run();
