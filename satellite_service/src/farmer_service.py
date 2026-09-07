import uuid
import math
import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator

class FarmerRegistration(BaseModel):
    farmer_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    state: str
    district: str
    crop_type: str
    latitude: float
    longitude: float
    farm_size_acres: float

    @field_validator('phone')
    @classmethod
    def validate_indian_phone(cls, v: str) -> str:
        if not re.fullmatch(r'^[6-9]\d{9}$', v):
            raise ValueError("Phone number must be a valid 10-digit Indian mobile number")
        return v

def coords_to_bbox(lat: float, lon: float, farm_size_acres: Optional[float] = None) -> dict:
    """
    Computes a rough square bounding box around a center point, assuming the farm is a square plot.
    This is an approximation and not a cadastral boundary.
    The bounding box will be at least ~500m x 500m to avoid degenerate polygons for very small areas.
    
    Args:
        lat: Latitude of the center point
        lon: Longitude of the center point
        farm_size_acres: Size of the farm in acres. Default 0.0 (will floor to 500m x 500m)
        
    Returns:
        GeoJSON Polygon dict representation.
    """
    if farm_size_acres is None or farm_size_acres <= 0:
        farm_size_acres = 0.0

    # 1 acre ≈ 4046.86 m^2
    side_m = math.sqrt(farm_size_acres * 4046.86)
    
    # Floor at 500m (i.e. side length of 500 meters)
    if side_m < 500.0:
        side_m = 500.0

    half_side = side_m / 2.0

    # Convert meters to degrees
    # 1 degree of latitude is roughly 111,320 meters everywhere
    dlat = half_side / 111320.0
    
    # 1 degree of longitude is roughly 111,320 * cos(lat) meters
    dlon = half_side / (111320.0 * math.cos(math.radians(lat)))

    # Compute bounding box corners
    # Points must be ordered counter-clockwise or clockwise. 
    # Let's do counter-clockwise starting from bottom-left
    bottom_left = [lon - dlon, lat - dlat]
    bottom_right = [lon + dlon, lat - dlat]
    top_right = [lon + dlon, lat + dlat]
    top_left = [lon - dlon, lat + dlat]

    # GeoJSON Polygon needs to be a closed ring (first point == last point)
    coordinates = [[
        bottom_left,
        bottom_right,
        top_right,
        top_left,
        bottom_left
    ]]

    return {
        "type": "Polygon",
        "coordinates": coordinates
    }
