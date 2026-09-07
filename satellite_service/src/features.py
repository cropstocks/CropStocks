import logging
from datetime import datetime
from typing import Optional
from .db import get_farmer

logger = logging.getLogger(__name__)

# Baseline NDVI values for healthy crops (modeling assumption)
# These values are approximate and should be refined with actual historical data
HEALTHY_CROP_BASELINES = {
    "wheat": 0.75,
    "rice": 0.80,
    "maize": 0.75,
    "cotton": 0.70,
    "sugarcane": 0.85,
    "default": 0.65
}

def extract_satellite_features(farmer_id: str) -> Optional[dict]:
    """
    Extracts ML features derived from the cached satellite metadata for a given farmer.
    Returns None if no satellite data is available yet, degrading gracefully.
    """
    farmer = get_farmer(farmer_id)
    if not farmer:
        logger.warning(f"Farmer {farmer_id} not found in database.")
        return None

    if farmer.get("satellite_status") != "ready":
        logger.warning(f"Satellite data for farmer {farmer_id} is not ready yet (status: {farmer.get('satellite_status')}).")
        return None

    ndvi_mean = farmer.get("ndvi_mean")
    ndvi_min = farmer.get("ndvi_min")
    ndvi_max = farmer.get("ndvi_max")
    
    if ndvi_mean is None:
        logger.warning(f"NDVI mean is missing for farmer {farmer_id}.")
        return None

    # Calculate Vegetative Health Index (VHI)
    # Simple ratio of current NDVI mean to expected healthy NDVI mean for the crop type
    crop_type = farmer.get("crop_type", "default").lower()
    baseline = HEALTHY_CROP_BASELINES.get(crop_type, HEALTHY_CROP_BASELINES["default"])
    vegetative_health_index = min(1.0, max(0.0, ndvi_mean / baseline))

    # Calculate acquisition latency
    latency_days = None
    created_at_str = farmer.get("created_at")
    acq_date_str = farmer.get("latest_acquisition_date")
    
    if created_at_str and acq_date_str:
        try:
            # Handle different datetime formats. SQlite CURRENT_TIMESTAMP gives 'YYYY-MM-DD HH:MM:SS'
            # The acquisition date is in ISO format 'YYYY-MM-DDTHH:MM:SS'
            created_at = datetime.strptime(created_at_str, "%Y-%m-%d %H:%M:%S")
            acq_date = datetime.fromisoformat(acq_date_str)
            # The latency is the absolute difference in days
            latency_days = abs((created_at - acq_date).days)
        except ValueError as e:
            logger.error(f"Error parsing dates for latency calculation: {e}")

    return {
        "ndvi_mean": ndvi_mean,
        "ndvi_min": ndvi_min,
        "ndvi_max": ndvi_max,
        "vegetative_health_index": vegetative_health_index,
        "acquisition_latency_days": latency_days,
        "cloud_cover_pct": farmer.get("cloud_cover_pct")
    }
