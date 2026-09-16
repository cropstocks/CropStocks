import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function InvestorDashboard() {
  const { user } = useContext(AuthContext);
  const [investments, setInvestments] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invData, listData] = await Promise.all([
          api.get('/investments/my'),
          api.get('/listings')
        ]);
        setInvestments(Array.isArray(invData) ? invData : []);
        const items = Array.isArray(listData) ? listData : (listData.listings || []);
        setListings(items);
      } catch (err) {
        setError(err.message || 'Failed to fetch portfolio');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading portfolio...</div>;
  if (error) return <div className="p-12 text-center text-red-500">{error}</div>;

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  
  // Enrich investments with listing data
  const enrichedInvestments = investments.map(inv => {
    const listing = listings.find(l => l.id === inv.listingId);
    return { ...inv, listing };
  });

  // Calculate current portfolio value based on stock prices
  const currentValue = enrichedInvestments.reduce((sum, inv) => {
    if (!inv.listing) return sum;
    const shareValue = (inv.listing.stockPrice || 0) * (inv.sharePercent / 100) * 100;
    return sum + shareValue;
  }, 0);

  const pnl = currentValue - totalInvested;
  const pnlPercent = totalInvested > 0 ? ((pnl / totalInvested) * 100).toFixed(1) : '0.0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-brand-dark">💰 Investor Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name}</p>
        </div>
        <Link to="/marketplace" className="btn-primary text-sm">
          Browse Marketplace →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Invested" value={totalInvested} prefix="₹" />
        <StatsCard title="Portfolio Value" value={Math.round(currentValue)} prefix="₹" />
        <StatsCard title={`P&L ${parseFloat(pnlPercent) >= 0 ? '▲' : '▼'}`} value={Math.abs(Math.round(pnl))} prefix={pnl >= 0 ? '+₹' : '-₹'} />
        <StatsCard title="Active Holdings" value={investments.length} />
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Holdings</h2>
      {investments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No investments yet.</p>
          <Link to="/marketplace" className="bg-[#348a21] hover:bg-[#286f18] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm inline-block">Browse Marketplace →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enrichedInvestments.map(inv => {
            const l = inv.listing;
            if (!l) return null;
            const shareValue = (l.stockPrice || 0) * (inv.sharePercent / 100) * 100;
            const invPnl = shareValue - inv.amount;
            const invPnlPercent = inv.amount > 0 ? ((invPnl / inv.amount) * 100).toFixed(1) : '0.0';
            const isPositive = invPnl >= 0;

            return (
              <Link key={inv.id} to={`/listing/${inv.listingId}`} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 block hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Crop Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{l.produceName}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        l.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        l.status === 'FUNDING' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>{l.status}</span>
                    </div>
                    <p className="text-sm text-gray-500">{l.region} • {inv.sharePercent}% Share</p>
                  </div>

                  {/* Middle: Investment Stats */}
                  <div className="flex gap-8 items-center flex-1">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Invested</p>
                      <p className="font-semibold text-gray-800">₹{inv.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Current Value</p>
                      <p className="font-semibold text-gray-800">₹{Math.round(shareValue).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Right: P&L */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Return</p>
                    <div className={`text-lg font-bold flex items-center justify-end gap-1 ${isPositive ? 'text-[#348a21]' : 'text-red-500'}`}>
                      {isPositive ? '▲' : '▼'} ₹{Math.abs(Math.round(invPnl)).toLocaleString()}
                      <span className="text-sm">({isPositive ? '+' : ''}{invPnlPercent}%)</span>
                    </div>
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
