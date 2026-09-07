import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, BackgroundTasks, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from .farmer_service import FarmerRegistration, coords_to_bbox
from .db import init_db, upsert_farmer, get_farmer, update_polygon_id, update_satellite_status
from .satellite_monitor import get_satellite_provider

load_dotenv()
logger = logging.getLogger(__name__)

# Validate that we have the API key at startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    if not os.getenv("AGRO_API_KEY") and not os.getenv("SENTINEL_CLIENT_ID"):
        logger.error("No satellite provider credentials found in environment. Exiting.")
        raise RuntimeError("Satellite provider credentials are required.")
    init_db()
    
    # Ensure imagery dir exists
    imagery_dir = os.getenv("IMAGERY_DIR", "./data/satellite_imagery")
    os.makedirs(imagery_dir, exist_ok=True)
    yield

app = FastAPI(title="CropStocks Satellite Microservice", lifespan=lifespan)

imagery_dir = os.getenv("IMAGERY_DIR", "./data/satellite_imagery")
os.makedirs(imagery_dir, exist_ok=True)
# Mount static files to serve the imagery
app.mount("/static/satellite_imagery", StaticFiles(directory=imagery_dir), name="satellite_imagery")

def fetch_imagery_task(farmer_id: str, lat: float, lon: float, farm_size_acres: float, farmer_name: str):
    """
    Background task to fetch satellite imagery.
    """
    try:
        provider = get_satellite_provider()
        bbox = coords_to_bbox(lat, lon, farm_size_acres)
        
        # 1. Register Polygon
        poly_id = provider.register_polygon(bbox, f"Farmer {farmer_name} ({farmer_id})")
        update_polygon_id(farmer_id, poly_id)
        
        # 2. Search for imagery
        acquisition = provider.search_latest(poly_id)
        
        if acquisition:
            # 3. Fetch images
            truecolor_path, ndvi_path = provider.fetch_images(acquisition, farmer_id)
            
            # 4. Update status with URLs
            # Convert local paths to static URLs
            truecolor_url = f"/static/satellite_imagery/{farmer_id}/{os.path.basename(truecolor_path)}"
            ndvi_url = f"/static/satellite_imagery/{farmer_id}/{os.path.basename(ndvi_path)}"
            
            update_satellite_status(
                farmer_id=farmer_id,
                status="ready",
                metadata=acquisition,
                truecolor_url=truecolor_url,
                ndvi_url=ndvi_url
            )
        else:
            update_satellite_status(farmer_id, "unavailable")
            
    except Exception as e:
        logger.error(f"Error in fetch_imagery_task for farmer {farmer_id}: {e}")
        update_satellite_status(farmer_id, "unavailable")


@app.post("/api/farmers/register")
def register_farmer(farmer: FarmerRegistration, background_tasks: BackgroundTasks):
    # Validate GPS bounds for India
    if not (8.0 <= farmer.latitude <= 37.0) or not (68.0 <= farmer.longitude <= 97.5):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Coordinates are out of range. India bounds are 8.0 to 37.0 (Lat) and 68.0 to 97.5 (Lon)."
        )

    # Upsert to DB
    farmer_dict = farmer.model_dump()
    upsert_farmer(farmer_dict)

    # Kick off background task
    background_tasks.add_task(
        fetch_imagery_task,
        farmer_id=farmer.farmer_id,
        lat=farmer.latitude,
        lon=farmer.longitude,
        farm_size_acres=farmer.farm_size_acres,
        farmer_name=farmer.name
    )

    return {
        "status": "registered",
        "farmer_id": farmer.farmer_id,
        "coordinates": {"lat": farmer.latitude, "lon": farmer.longitude},
        "satellite_status": "pending"
    }

@app.get("/api/farmers/{farmer_id}/satellite-status")
def get_satellite_status(farmer_id: str):
    farmer = get_farmer(farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    response = {
        "farmer_id": farmer_id,
        "satellite_status": farmer.get("satellite_status"),
        "latest_acquisition_date": farmer.get("latest_acquisition_date")
    }

    # Only include URLs if ready
    if farmer.get("satellite_status") == "ready":
        response["truecolor_url"] = farmer.get("truecolor_url")
        response["ndvi_url"] = farmer.get("ndvi_url")

    return response
