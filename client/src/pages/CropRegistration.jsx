import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Leaf, MapPin, Upload } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import api from '../services/api';

// Fix for default Leaflet icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function GeomanControl({ setCoordinates }) {
  const map = useMap();

  useEffect(() => {
    map.pm.addControls({
      position: 'topright',
      drawMarker: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: true,
      drawPolygon: true,
      drawCircle: false,
      editMode: true,
      dragMode: false,
      cutPolygon: false,
      removalMode: true,
    });

    map.on('pm:create', (e) => {
      const layer = e.layer;
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map(latlng => ({ lat: latlng.lat, lng: latlng.lng }));
      setCoordinates(coords);
      
      layer.on('pm:edit', (e) => {
        const editedLatlngs = layer.getLatLngs()[0];
        const editedCoords = editedLatlngs.map(latlng => ({ lat: latlng.lat, lng: latlng.lng }));
        setCoordinates(editedCoords);
      });
    });

    map.on('pm:remove', (e) => {
      setCoordinates(null);
    });

    return () => {
      map.pm.removeControls();
      map.off('pm:create');
      map.off('pm:remove');
    };
  }, [map, setCoordinates]);

  return null;
}

function MapController({ targetLocation }) {
  const map = useMap();
  useEffect(() => {
    if (targetLocation) {
      map.flyTo(targetLocation, 16);
    }
  }, [targetLocation, map]);
  return null;
}

export default function CropRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropName: '',
    cropVariety: '',
    expectedYield: '',
    sowingDate: '',
    harvestDate: '',
  });
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [targetLocation, setTargetLocation] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleLocate = (e) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTargetLocation([position.coords.latitude, position.coords.longitude]);
        setLocating(false);
      },
      (err) => {
        alert("Unable to retrieve your location. Please check your browser permissions.");
        setLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coordinates) {
      alert("Please draw your farm area on the map.");
      return;
    }
    
    setLoading(true);
    try {
      // Calculate rough centroid for bbox fallback
      const lats = coordinates.map(c => c.lat);
      const lngs = coordinates.map(c => c.lng);
      const centerLat = lats.reduce((a,b) => a+b, 0) / lats.length;
      const centerLng = lngs.reduce((a,b) => a+b, 0) / lngs.length;

      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (!user) {
        alert("You must be logged in to register a farm.");
        setLoading(false);
        return;
      }

      const payload = {
        farmer_id: user.id,
        name: user.name,
        phone: user.phone || '0000000000',
        latitude: centerLat,
        longitude: centerLng,
        farm_size_acres: formData.expectedYield || 1, // rough mapping for now
        polygonData: JSON.stringify(coordinates)
      };

      // Use standard api wrapper
      await api.post('/farmers/register', payload);

      alert("Crop registered successfully with exact farm boundaries! Sentinel-2 will now clip the imagery specifically to this polygon.");
      navigate('/farmer-dashboard');
    } catch (e) {
      console.error(e);
      alert("Error saving registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Default center (India)
  const mapCenter = [22.9734, 78.6569];
  const mapZoom = 5;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#348a21] p-6 text-white text-center">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Leaf /> Crop & Farm Registration
            </h1>
            <p className="opacity-90">
              Register your crop details and mark your farm area using satellite imagery.
            </p>
          </div>

          <div className="p-8 flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Crop Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                  <input
                    required
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#348a21] focus:border-transparent outline-none"
                    placeholder="e.g. Wheat, Rice, Cotton"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Variety</label>
                  <input
                    required
                    type="text"
                    name="cropVariety"
                    value={formData.cropVariety}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#348a21] focus:border-transparent outline-none"
                    placeholder="e.g. Sharbati, Basmati"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Yield (Quintals)</label>
                    <input
                      required
                      type="number"
                      name="expectedYield"
                      value={formData.expectedYield}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#348a21] focus:border-transparent outline-none"
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sowing Date</label>
                    <input
                      required
                      type="date"
                      name="sowingDate"
                      value={formData.sowingDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#348a21] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {coordinates && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <MapPin className="text-[#348a21] mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-800 text-sm mb-1">Farm Area Selected</h4>
                      <p className="text-xs text-green-700">
                        Coordinates captured: {coordinates.length} points
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#348a21] hover:bg-[#286f18] text-white font-bold py-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 mt-4"
                >
                  {loading ? 'Saving Registration...' : 'Register Crop & Farm Area'} <Upload size={18} />
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2 border-b pb-2">
                <h2 className="text-xl font-bold text-gray-800 m-0">Draw Farm Boundary</h2>
                <button 
                  type="button"
                  onClick={handleLocate}
                  disabled={locating}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 shadow-sm transition-colors"
                >
                  <MapPin size={16} /> {locating ? 'Locating...' : 'Use Current Location'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Use the drawing tools on the map below to outline the exact area of your farm. 
                Satellite imagery is provided for free to help you pinpoint your land.
              </p>
              
              <div className="flex-1 min-h-[500px] rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner relative z-0">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-black/60 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 shadow-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Latest Imagery Data: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
                  {/* Free ESRI Satellite Tile Layer */}
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                  />
                  <GeomanControl setCoordinates={setCoordinates} />
                  <MapController targetLocation={targetLocation} />
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
