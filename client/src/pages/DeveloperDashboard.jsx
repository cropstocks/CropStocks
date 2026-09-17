import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Tractor, Settings, Bell, Search, Menu, 
  ChevronDown, BarChart3, ShieldCheck, Activity
} from 'lucide-react';

const StatCard = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      {trend && (
        <p className={`text-xs mt-2 font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trendUp ? '↑' : '↓'} {trend} since last week
        </p>
      )}
    </div>
    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600">
      {icon}
    </div>
  </div>
);

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [listings, setListings] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-green-600 font-semibold animate-pulse">Loading Agrohub Admin Environment...</div>;

  const pendingListings = listings.filter(l => l.status === 'PENDING' || l.status === 'ACTIVE' || l.status === 'FUNDING'); 
  const totalFarmers = new Set(listings.map(l => l.farmerId)).size + surveys.length;
  const activeInvestors = 3; 

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Farmers & Crops', id: 'farmers', icon: <Tractor size={20} /> },
    { name: 'Investors', id: 'investors', icon: <Users size={20} /> },
    { name: 'Verifications', id: 'verification', icon: <ShieldCheck size={20} /> },
    { name: 'CMS Settings', id: 'cms', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans flex text-gray-800">
      
      {/* Sidebar */}
      <aside className={`bg-white w-64 border-r border-gray-200 flex flex-col transition-all duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full fixed h-full'}`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <img src="/homepage-logo.png" alt="Logo" className="w-8 h-8 mr-3" onError={(e) => e.target.style.display='none'} />
          <span className="font-bold text-xl text-gray-900 tracking-tight">AgroAdmin</span>
        </div>
        
        <div className="p-4 flex-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Main Menu</p>
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors font-medium text-sm ${
                    activeTab === item.id 
                      ? 'bg-green-50 text-green-700' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={activeTab === item.id ? 'text-green-600' : 'text-gray-400'}>{item.icon}</span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors">
            Exit to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-96 border border-gray-200 focus-within:ring-2 focus-within:ring-green-100 focus-within:bg-white transition-colors">
              <Search size={18} className="text-gray-400 mr-3" />
              <input type="text" placeholder="Search farms, crops, investors..." className="bg-transparent border-none outline-none text-sm w-full text-gray-700" />
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-9 h-9 rounded-full object-cover border-2 border-green-100" />
              <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-800 leading-tight">Admin User</p>
                <p className="text-xs text-gray-500 font-medium">Superadmin</p>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{navigation.find(n => n.id === activeTab)?.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and monitor the CropStocks agriculture platform.</p>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-sm border border-green-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live System
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="animate-fade-in space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Farmers" value={totalFarmers || 24} icon={<Tractor size={28} />} trend="12%" trendUp={true} />
                <StatCard title="Active Investors" value={activeInvestors || 12} icon={<Users size={28} />} trend="5%" trendUp={true} />
                <StatCard title="Total Revenue" value="₹1.2M" icon={<BarChart3 size={28} />} trend="2.4%" trendUp={true} />
                <StatCard title="System Health" value="98%" icon={<Activity size={28} />} />
              </div>

              {/* Main Charts/Tables Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Registrations Chart placeholder */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-gray-800">Crop Yield vs Investment</h3>
                    <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none font-medium text-gray-600">
                      <option>This Year</option>
                      <option>Last Year</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2 border-b border-gray-100 pb-2 relative">
                     {/* CSS-based Mock Chart */}
                     <div className="absolute inset-0 flex flex-col justify-between pb-2 z-0">
                       <div className="border-b border-gray-100 w-full flex-1"></div>
                       <div className="border-b border-gray-100 w-full flex-1"></div>
                       <div className="border-b border-gray-100 w-full flex-1"></div>
                       <div className="border-b border-gray-100 w-full flex-1"></div>
                     </div>
                     {[40, 60, 30, 80, 50, 90, 70, 100, 60, 80, 50, 70].map((h, i) => (
                       <div key={i} className="w-full bg-green-500 rounded-t-sm z-10 relative group" style={{ height: `${h}%` }}>
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                           {h}k
                         </div>
                       </div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-6">Recent Activity</h3>
                  <div className="space-y-6">
                    {[
                      { title: 'New Farmer Registered', time: '5 min ago', color: 'bg-blue-500' },
                      { title: 'Payout Processed (₹50k)', time: '2 hours ago', color: 'bg-green-500' },
                      { title: 'NDVI Alert: Region B', time: '5 hours ago', color: 'bg-yellow-500' },
                      { title: 'System Backup Complete', time: '12 hours ago', color: 'bg-purple-500' },
                      { title: 'Investor KYC Approved', time: '1 day ago', color: 'bg-indigo-500' }
                    ].map((act, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="relative flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${act.color} ring-4 ring-gray-50 z-10`}></div>
                          {i !== 4 && <div className="w-0.5 h-full bg-gray-100 absolute top-3"></div>}
                        </div>
                        <div className="-mt-1.5 pb-2">
                          <p className="text-sm font-bold text-gray-700">{act.title}</p>
                          <p className="text-xs text-gray-400 font-medium mt-1">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'farmers' && (
            <div className="animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-bold text-lg text-gray-800">Farmer Database</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-semibold border border-gray-200 hover:bg-gray-100 transition-colors">Export CSV</button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm">+ Add Farmer</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-4 px-6 font-semibold text-xs text-gray-400 uppercase tracking-wider">Farmer Details</th>
                      <th className="py-4 px-6 font-semibold text-xs text-gray-400 uppercase tracking-wider">Produce</th>
                      <th className="py-4 px-6 font-semibold text-xs text-gray-400 uppercase tracking-wider">Region</th>
                      <th className="py-4 px-6 font-semibold text-xs text-gray-400 uppercase tracking-wider">Health Status</th>
                      <th className="py-4 px-6 font-semibold text-xs text-gray-400 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {listings.map((l, i) => (
                      <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                              {l.farmerId ? l.farmerId.substring(0, 2).toUpperCase() : 'FM'}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">{l.farmerId || `FARM-${1000+i}`}</p>
                              <p className="text-xs text-gray-500 font-medium">Registered 2026</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm font-semibold text-gray-700">{l.produceName}</span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500 font-medium">{l.region}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold flex w-max items-center gap-1.5 ${l.ndviScore > 0.7 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${l.ndviScore > 0.7 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                            {l.ndviScore ? (l.ndviScore * 100).toFixed(0) + '% Healthy' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-green-600 hover:text-green-800 font-semibold text-sm transition-colors">View Details</button>
                        </td>
                      </tr>
                    ))}
                    {listings.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-12 text-gray-400 font-medium">No farmer records found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center py-20">
              <Users size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Investor Directory</h3>
              <p className="text-gray-500 max-w-md mx-auto">Full investor profiles, KYC documents, and portfolio tracking will be available in the next platform update.</p>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="animate-fade-in">
              {pendingListings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                  <ShieldCheck size={48} className="mx-auto text-green-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
                  <p className="text-gray-500">There are no pending farm verifications in the queue.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingListings.map(l => (
                    <div key={l.id} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl text-gray-900">{l.produceName}</h3>
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{l.region}</span>
                        </div>
                        <div className="flex flex-wrap gap-6 mt-3 text-sm">
                          <div><span className="text-gray-400">Capital Required:</span> <span className="font-bold text-gray-800 ml-1">₹{l.capitalRequired}</span></div>
                          <div><span className="text-gray-400">Duration:</span> <span className="font-bold text-gray-800 ml-1">{l.cycleDuration} days</span></div>
                          <div><span className="text-gray-400">Risk Tier:</span> <span className="font-bold text-yellow-600 ml-1">{l.riskTier || 'Moderate'}</span></div>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                          Review Docs
                        </button>
                        <button onClick={() => handleApprove(l.id)} className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-green-200">
                          Approve Registration
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'cms' && (
            <div className="animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">General Settings</h3>
              <form onSubmit={handleCmsSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Site Title</label>
                    <input 
                      type="text" 
                      value={cmsSettings.siteTitle}
                      onChange={(e) => setCmsSettings({...cmsSettings, siteTitle: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 font-medium focus:ring-2 focus:ring-green-100 focus:border-green-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Subtitle</label>
                    <input 
                      type="text" 
                      value={cmsSettings.heroSubtitle}
                      onChange={(e) => setCmsSettings({...cmsSettings, heroSubtitle: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 font-medium focus:ring-2 focus:ring-green-100 focus:border-green-500 outline-none transition-all" 
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <label className="flex items-center p-4 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={cmsSettings.maintenanceMode}
                      onChange={(e) => setCmsSettings({...cmsSettings, maintenanceMode: e.target.checked})}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500 cursor-pointer accent-green-600" 
                    />
                    <div className="ml-4">
                      <span className="block text-sm font-bold text-gray-800">Maintenance Mode</span>
                      <span className="block text-xs text-gray-500 mt-1">Temporarily disable access to the main platform for users.</span>
                    </div>
                  </label>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button type="submit" className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}
