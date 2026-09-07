import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock Provider Logic (Ported from Python)
class MockSatelliteProvider {
  async registerPolygon(geojson, name) {
    return "mock_poly_" + Date.now();
  }

  async searchLatest(polygonId) {
    // Return mock URLs directly, no need to save to disk in the cloud!
    return {
      acquisition_date: new Date().toISOString(),
      cloud_cover_pct: 5.0,
      satellite_source: "MockSat-1",
      truecolor_url: "https://via.placeholder.com/400x300.png?text=Mock+True+Color",
      ndvi_url: "https://via.placeholder.com/400x300.png?text=Mock+NDVI",
      ndvi_mean: 0.75,
      ndvi_min: 0.2,
      ndvi_max: 0.95
    };
  }
}

// Background task
async function fetchImageryTask(farmerId, lat, lon, farmSizeAcres) {
  try {
    const provider = new MockSatelliteProvider();
    
    // 1. Register Polygon
    const polyId = await provider.registerPolygon({}, `Farmer ${farmerId}`);
    
    // 2. Update DB with polygon ID
    await prisma.farmerProfile.update({
      where: { userId: farmerId },
      data: { polygonId: polyId }
    });

    // 3. Search for imagery
    const acquisition = await provider.searchLatest(polyId);

    // 4. Update status with URLs directly!
    await prisma.farmerProfile.update({
      where: { userId: farmerId },
      data: {
        satelliteStatus: 'ready',
        latestAcquisitionDate: acquisition.acquisition_date,
        truecolorUrl: acquisition.truecolor_url,
        ndviUrl: acquisition.ndvi_url,
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
