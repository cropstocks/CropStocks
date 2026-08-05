import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import { api } from '../services/api';

const PRODUCE_IMAGES = {
  wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=800&auto=format&fit=crop',
  soybean: 'https://images.unsplash.com/photo-1599725050689-45e83cdef100?w=800&auto=format&fit=crop',
  poultry: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop',
  dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop',
  mango: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop',
};

function getImage(produceName) {
  const key = produceName?.toLowerCase() || '';
  return PRODUCE_IMAGES[key] || PRODUCE_IMAGES.default;
}

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await api.get('/listings');
        const items = Array.isArray(data) ? data : (data.listings || []);
        const mapped = items.map(l => ({
          id: l.id,
          title: `${l.produceName} — ${l.region}`,
          description: `${l.type === 'CROP' ? '🌾 Crop' : '🐄 Animal Husbandry'} cycle in ${l.region}. Duration: ${l.cycleDuration} days.`,
          expectedReturn: l.expectedReturn || 12,
          durationMonths: Math.round((l.cycleDuration || 180) / 30),
          raisedAmount: l.capitalRaised || 0,
          targetAmount: l.capitalRequired || 100000,
          riskLevel: l.riskTier || 'MEDIUM',
          isInsured: l.insuranceFlag ?? true,
          image: getImage(l.produceName),
          status: l.status,
          type: l.type,
          produceName: l.produceName,
        }));
        setListings(mapped);
      } catch (err) {
        console.error('Failed to fetch listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(l => {
    const matchRisk = filter === 'All' || l.riskLevel === filter.toUpperCase();
    const matchType = typeFilter === 'All' || l.type === typeFilter;
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase());
    return matchRisk && matchType && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-brand-dark">🏪 Marketplace</h1>
        <p className="text-gray-600 mt-2">Invest in vetted agricultural projects across India</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search listings..."
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
              {risk === 'All' ? 'All Risks' : `${risk.charAt(0) + risk.slice(1).toLowerCase()} Risk`}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          {['All', 'CROP', 'ANIMAL'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                typeFilter === type ? 'bg-brand-gold text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === 'All' ? 'All Types' : type === 'CROP' ? '🌾 Crops' : '🐄 Animals'}
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
          <p className="text-xl">No listings found matching your filters.</p>
          <p className="mt-2 text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

