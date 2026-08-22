import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings');

  const fetchData = async () => {
    try {
      const [listingsData] = await Promise.all([
        api.get('/admin/listings').catch(() => [])
      ]);
      
      let fbSurveys = [];
      try {
        const querySnapshot = await getDocs(collection(db, "surveys"));
        fbSurveys = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate() || new Date() }));
        // Sort by newest
        fbSurveys.sort((a, b) => b.createdAt - a.createdAt);
      } catch (err) {
        console.error("Firebase fetch error", err);
      }

      setListings(listingsData || []);
      setSurveys(fbSurveys);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/listings/${id}/approve`);
      fetchData();
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Pending Approvals" value={pendingListings.length} />
        <StatsCard title="Total Volume" value={totalVolume} prefix="₹" />
        <StatsCard title="Total Listings" value={listings.length} />
        <StatsCard title="Survey Responses" value={surveys.length} />
      </div>

      <div className="flex space-x-4 mb-6 border-b">
        <button 
          onClick={() => setActiveTab('listings')} 
          className={`py-2 px-4 font-semibold ${activeTab === 'listings' ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-500'}`}
        >
          Pending Listings
        </button>
        <button 
          onClick={() => setActiveTab('surveys')} 
          className={`py-2 px-4 font-semibold ${activeTab === 'surveys' ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-500'}`}
        >
          Survey Responses
        </button>
      </div>
      
      {activeTab === 'listings' && (
        <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
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
      )}

      {activeTab === 'surveys' && (
        <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Survey Responses</h2>
          {surveys.length === 0 ? (
            <p className="text-gray-500">No survey responses yet.</p>
          ) : (
            <div className="space-y-4">
              {surveys.map((survey, index) => {
                let parsed = {};
                try { parsed = JSON.parse(survey.data); } catch (e) {}
                const farmerName = parsed['English_q_2'] || parsed['Hindi_q_3'] || parsed['Gujarati_q_3'] || 'Unknown Farmer';
                const location = parsed['English_q_4'] || parsed['Hindi_q_5'] || parsed['Gujarati_q_5'] || 'Unknown Location';
                
                return (
                  <div key={survey.id} className="border rounded-md p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => {
                      const el = document.getElementById(`survey-${survey.id}`);
                      if (el) el.classList.toggle('hidden');
                    }}>
                      <div>
                        <span className="font-bold">#{surveys.length - index}</span> - {farmerName} ({location})
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(survey.createdAt).toLocaleString()}
                        <span className="ml-4 text-brand-green underline">View Details</span>
                      </div>
                    </div>
                    <div id={`survey-${survey.id}`} className="hidden mt-4 text-sm bg-white p-4 border rounded overflow-auto max-h-64">
                      <pre>{JSON.stringify(parsed, null, 2)}</pre>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
