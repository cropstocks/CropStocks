import React, { useState, useEffect } from 'react';
import { Calendar, Droplets, Leaf } from 'lucide-react';
import api from '../services/api';

export default function CropHealthTimeline({ farmerId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/farmers/${farmerId}/history`);
        setHistory(res.history || []);
        if (res.history && res.history.length > 0) {
          setCurrentIndex(res.history.length - 1);
        }
      } catch (err) {
        console.error("Error fetching satellite history", err);
        setError("Failed to load satellite data");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [farmerId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse bg-gray-50 rounded-xl">Loading Sentinel-2 5-day NDVI data...</div>;
  }

  if (error || history.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
        <Leaf className="mx-auto mb-2 text-gray-400 opacity-50" size={32} />
        <p>No 5-day crop health data available yet.</p>
        <p className="text-xs mt-1">Satellite analysis takes a few days after registration.</p>
      </div>
    );
  }

  const currentSnapshot = history[currentIndex];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-[#112a14] p-4 text-white flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <Leaf size={18} className="text-green-400" />
          5-Day Crop Health Monitoring (NDVI)
        </h3>
        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hidden md:block">
          Powered by Sentinel-2
        </span>
      </div>

      <div className="p-6">
        {/* Date Slider */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
            <span>{new Date(history[0].acquisition_date).toLocaleDateString()}</span>
            <span>{new Date(history[history.length - 1].acquisition_date).toLocaleDateString()}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max={history.length - 1} 
            value={currentIndex}
            onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#348a21]"
          />
          <div className="text-center mt-3 text-[#348a21] font-bold">
            Selected Date: {new Date(currentSnapshot.acquisition_date).toLocaleDateString()}
          </div>
        </div>

        {/* Data Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden shadow-inner border-4 border-gray-100 relative group">
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono z-10">
              NDVI FALSE COLOR
            </div>
            <img 
              src={currentSnapshot.ndvi_url} 
              alt="NDVI Map" 
              className="w-full h-[250px] object-cover"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x300.png?text=NDVI+Not+Found`;
              }}
            />
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Health Metrics</h4>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center border-4 border-green-400">
                  <span className="text-xl font-black text-green-700">{currentSnapshot.ndvi_mean.toFixed(2)}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">NDVI Health Index</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    0.0 is dead/barren, 1.0 is dense canopy
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Scan Details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="text-gray-400 mb-1 flex items-center gap-1"><Calendar size={14}/> Cloud Cover</div>
                  <div className="font-semibold">{currentSnapshot.cloud_cover_pct.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="text-gray-400 mb-1 flex items-center gap-1"><Droplets size={14}/> Moisture (Est)</div>
                  <div className="font-semibold">{Math.min(95, Math.max(10, currentSnapshot.ndvi_mean * 120)).toFixed(0)}%</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
