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
        const myListings = response.filter(l => l.farmerId === user?.id);
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

  if (loading) return <div className="p-12 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-12 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-brand-dark">Farmer Dashboard</h1>
        <div className="flex gap-4">
          <Link to="/farmer/satellite" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded shadow transition-colors">
            🛰️ Satellite Monitoring
          </Link>
          <Link to="/farmer/new-listing" className="btn-primary">
            + Create New Listing
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatsCard title="Capital Raised" value={totalRaised} prefix="₹" />
        <StatsCard title="Active Listings" value={activeCount} />
        <StatsCard title="Total Listings" value={listings.length} />
      </div>
      
      <h2 className="text-2xl font-bold mb-6 font-heading">My Listings</h2>
      {listings.length === 0 ? (
        <p className="text-gray-500">No listings yet. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map(listing => {
             const progress = listing.capitalRequired ? (listing.capitalRaised / listing.capitalRequired) * 100 : 0;
             return (
              <div key={listing.id} className="glass-card p-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">{listing.produceName}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">{listing.status}</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>₹{listing.capitalRaised} raised</span>
                    <span>{progress.toFixed(1)}% of ₹{listing.capitalRequired}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-green h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link to={`/guidance/${listing.id}`} className="text-brand-blue text-sm hover:underline">View crop guidance →</Link>
                  <Link to={`/marketplace/${listing.id}`} className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">View Details</Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
