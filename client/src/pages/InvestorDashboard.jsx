import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';

export default function InvestorDashboard() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyInvestments = async () => {
      try {
        const data = await api.get('/investments/my');
        setInvestments(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch portfolio');
      } finally {
        setLoading(false);
      }
    };
    fetchMyInvestments();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading portfolio...</div>;
  if (error) return <div className="p-12 text-center text-red-500">{error}</div>;

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-heading text-brand-dark mb-8">Investor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatsCard title="Total Invested" value={totalInvested} prefix="₹" />
        <StatsCard title="Total Investments" value={investments.length} />
      </div>
      
      <h2 className="text-2xl font-bold mb-6 font-heading">Active Portfolio</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {investments.length === 0 ? (
          <div className="p-6 text-gray-500">No investments yet.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invested</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investments.map(inv => (
                <tr key={inv.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-blue"><a href={`/marketplace/${inv.listingId}`}>Listing #{inv.listingId}</a></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{inv.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.sharePercent?.toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{inv.payoutStatus || 'ACTIVE'}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
