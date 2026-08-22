import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

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



  const deleteSurvey = async (id) => {
    if (window.confirm("Are you sure you want to delete this survey response?")) {
      try {
        await deleteDoc(doc(db, "surveys", id));
        setSurveys(surveys.filter(s => s.id !== id));
      } catch (err) {
        console.error("Error deleting survey", err);
        alert("Failed to delete survey");
      }
    }
  };

  const exportToCSV = () => {
    if (surveys.length === 0) return;

    const allParsed = surveys.map(s => {
      try { return { ...JSON.parse(s.data), SubmittedAt: new Date(s.createdAt).toLocaleString() }; } 
      catch (e) { return { SubmittedAt: new Date(s.createdAt).toLocaleString() }; }
    });

    const headers = Array.from(new Set(allParsed.flatMap(s => Object.keys(s))));
    
    const csvRows = [headers.join(',')];
    for (const survey of allParsed) {
      const values = headers.map(header => {
        const val = survey[header] || '';
        return `"${String(val).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CropStocks_Surveys.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Survey Responses</h2>
            {surveys.length > 0 && (
              <button 
                onClick={exportToCSV}
                className="bg-brand-green hover:bg-brand-gold text-white px-4 py-2 rounded text-sm font-bold transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Export to Excel
              </button>
            )}
          </div>
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
                    <div className="flex justify-between items-center mb-2">
                      <div className="cursor-pointer flex-1" onClick={() => {
                        const el = document.getElementById(`survey-${survey.id}`);
                        if (el) el.classList.toggle('hidden');
                      }}>
                        <span className="font-bold">#{surveys.length - index}</span> - {farmerName} ({location})
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500 cursor-pointer flex items-center space-x-4" onClick={() => {
                          const el = document.getElementById(`survey-${survey.id}`);
                          if (el) el.classList.toggle('hidden');
                        }}>
                          <span>{new Date(survey.createdAt).toLocaleString()}</span>
                          <span className="text-brand-green underline">View Details</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteSurvey(survey.id); }}
                          className="text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 p-1.5 rounded"
                          title="Delete Survey"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
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
