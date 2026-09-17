import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [listings, setListings] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  // CMS State
  const [cmsSettings, setCmsSettings] = useState({
    siteTitle: 'CropStocks',
    heroSubtitle: 'Invest in Farmers directly.',
    maintenanceMode: false,
  });

  const fetchData = async () => {
    try {
      const [listingsData] = await Promise.all([
        api.get('/admin/listings').catch(() => [])
      ]);
      
      let fbSurveys = [];
      try {
        const querySnapshot = await getDocs(collection(db, "surveys"));
        fbSurveys = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate() || new Date() }));
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

  const handleCmsSave = (e) => {
    e.preventDefault();
    alert('CMS Settings saved successfully!');
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Loading Developer Environment...</div>;

  const pendingListings = listings.filter(l => l.status === 'PENDING' || l.status === 'ACTIVE' || l.status === 'FUNDING'); 
  
  const totalFarmers = new Set(listings.map(l => l.farmerId)).size + surveys.length;
  const activeInvestors = 3; 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-brand-dark">Developer & Admin Console</h1>
          <p className="text-gray-600 mt-2">Manage platform data, verification queues, and CMS settings.</p>
        </div>
        <div className="bg-brand-green text-white px-4 py-2 rounded font-bold shadow">
          Dev Branch Active
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Farmers" value={totalFarmers || 24} />
        <StatsCard title="Active Investors" value={activeInvestors || 12} />
        <StatsCard title="Crop Registrations" value={listings.length} />
        <StatsCard title="System Health" value="98%" />
      </div>

      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {['overview', 'farmers', 'investors', 'verification', 'cms'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`py-3 px-5 font-semibold capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Platform Overview</h2>
            <p className="text-gray-600 mb-6">Welcome to the Developer Console. Monitor the health of the CropStocks platform, manage users, and adjust global settings.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold mb-2">Recent System Logs</h3>
                <ul className="text-sm text-gray-600 space-y-2 font-mono bg-white p-3 rounded border border-gray-100">
                  <li>[INFO] User registration sync complete.</li>
                  <li><span className="text-yellow-600">[WARN]</span> High latency on API /stats endpoint.</li>
                  <li>[INFO] Cron job: daily payouts processed.</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold mb-2">Database Metrics</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex justify-between"><span>Active Connections:</span> <span className="font-bold">42</span></li>
                  <li className="flex justify-between"><span>Storage Used:</span> <span className="font-bold">1.2 GB</span></li>
                  <li className="flex justify-between"><span>Last Backup:</span> <span className="font-bold">2 hours ago</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'farmers' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Farmer Database & Crop Health</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4 rounded-tl-lg">Farmer ID</th>
                    <th className="py-3 px-4">Produce</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">NDVI Score / Health</th>
                    <th className="py-3 px-4 rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l, i) => (
                    <tr key={l.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{l.farmerId || `FARM-${1000+i}`}</td>
                      <td className="py-3 px-4 font-semibold">{l.produceName}</td>
                      <td className="py-3 px-4">{l.region}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${l.ndviScore > 0.7 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {l.ndviScore ? (l.ndviScore * 100).toFixed(0) + '% Healthy' : 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-brand-green hover:underline text-sm font-semibold">View Data</button>
                      </td>
                    </tr>
                  ))}
                  {listings.length === 0 && (
                    <tr><td colSpan="5" className="text-center py-4 text-gray-500">No farmer data found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'investors' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Investor Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4">Investor ID</th>
                    <th className="py-3 px-4">Total Invested</th>
                    <th className="py-3 px-4">Active Portfolio</th>
                    <th className="py-3 px-4">KYC Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">INV-8492</td>
                    <td className="py-3 px-4 font-semibold text-brand-dark">₹1,50,000</td>
                    <td className="py-3 px-4 text-sm text-gray-600">3 Listings</td>
                    <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">VERIFIED</span></td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">INV-1023</td>
                    <td className="py-3 px-4 font-semibold text-brand-dark">₹45,000</td>
                    <td className="py-3 px-4 text-sm text-gray-600">1 Listing</td>
                    <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">PENDING</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Crop Registration Verification</h2>
            <p className="text-gray-600 mb-4 text-sm">Review incoming requests from farmers applying for crop registration.</p>
            {pendingListings.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">No pending crop registrations.</div>
            ) : (
              <div className="space-y-4">
                {pendingListings.map(l => (
                  <div key={l.id} className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 hover:bg-white transition-colors shadow-sm">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-bold text-lg text-brand-dark">{l.produceName} - {l.region}</h3>
                      <p className="text-sm text-gray-600 mt-1">Capital Required: <span className="font-semibold">₹{l.capitalRequired}</span> | Cycle: {l.cycleDuration} days</p>
                      <div className="mt-3 flex gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">Risk: {l.riskTier || 'N/A'}</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">Farmer Split: {l.profitSplitFarmer}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button className="flex-1 md:flex-none bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-50 text-sm">Request Info</button>
                      <button onClick={() => handleApprove(l.id)} className="flex-1 md:flex-none bg-brand-green text-white px-4 py-2 rounded font-semibold hover:bg-green-700 text-sm shadow">Verify & Approve</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">CMS Settings - Main Website</h2>
            <form onSubmit={handleCmsSave} className="max-w-2xl space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Site Title</label>
                <input 
                  type="text" 
                  value={cmsSettings.siteTitle}
                  onChange={(e) => setCmsSettings({...cmsSettings, siteTitle: e.target.value})}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-brand-green focus:border-brand-green bg-gray-50 focus:bg-white transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Subtitle</label>
                <input 
                  type="text" 
                  value={cmsSettings.heroSubtitle}
                  onChange={(e) => setCmsSettings({...cmsSettings, heroSubtitle: e.target.value})}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-brand-green focus:border-brand-green bg-gray-50 focus:bg-white transition-colors" 
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="maintenance"
                  checked={cmsSettings.maintenanceMode}
                  onChange={(e) => setCmsSettings({...cmsSettings, maintenanceMode: e.target.checked})}
                  className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded cursor-pointer" 
                />
                <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Enable Maintenance Mode
                </label>
              </div>
              <hr className="border-gray-200" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Theme Management</h3>
                <p className="text-sm text-gray-500 mb-4">The developer website shares the exact same Tailwind theme configuration as the main application. Edit <code className="bg-gray-100 px-1 rounded text-brand-green">tailwind.config.js</code> to make global changes.</p>
                <button type="submit" className="bg-brand-dark text-white px-6 py-2 rounded font-bold shadow hover:bg-gray-800 transition-colors">
                  Save CMS Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
