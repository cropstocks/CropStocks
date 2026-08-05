import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const data = await api.get('/admin/listings');
      setListings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/listings/${id}/approve`);
      fetchListings();
    } catch (err) {
      alert('Failed to approve');
    }
  };

  if (loading) return <div className="p-12 text-center">Loading admin panel...</div>;

  const pendingListings = listings.filter(l => l.status === 'PENDING');
  const totalVolume = listings.reduce((sum, l) => sum + (l.capitalRaised || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-heading mb-8">Admin Control Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Pending Approvals" value={pendingListings.length} />
        <StatsCard title="Total Volume" value={totalVolume} prefix="₹" />
        <StatsCard title="Total Listings" value={listings.length} />
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Pending Listings for Review</h2>
        {pendingListings.length === 0 ? (
          <p className="text-gray-500">No pending listings.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Produce</th>
                <th>Region</th>
                <th>Amount Needed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingListings.map(l => (
                <tr key={l.id} className="border-b">
                  <td className="py-3">{l.produceName}</td>
                  <td>{l.region}</td>
                  <td>₹{l.capitalRequired}</td>
                  <td>
                    <button onClick={() => handleApprove(l.id)} className="text-sm bg-brand-green text-white px-3 py-1 rounded mr-2">Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
