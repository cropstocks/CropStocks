import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await api.get('/listings');
        const items = Array.isArray(data) ? data : (data.listings || []);
        setListings(items);
      } catch (err) {
        console.error('Failed to fetch listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(l => {
    const matchRisk = filter === 'All' || l.riskTier === filter.toUpperCase();
    const matchSearch = !search || l.produceName?.toLowerCase().includes(search.toLowerCase()) || l.region?.toLowerCase().includes(search.toLowerCase());
    return matchRisk && matchSearch;
  });

  const getVegBadge = (status) => {
    const styles = {
      'Excellent': 'bg-green-100 text-green-800 border-green-200',
      'Good': 'bg-lime-100 text-lime-800 border-lime-200',
      'Fair': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Poor': 'bg-orange-100 text-orange-800 border-orange-200',
      'Critical': 'bg-red-100 text-red-800 border-red-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading text-brand-dark">📈 CropStocks™ Marketplace</h1>
        <p className="text-gray-500 mt-1">Invest in satellite-verified agricultural projects across India</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by crop or region..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        />
        <div className="flex space-x-2 flex-wrap">
          {['All', 'LOW', 'MEDIUM', 'HIGH'].map(risk => (
            <button
              key={risk}
              onClick={() => setFilter(risk)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === risk ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {risk === 'All' ? 'All' : `${risk.charAt(0) + risk.slice(1).toLowerCase()}`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl">No listings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(l => {
            const changePercent = l.ndviScore ? ((l.ndviScore - 0.5) * 20).toFixed(1) : '0.0';
            const isPositive = parseFloat(changePercent) >= 0;
            const fundingPercent = l.capitalRequired > 0 ? Math.round((l.capitalRaised / l.capitalRequired) * 100) : 0;

            return (
              <Link key={l.id} to={`/listing/${l.id}`} className="glass-card hover:shadow-xl transition-all hover:scale-[1.02] overflow-hidden">
                {/* Stock Header */}
                <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{l.produceName?.toUpperCase()}</p>
                    <p className="text-gray-400 text-xs">{l.region} • {l.farmer?.name || 'Farmer'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">₹{l.stockPrice?.toLocaleString() || '—'}</p>
                    <span className={`text-xs font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '▲' : '▼'} {Math.abs(changePercent)}%
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  {/* Vegetation Health */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">Vegetation Health</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getVegBadge(l.vegetationStatus)}`}>
                      {l.ndviScore ? `${l.vegetationStatus} (${(l.ndviScore * 100).toFixed(0)}%)` : 'Awaiting Data'}
                    </span>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">Return</p>
                      <p className="font-bold text-brand-green text-sm">{l.expectedReturn || 0}%</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-bold text-gray-800 text-sm">{Math.round((l.cycleDuration || 180) / 30)}mo</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">Risk</p>
                      <p className={`font-bold text-sm ${
                        l.riskTier === 'LOW' ? 'text-green-600' : l.riskTier === 'HIGH' ? 'text-red-600' : 'text-yellow-600'
                      }`}>{l.riskTier}</p>
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">₹{(l.capitalRaised || 0).toLocaleString()} raised</span>
                      <span className="font-bold text-gray-700">{fundingPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand-green h-2 rounded-full transition-all" style={{ width: `${Math.min(fundingPercent, 100)}%` }}></div>
                    </div>
                  </div>

                  {/* Status & Insurance */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      l.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      l.status === 'FUNDING' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>{l.status}</span>
                    {l.insuranceFlag && (
                      <span className="text-xs text-blue-600 font-medium">🛡️ Insured</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
