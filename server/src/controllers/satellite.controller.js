import { PrismaClient } from '@prisma/client';
import { SentinelHubProvider } from '../services/sentinelHubProvider.js';

const prisma = new PrismaClient();

// Background task
async function fetchImageryTask(farmerId, lat, lon, farmSizeAcres) {
  try {
    const provider = new SentinelHubProvider();
    
    // Update DB with polygon info (mock poly for now as we just use lat/lon directly)
    const polyId = `poly_${farmerId}_${Date.now()}`;
    await prisma.farmerProfile.update({
      where: { userId: farmerId },
      data: { polygonId: polyId }
    });

    // Search for imagery using the real provider (requires lat, lon)
    const history = await provider.searchLatest(lat, lon, farmerId);

    const latest = history[history.length - 1];

    // 4. Update status with URLs directly!
    await prisma.farmerProfile.update({
      where: { userId: farmerId },
      data: {
        satelliteStatus: 'ready',
        latestAcquisitionDate: latest.acquisition_date,
        truecolorUrl: latest.truecolor_url,
        ndviUrl: latest.ndvi_url,
      }
    });

  } catch (error) {
    console.error(`Error in fetchImageryTask for farmer ${farmerId}:`, error);
    await prisma.farmerProfile.update({
      where: { userId: farmerId },
      data: { satelliteStatus: 'unavailable' }
    });
  }
}

export const getSatelliteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await prisma.farmerProfile.findUnique({ where: { userId: id } });

    if (!profile) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    const lat = profile.latitude ?? 28.7041;
    const lon = profile.longitude ?? 77.1025;

    const provider = new SentinelHubProvider();
    const history = await provider.searchLatest(lat, lon, profile.userId);

    res.json({
      farmer_id: id,
      satellite_status: profile.satelliteStatus,
      history: history
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerFarmer = async (req, res) => {
  try {
    const { farmer_id, name, phone, state, district, crop_type, latitude, longitude, farm_size_acres } = req.body;

    if (latitude < 8.0 || latitude > 37.0 || longitude < 68.0 || longitude > 97.5) {
      return res.status(400).json({ error: "Coordinates are out of range. India bounds only." });
    }

    // Ensure farmer profile exists, or create a mock user/profile for testing
    let user = await prisma.user.findUnique({ where: { id: farmer_id } });
    if (!user) {
      // For testing without auth, create a dummy user
      user = await prisma.user.create({
        data: {
          id: farmer_id,
          name: name,
          email: `${farmer_id}@example.com`,
          passwordHash: "dummy",
          phone: phone
        }
      });
    }

    let profile = await prisma.farmerProfile.findUnique({ where: { userId: farmer_id } });
    if (!profile) {
      profile = await prisma.farmerProfile.create({
        data: {
          userId: farmer_id,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          farmSize: farm_size_acres.toString(),
          satelliteStatus: 'pending'
        }
      });
    } else {
      await prisma.farmerProfile.update({
        where: { userId: farmer_id },
        data: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          farmSize: farm_size_acres.toString(),
          satelliteStatus: 'pending'
        }
      });
    }

    // Fire and forget background task
    fetchImageryTask(farmer_id, latitude, longitude, farm_size_acres);

    res.json({
      status: 'registered',
      farmer_id,
      coordinates: { lat: latitude, lon: longitude },
      satellite_status: 'pending'
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSatelliteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await prisma.farmerProfile.findUnique({ where: { userId: id } });

    if (!profile) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    const response = {
      farmer_id: id,
      satellite_status: profile.satelliteStatus,
      latest_acquisition_date: profile.latestAcquisitionDate
    };

    if (profile.satelliteStatus === 'ready') {
      response.truecolor_url = profile.truecolorUrl;
      response.ndvi_url = profile.ndviUrl;
    }

    res.json(response);
  } catch (error) {
    console.error("Status error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
