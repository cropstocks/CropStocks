import sqlite3
import os
from datetime import datetime
from typing import Optional

def get_db_path():
    return os.getenv("DB_PATH", "./data/cropstock.db")

def init_db():
    os.makedirs(os.path.dirname(get_db_path()), exist_ok=True)
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS farmers (
            farmer_id TEXT PRIMARY KEY,
            name TEXT,
            phone TEXT,
            state TEXT,
            district TEXT,
            crop_type TEXT,
            latitude REAL,
            longitude REAL,
            farm_size_acres REAL,
            polygon_id TEXT,
            satellite_status TEXT DEFAULT 'pending',
            latest_acquisition_date TEXT,
            cloud_cover_pct REAL,
            ndvi_mean REAL,
            ndvi_min REAL,
            ndvi_max REAL,
            satellite_source TEXT,
            truecolor_url TEXT,
            ndvi_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def upsert_farmer(farmer_dict: dict):
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    
    # We use REPLACE INTO to upsert based on the PRIMARY KEY
    cursor.execute("""
        REPLACE INTO farmers (
            farmer_id, name, phone, state, district, crop_type, 
            latitude, longitude, farm_size_acres, satellite_status
        ) VALUES (
            :farmer_id, :name, :phone, :state, :district, :crop_type, 
            :latitude, :longitude, :farm_size_acres, 'pending'
        )
    """, farmer_dict)
    conn.commit()
    conn.close()

def get_farmer(farmer_id: str) -> Optional[dict]:
    conn = sqlite3.connect(get_db_path())
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM farmers WHERE farmer_id = ?", (farmer_id,))
    row = cursor.fetchone()
    conn.close()
    
    return dict(row) if row else None

def update_polygon_id(farmer_id: str, polygon_id: str):
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    cursor.execute("UPDATE farmers SET polygon_id = ? WHERE farmer_id = ?", (polygon_id, farmer_id))
    conn.commit()
    conn.close()

def update_satellite_status(farmer_id: str, status: str, metadata: dict = None, truecolor_url: str = None, ndvi_url: str = None):
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    
    if status == 'ready' and metadata:
        cursor.execute("""
            UPDATE farmers 
            SET satellite_status = ?,
                latest_acquisition_date = ?,
                cloud_cover_pct = ?,
                ndvi_mean = ?,
                ndvi_min = ?,
                ndvi_max = ?,
                satellite_source = ?,
                truecolor_url = ?,
                ndvi_url = ?
            WHERE farmer_id = ?
        """, (
            status,
            metadata.get("acquisition_date"),
            metadata.get("cloud_cover_pct"),
            metadata.get("ndvi_mean"),
            metadata.get("ndvi_min"),
            metadata.get("ndvi_max"),
            metadata.get("satellite_source"),
            truecolor_url,
            ndvi_url,
            farmer_id
        ))
    else:
        cursor.execute("""
            UPDATE farmers 
            SET satellite_status = ?
            WHERE farmer_id = ?
        """, (status, farmer_id))
        
    conn.commit()
    conn.close()
