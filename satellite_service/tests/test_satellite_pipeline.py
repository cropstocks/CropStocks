import os
import json
import time
import datetime
import pytest
import responses
from fastapi.testclient import TestClient

# Must set these before importing app so the lifespan check passes
os.environ["AGRO_API_KEY"] = "mock_key"
os.environ["DB_PATH"] = "./data/test_cropstock.db"
os.environ["IMAGERY_DIR"] = "./data/test_satellite_imagery"

from src.app import app
from src.farmer_service import coords_to_bbox, FarmerRegistration
from src.satellite_monitor import AgromonitoringProvider
from src.training_data import build_training_table
from src.db import init_db

# Initialize DB so the table exists
init_db()

client = TestClient(app)

# --- 1. Coordinate Validation & BBox Tests ---
def test_valid_indian_phone():
    farmer = FarmerRegistration(
        name="Test", phone="9876543210", state="UP", district="Lucknow",
        crop_type="wheat", latitude=26.8, longitude=80.9, farm_size_acres=2.5
    )
    assert farmer.phone == "9876543210"

def test_invalid_indian_phone():
    with pytest.raises(ValueError):
        FarmerRegistration(
            name="Test", phone="12345", state="UP", district="Lucknow",
            crop_type="wheat", latitude=26.8, longitude=80.9, farm_size_acres=2.5
        )

def test_coords_to_bbox():
    # Regular size farm
    bbox = coords_to_bbox(lat=20.0, lon=75.0, farm_size_acres=50.0)
    assert bbox["type"] == "Polygon"
    assert len(bbox["coordinates"][0]) == 5 # closed ring
    
    # Very small farm (should hit 500m floor)
    bbox_small = coords_to_bbox(lat=20.0, lon=75.0, farm_size_acres=0.01)
    
    # Calculate the side length of the bounding box (degrees to meters)
    # distance between bottom_left and bottom_right
    dlon_deg = bbox_small["coordinates"][0][1][0] - bbox_small["coordinates"][0][0][0]
    import math
    side_lon_meters = dlon_deg * 111320.0 * math.cos(math.radians(20.0))
    
    # Should be approximately 500 meters
    assert 490.0 <= side_lon_meters <= 510.0


# --- 2. Registration Endpoint Tests ---
def test_register_out_of_bounds_coords():
    # Latitude outside India (e.g. 5.0)
    payload = {
        "name": "Test", "phone": "9876543210", "state": "UP", "district": "Lucknow",
        "crop_type": "wheat", "latitude": 5.0, "longitude": 80.9, "farm_size_acres": 2.5
    }
    response = client.post("/api/farmers/register", json=payload)
    assert response.status_code == 400
    assert "Coordinates are out of range" in response.json()["detail"]

@responses.activate
def test_register_success():
    payload = {
        "farmer_id": "test-farmer-123",
        "name": "Test", "phone": "9876543210", "state": "UP", "district": "Lucknow",
        "crop_type": "wheat", "latitude": 26.8, "longitude": 80.9, "farm_size_acres": 2.5
    }
    
    # We will trigger the background task, but we need to mock the Agromonitoring API calls that it makes.
    # 1. Mock Polygons Registration
    responses.add(
        responses.POST,
        "http://api.agromonitoring.com/agro/1.0/polygons?appid=mock_key",
        json={"id": "mock_poly_123"},
        status=201
    )
    
    # 2. Mock Image Search (Return no images to test the "unavailable" flow quickly)
    import re
    search_url_pattern = re.compile(r"http://api.agromonitoring.com/agro/1.0/image/search.*")
    responses.add(
        responses.GET,
        search_url_pattern,
        json=[], # Empty list = no clear imagery
        status=200
    )
    
    # By hitting the endpoint with TestClient, BackgroundTasks are executed synchronously
    # after the response is generated. Wait... TestClient executes them immediately in the same thread?
    # Yes, TestClient runs background tasks before returning the response.
    response = client.post("/api/farmers/register", json=payload)
    assert response.status_code == 200
    assert response.json()["status"] == "registered"
    assert response.json()["satellite_status"] == "pending"
    
    # Check status endpoint
    response_status = client.get("/api/farmers/test-farmer-123/satellite-status")
    assert response_status.status_code == 200
    # The background task ran and found no images
    assert response_status.json()["satellite_status"] == "unavailable"


# --- 3. Satellite Client Mock Tests ---
@responses.activate
def test_satellite_provider_success(tmp_path):
    provider = AgromonitoringProvider()
    provider.imagery_dir = str(tmp_path)
    
    # Mock search with imagery
    current_time = int(time.time())
    
    stats_url = "http://api.agromonitoring.com/stats/123"
    
    import re
    search_url_pattern = re.compile(r"http://api.agromonitoring.com/agro/1.0/image/search.*")
    responses.add(
        responses.GET,
        search_url_pattern,
        json=[{
            "dt": current_time,
            "cl": 10.0,
            "type": "Sentinel-2",
            "image": {
                "truecolor": "http://mock.com/truecolor.png",
                "ndvi": "http://mock.com/ndvi.png"
            },
            "stats": {"ndvi": stats_url}
        }],
        status=200
    )
    
    responses.add(responses.GET, stats_url, json={"mean": 0.6, "min": 0.1, "max": 0.9}, status=200)
    
    acquisition = provider.search_latest("mock_poly_123")
    assert acquisition is not None
    assert acquisition["cloud_cover_pct"] == 10.0
    assert acquisition["ndvi_mean"] == 0.6
    
    # Mock image downloads
    responses.add(responses.GET, "http://mock.com/truecolor.png", body=b"fake_image_data", status=200)
    responses.add(responses.GET, "http://mock.com/ndvi.png", body=b"fake_ndvi_data", status=200)
    
    t_path, n_path = provider.fetch_images(acquisition, "farmer_abc")
    
    assert os.path.exists(t_path)
    assert os.path.exists(n_path)
    with open(t_path, "rb") as f:
        assert f.read() == b"fake_image_data"


# --- 4. Training Data Build Tests ---
def test_build_training_table(tmp_path):
    raw_dir = tmp_path / "raw"
    processed_dir = tmp_path / "processed"
    raw_dir.mkdir()
    
    # Create mock yield.csv
    yield_csv = raw_dir / "yield.csv"
    yield_csv.write_text("state,district,crop,year,yield_tons_per_ha\nUP,Lucknow,wheat,2020,3.5\nUP,Kanpur,wheat,2020,3.2\n")
    
    # Create mock rainfall.csv
    rain_csv = raw_dir / "rainfall.csv"
    rain_csv.write_text("state,district,year,annual_rainfall_mm\nUP,Lucknow,2020,950\nUP,Kanpur,2020,800\nMP,Bhopal,2020,1000\n")
    
    out_path = build_training_table(str(raw_dir), str(processed_dir))
    
    assert out_path is not None
    assert os.path.exists(out_path)
    
    import pandas as pd
    df = pd.read_csv(out_path)
    assert len(df) == 2
    assert "yield_tons_per_ha" in df.columns
    assert "annual_rainfall_mm" in df.columns
    assert df.loc[df["district"] == "lucknow", "annual_rainfall_mm"].values[0] == 950
