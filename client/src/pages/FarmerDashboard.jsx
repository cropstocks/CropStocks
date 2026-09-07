import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function FarmerDashboard() {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings');
        const items = Array.isArray(response) ? response : (response.listings || []);
        const myListings = items.filter(l => l.farmerId === user?.id);
        setListings(myListings);
      } catch (err) {
        setError(err.message || 'Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchListings();
    else setLoading(false);
  }, [user]);

  const totalRaised = listings.reduce((sum, l) => sum + (l.capitalRaised || 0), 0);
  const activeCount = listings.filter(l => l.status === 'ACTIVE' || l.status === 'FUNDING').length;
  const avgStockPrice = listings.length > 0
    ? Math.round(listings.reduce((sum, l) => sum + (l.stockPrice || 0), 0) / listings.length)
    : 0;

  if (loading) return <div className="p-12 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-12 text-center text-red-500">{error}</div>;

  const getVegColor = (status) => {
    const map = { 'Excellent': 'text-green-600 bg-green-50', 'Good': 'text-lime-600 bg-lime-50', 'Fair': 'text-yellow-600 bg-yellow-50', 'Poor': 'text-orange-600 bg-orange-50', 'Critical': 'text-red-600 bg-red-50' };
    return map[status] || 'text-gray-500 bg-gray-50';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-brand-dark">🧑‍🌾 Farmer Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/farmer/satellite" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg shadow text-sm transition-colors border border-blue-200">
            🛰️ Satellite Monitor
          </Link>
          <Link to="/farmer/new-listing" className="btn-primary text-sm">
            + New Listing
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Capital Raised" value={totalRaised} prefix="₹" />
        <StatsCard title="Active Listings" value={activeCount} />
        <StatsCard title="Avg Stock Price" value={avgStockPrice} prefix="₹" />
        <StatsCard title="Total Listings" value={listings.length} />
      </div>
      
      <h2 className="text-2xl font-bold mb-4 font-heading">My Crop Listings</h2>
      {listings.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No listings yet.</p>
          <Link to="/farmer/new-listing" className="btn-primary">Create your first listing →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map(listing => {
            const progress = listing.capitalRequired ? (listing.capitalRaised / listing.capitalRequired) * 100 : 0;
            const changePercent = listing.ndviScore ? ((listing.ndviScore - 0.5) * 20).toFixed(1) : '0.0';
            const isPositive = parseFloat(changePercent) >= 0;

            return (
              <div key={listing.id} className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{listing.produceName}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        listing.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        listing.status === 'FUNDING' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>{listing.status}</span>
                    </div>
                    <p className="text-sm text-gray-500">{listing.region} • {listing.landSize} acres • {listing.cycleDuration} day cycle</p>
                  </div>

                  {/* Center: Stock Price */}
                  <div className="text-center md:text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Stock Price</p>
                    <p className="text-2xl font-bold text-brand-dark">₹{listing.stockPrice?.toLocaleString() || '—'}</p>
                    <span className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {isPositive ? '▲' : '▼'} {Math.abs(changePercent)}%
                    </span>
                  </div>

                  {/* Right: Vegetation Health */}
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Vegetation</p>
                    <span className={`inline-block text-sm font-bold px-3 py-1 rounded-full ${getVegColor(listing.vegetationStatus)}`}>
                      {listing.vegetationStatus || 'Awaiting Data'}
                    </span>
                    {listing.ndviScore && (
                      <p className="text-xs text-gray-400 mt-1">NDVI: {(listing.ndviScore * 100).toFixed(0)}%</p>
                    )}
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">₹{listing.capitalRaised?.toLocaleString()} raised</span>
                    <span className="font-bold">{progress.toFixed(0)}% of ₹{listing.capitalRequired?.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-green h-2 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
