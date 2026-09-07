import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { satelliteApi } from '../services/satelliteApi';

export default function FarmMonitor() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    state: '',
    district: '',
    crop_type: '',
    latitude: '',
    longitude: '',
    farm_size_acres: ''
  });
  
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [polling, setPolling] = useState(false);

  // Poll status if pending
  useEffect(() => {
    let interval;
    if (polling && user?.id) {
      interval = setInterval(async () => {
        try {
          const res = await satelliteApi.checkStatus(user.id);
          setStatusData(res);
          if (res.satellite_status !== 'pending') {
            setPolling(false);
          }
        } catch (err) {
          // If 404, it means not registered yet, stop polling
          if (err.message.includes('not found')) {
            setPolling(false);
          }
        }
      }, 5000); // poll every 5 seconds
    }
    return () => clearInterval(interval);
  }, [polling, user?.id]);

  // Initial status check
  useEffect(() => {
    const fetchInitialStatus = async () => {
      if (!user?.id) return;
      try {
        const res = await satelliteApi.checkStatus(user.id);
        setStatusData(res);
        if (res.satellite_status === 'pending') {
          setPolling(true);
        }
      } catch (err) {
        // likely not registered, do nothing
      }
    };
    fetchInitialStatus();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
      },
      () => {
        setError('Unable to retrieve your location');
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        farmer_id: user.id,
        name: formData.name,
        phone: formData.phone,
        state: formData.state,
        district: formData.district,
        crop_type: formData.crop_type,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        farm_size_acres: parseFloat(formData.farm_size_acres)
      };
      const res = await satelliteApi.registerFarm(payload);
      setStatusData({
        satellite_status: res.satellite_status
      });
      if (res.satellite_status === 'pending') {
        setPolling(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to register farm');
    } finally {
      setLoading(false);
    }
  };

  const API_URL = import.meta.env.VITE_SATELLITE_API_URL || `http://${window.location.hostname}:8001/api`;
  const SATELLITE_API_URL = API_URL.replace(/\/api$/, '');

  if (!statusData || statusData.satellite_status === 'not_found' || error.includes('not found')) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-heading text-brand-dark mb-8">🛰️ Farm Satellite Setup</h1>
        <div className="glass-card p-8">
          <p className="mb-6 text-gray-600">
            Register your farm's location to start receiving automated satellite monitoring and Vegetative Health Index (VHI) analysis.
          </p>
          {error && <div className="mb-4 text-red-500 bg-red-50 p-3 rounded">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (10 digits)</label>
                <input required type="text" name="phone" value={formData.phone} onChange={handleChange} pattern="[6-9][0-9]{9}" placeholder="e.g. 9876543210" className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <input required type="text" name="district" value={formData.district} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                <select required name="crop_type" value={formData.crop_type} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm">
                  <option value="">Select a crop</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="maize">Maize</option>
                  <option value="cotton">Cotton</option>
                  <option value="sugarcane">Sugarcane</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (Acres)</label>
                <input required type="number" step="0.01" min="0.01" name="farm_size_acres" value={formData.farm_size_acres} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">GPS Coordinates</h3>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input required type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="e.g. 26.8467" className="w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input required type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="e.g. 80.9462" className="w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <button type="button" onClick={handleGetLocation} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors">
                  📍 Get Current Location
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary mt-6 py-3">
              {loading ? 'Registering...' : 'Register Farm for Monitoring'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-brand-dark">🛰️ Farm Satellite Monitoring</h1>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
          statusData.satellite_status === 'ready' ? 'bg-green-100 text-green-800' :
          statusData.satellite_status === 'pending' ? 'bg-yellow-100 text-yellow-800 animate-pulse' :
          'bg-red-100 text-red-800'
        }`}>
          Status: {statusData.satellite_status.toUpperCase()}
        </span>
      </div>

      <div className="glass-card p-8">
        {statusData.satellite_status === 'pending' && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-green border-t-transparent mb-4"></div>
            <h3 className="text-xl font-medium text-gray-900">Contacting Satellite Constellations...</h3>
            <p className="text-gray-500 mt-2">Searching for recent clear imagery of your farm. This usually takes 10-30 seconds.</p>
          </div>
        )}

        {statusData.satellite_status === 'unavailable' && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">☁️</div>
            <h3 className="text-xl font-medium text-red-600">No Recent Imagery Available</h3>
            <p className="text-gray-600 mt-2">We couldn't find cloud-free imagery for your coordinates in the last 30 days. We'll automatically check again later.</p>
          </div>
        )}

        {statusData.satellite_status === 'ready' && (
          <div>
            <div className="mb-6 flex justify-between items-end border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Latest Acquisition</h3>
                <p className="text-gray-500 text-sm">Captured on: {new Date(statusData.latest_acquisition_date).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <h4 className="text-lg font-medium text-gray-700 mb-2">True Color (RGB)</h4>
                <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 shadow-inner flex-grow min-h-[300px] flex items-center justify-center">
                  <img 
                    src={`${SATELLITE_API_URL}${statusData.truecolor_url}`} 
                    alt="True Color Satellite" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Image+Load+Error'; }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg font-medium text-gray-700 mb-2">NDVI (Vegetation Index)</h4>
                <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 shadow-inner flex-grow min-h-[300px] flex items-center justify-center relative">
                  <img 
                    src={`${SATELLITE_API_URL}${statusData.ndvi_url}`} 
                    alt="NDVI Satellite" 
                    className="w-full h-full object-cover filter contrast-125 saturate-150"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Image+Load+Error'; }}
                  />
                  {/* Pseudo legend overlay */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded text-xs shadow-md border border-gray-200">
                    <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-green-600"></span> Healthy Crop</div>
                    <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Stressed Crop</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Bare Soil / Water</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h4 className="text-blue-800 font-bold mb-2">How we use this data</h4>
              <p className="text-blue-700 text-sm">
                The NDVI imagery helps our system calculate your Farm's Vegetative Health Index (VHI). This provides transparent updates to your investors and helps power our yield forecasting models, ensuring your crop is on track for a successful harvest.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
