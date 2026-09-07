import os
import time
import datetime
import logging
from typing import Optional, Tuple, Dict
import requests
import shutil
from abc import ABC, abstractmethod

logger = logging.getLogger(__name__)

class SatelliteProvider(ABC):
    @abstractmethod
    def register_polygon(self, geojson: dict, name: str) -> str:
        pass
        
    @abstractmethod
    def search_latest(self, polygon_id: str, max_age_days: int = 30, max_cloud_pct: float = 20.0) -> Optional[dict]:
        pass
        
    @abstractmethod
    def fetch_images(self, acquisition: dict, farmer_id: str) -> Tuple[str, str]:
        pass

class AgromonitoringProvider(SatelliteProvider):
    def __init__(self):
        self.api_key = os.getenv("AGRO_API_KEY")
        if not self.api_key:
            raise RuntimeError("AGRO_API_KEY environment variable is not set. Cannot initialize AgromonitoringProvider.")
        self.base_url = "http://api.agromonitoring.com/agro/1.0"
        self.imagery_dir = os.getenv("IMAGERY_DIR", "./data/satellite_imagery")

    def _request_with_retry(self, method: str, url: str, **kwargs) -> requests.Response:
        max_retries = 3
        backoff_factor = 2
        
        for attempt in range(max_retries):
            try:
                response = requests.request(method, url, timeout=10, **kwargs)
                
                if 400 <= response.status_code < 500:
                    # Client errors are not retryable
                    response.raise_for_status()
                    
                if response.status_code >= 500:
                    raise requests.exceptions.HTTPError(f"Server Error {response.status_code}")
                    
                response.raise_for_status()
                return response
                
            except requests.exceptions.RequestException as e:
                if attempt == max_retries - 1:
                    logger.error(f"Request failed after {max_retries} attempts: {e}")
                    raise
                time.sleep(backoff_factor ** attempt)

    def register_polygon(self, geojson: dict, name: str) -> str:
        url = f"{self.base_url}/polygons?appid={self.api_key}"
        payload = {
            "name": name,
            "geo_json": geojson
        }
        
        response = self._request_with_retry("POST", url, json=payload)
        data = response.json()
        return data.get("id")

    def search_latest(self, polygon_id: str, max_age_days: int = 30, max_cloud_pct: float = 20.0) -> Optional[dict]:
        end_time = int(time.time())
        start_time = int((datetime.datetime.now() - datetime.timedelta(days=max_age_days)).timestamp())
        
        url = f"{self.base_url}/image/search?start={start_time}&end={end_time}&polyid={polygon_id}&appid={self.api_key}"
        
        response = self._request_with_retry("GET", url)
        images = response.json()
        
        # Filter and sort
        valid_images = [img for img in images if img.get("cl", 100) <= max_cloud_pct]
        
        if not valid_images:
            return None
            
        # Sort by date descending (latest first)
        valid_images.sort(key=lambda x: x.get("dt", 0), reverse=True)
        latest = valid_images[0]
        
        # We need to compute/fetch stats for the ndvi values
        stats_url = latest.get("stats", {}).get("ndvi")
        stats_data = {}
        if stats_url:
            stats_response = self._request_with_retry("GET", stats_url)
            stats_data = stats_response.json()
            
        return {
            "acquisition_date": datetime.datetime.fromtimestamp(latest.get("dt")).isoformat(),
            "cloud_cover_pct": latest.get("cl", 0),
            "satellite_source": latest.get("type", "Unknown"),
            "truecolor_url": latest.get("image", {}).get("truecolor"),
            "ndvi_url": latest.get("image", {}).get("ndvi"),
            "ndvi_mean": stats_data.get("mean"),
            "ndvi_min": stats_data.get("min"),
            "ndvi_max": stats_data.get("max")
        }

    def fetch_images(self, acquisition: dict, farmer_id: str) -> Tuple[str, str]:
        farmer_dir = os.path.join(self.imagery_dir, farmer_id)
        os.makedirs(farmer_dir, exist_ok=True)
        
        truecolor_path = os.path.join(farmer_dir, "latest_truecolor.png")
        ndvi_path = os.path.join(farmer_dir, "latest_ndvi.png")
        
        if acquisition.get("truecolor_url"):
            resp = self._request_with_retry("GET", acquisition["truecolor_url"])
            with open(truecolor_path, "wb") as f:
                f.write(resp.content)
                
        if acquisition.get("ndvi_url"):
            resp = self._request_with_retry("GET", acquisition["ndvi_url"])
            with open(ndvi_path, "wb") as f:
                f.write(resp.content)
                
        return truecolor_path, ndvi_path


class SentinelHubProvider(SatelliteProvider):
    def __init__(self):
        self.client_id = os.getenv("SENTINEL_CLIENT_ID")
        self.client_secret = os.getenv("SENTINEL_CLIENT_SECRET")
        if not self.client_id or not self.client_secret:
            raise RuntimeError("Sentinel Hub credentials not fully provided.")
            
    def register_polygon(self, geojson: dict, name: str) -> str:
        # Stub: Return a mock ID
        return "sentinel_poly_" + str(int(time.time()))

    def search_latest(self, polygon_id: str, max_age_days: int = 30, max_cloud_pct: float = 20.0) -> Optional[dict]:
        # Stub: Not fully implemented
        return None

    def fetch_images(self, acquisition: dict, farmer_id: str) -> Tuple[str, str]:
        # Stub: Not fully implemented
        return "", ""

class MockSatelliteProvider(SatelliteProvider):
    def register_polygon(self, geojson: dict, name: str) -> str:
        return "mock_poly_123"

    def search_latest(self, polygon_id: str, max_age_days: int = 30, max_cloud_pct: float = 20.0) -> Optional[dict]:
        return {
            "acquisition_date": datetime.datetime.now().isoformat(),
            "cloud_cover_pct": 5.0,
            "satellite_source": "MockSat-1",
            "truecolor_url": "https://via.placeholder.com/400x300.png?text=Mock+True+Color",
            "ndvi_url": "https://via.placeholder.com/400x300.png?text=Mock+NDVI",
            "ndvi_mean": 0.75,
            "ndvi_min": 0.2,
            "ndvi_max": 0.95
        }

    def fetch_images(self, acquisition: dict, farmer_id: str) -> Tuple[str, str]:
        farmer_dir = os.path.join(os.getenv("IMAGERY_DIR", "./data/satellite_imagery"), farmer_id)
        os.makedirs(farmer_dir, exist_ok=True)
        
        truecolor_path = os.path.join(farmer_dir, "latest_truecolor.png")
        ndvi_path = os.path.join(farmer_dir, "latest_ndvi.png")
        
        # Download the mock images to disk so they can be served as static files
        import requests
        if acquisition.get("truecolor_url"):
            try:
                resp = requests.get(acquisition["truecolor_url"], timeout=10)
                with open(truecolor_path, "wb") as f:
                    f.write(resp.content)
            except Exception as e:
                logger.error(f"Failed to download truecolor mock: {e}")
                
        if acquisition.get("ndvi_url"):
            try:
                resp = requests.get(acquisition["ndvi_url"], timeout=10)
                with open(ndvi_path, "wb") as f:
                    f.write(resp.content)
            except Exception as e:
                logger.error(f"Failed to download ndvi mock: {e}")
                
        return truecolor_path, ndvi_path


def get_satellite_provider() -> SatelliteProvider:
    # Factory to switch providers
    if os.getenv("AGRO_API_KEY"):
        return AgromonitoringProvider()
    else:
        logger.warning("No AGRO_API_KEY found, using MockSatelliteProvider")
        return MockSatelliteProvider()
