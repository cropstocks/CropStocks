import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import HealthGauge from '../components/HealthGauge';
import SatelliteCompare from '../components/SatelliteCompare';
import PriceSparkline from '../components/PriceSparkline';
import SubmissionStatus from '../components/SubmissionStatus';
import RemediationCardComponent from '../components/RemediationCardComponent';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { 
  Download, AlertTriangle, Globe, LogOut, 
  Search, Moon, Bell, LayoutDashboard, TrendingUp, 
  ClipboardCheck, Wallet, Banknote, FileText, User, Settings, Leaf, ChevronDown, CheckCircle2, ChevronRight, UploadCloud 
} from 'lucide-react';

const FarmerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const [listings, setListings] = useState([]);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [cycleState, setCycleState] = useState(null);
  const [windowStatus, setWindowStatus] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide global layout header for this specific dashboard
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    const main = document.querySelector('main');
    if (main) {
      main.style.minHeight = '100vh';
      main.style.padding = '0';
    }
    
    return () => {
      if (header) header.style.display = 'block';
      if (main) main.style.padding = '';
    };
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings');
        const myListings = res.filter(l => l.farmerId === user?.id);
        setListings(myListings);
        if (myListings.length > 0) {
          const seedListing = myListings.find(l => l.produceName === 'Wheat' || l.produceName === 'Soybean');
          setSelectedListingId(seedListing ? seedListing.id : myListings[0].id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (user?.id) fetchListings();
  }, [user?.id]);

  useEffect(() => {
    if (selectedListingId) fetchDashboardData();
  }, [selectedListingId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [cycleRes, windowRes, reportsRes] = await Promise.all([
        api.get('/crop-cycle/' + selectedListingId).catch(() => null),
        api.get('/submissions/window/' + selectedListingId).catch(() => null),
        api.get('/reports/' + selectedListingId).catch(() => [])
      ]);
      setCycleState(cycleRes);
      setWindowStatus(windowRes);
      setReports(reportsRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center bg-[#0d120e] text-white min-h-screen flex items-center justify-center">Loading dashboard...</div>;
  
  if (!loading && listings.length === 0) {
    return (
      <div className="p-4 bg-[#0d120e] text-white min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl mb-4">No active farm listings found.</h2>
        <Link to="/" className="text-[#348a21] hover:underline">Return Home</Link>
      </div>
    );
  }

  const safeParseJSON = (data) => {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (e) { return null; }
    }
    return data || null;
  };

  const currentListing = listings.find(l => l.id === selectedListingId);

  // If no cycle state, just show empty
  const healthHistory = cycleState ? (safeParseJSON(cycleState.healthIndexHistory) || []) : [];
  const priceHistory = cycleState ? (safeParseJSON(cycleState.priceHistory) || []) : [];
  const currentPrice = cycleState?.currentPriceInr || 45.50;
  const prevPrice = priceHistory.length > 1 ? priceHistory[priceHistory.length - 2].price : currentPrice;
  const priceDeltaPercent = currentPrice > 0 && prevPrice > 0 ? ((currentPrice - prevPrice) / prevPrice) * 100 : 2.6;
  
  const latestReport = reports.length > 0 ? reports[0] : null;
  const latestReportData = latestReport ? safeParseJSON(latestReport.reportData) : null;
  const satelliteCurrent = latestReportData?.satelliteCurrentUrl || latestReportData?.satelliteUrl || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800';
  const satellitePrev = latestReportData?.satellitePrevUrl || 'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=800';

  const healthScore = latestReportData?.healthScore || cycleState?.currentHealth || 78;
  const allocatedStr = cycleState ? (cycleState.capitalGrantedInr - cycleState.capitalDisbursedInr) : 9350000;
  
  const formatMoney = (val) => {
    if (val >= 100000) return '₹' + (val / 100000).toFixed(1) + 'L';
    return '₹' + val.toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0d120e] text-gray-300 font-sans flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d120e] border-r border-white/5 flex flex-col shrink-0 h-full hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-transparent shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#1b3d1b] p-2 rounded-lg text-[#5cc95c]">
              <Leaf size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">CropStocks</h1>
              <span className="text-xs text-gray-500 font-medium">Farmer Portal</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <div className="mb-8">
            <h3 className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-3 px-2">Overview</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#1b2b1b] text-[#86efac] rounded-xl font-medium transition-colors">
                <LayoutDashboard size={18} /> My Farm Data
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <TrendingUp size={18} /> Stock Price
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <ClipboardCheck size={18} /> Weekly Submissions
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-3 px-2">Finance</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <Wallet size={18} /> Allocations
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <Banknote size={18} /> Payouts
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <FileText size={18} /> Reports
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-3 px-2">Account</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <User size={18} /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
                <Settings size={18} /> Settings
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Plot Widget */}
        <div className="p-4 mt-auto border-t border-white/5 bg-[#0f140f] shrink-0">
          <div className="bg-[#171d17] p-3 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-white mb-1">{currentListing?.produceName || 'Wheat'} — {currentListing?.region || 'Punjab'} plot</h4>
            <p className="text-xs text-gray-500 leading-tight">Season 2 of 3 · verification window opens every Monday</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0d120e]">
        
        {/* Topbar */}
        <header className="h-20 px-4 md:px-8 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex-1 max-w-xl relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search plots, reports, payouts..." 
              className="w-full bg-[#151a15] border border-white/5 focus:border-[#348a21] outline-none rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4 pl-4">
            <button className="w-10 h-10 rounded-full bg-[#151a15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors hidden sm:flex">
              <Moon size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#151a15] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative hidden sm:flex">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 md:pl-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#1b3d1b] text-[#86efac] flex items-center justify-center font-bold border border-[#285928]">
                {user?.name?.substring(0, 2).toUpperCase() || 'RK'}
              </div>
              <div className="hidden md:block text-right">
                <div className="text-sm font-bold text-white">{user?.name || 'Ramesh Kumar'}</div>
                <div className="text-[11px] text-gray-400 capitalize">{user?.role ? `${user.role.toLowerCase()} Farmer` : 'Registered Farmer'}</div>
              </div>
            </div>
            
            <button onClick={() => { logout(); navigate('/'); }} className="w-10 h-10 rounded-full bg-[#1a1515] border border-white/5 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors ml-2">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Dashboard Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">My Farm Data</h2>
              <p className="text-sm text-gray-400">Live plot health, weekly verification and payout status</p>
            </div>
            
            <div className="relative">
              <select 
                value={selectedListingId || ''} 
                onChange={(e) => setSelectedListingId(e.target.value)}
                className="appearance-none bg-[#151a15] border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-gray-300 font-medium focus:outline-none focus:border-[#348a21] transition-colors cursor-pointer min-w-[180px]"
              >
                {listings.map(l => <option key={l.id} value={l.id}>● {l.produceName} — {l.region}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Top 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {/* Card 1 */}
            <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-36">
              <div className="w-8 h-8 rounded-lg bg-[#1b2b1b] text-[#86efac] flex items-center justify-center mb-2">
                <Leaf size={16} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Crop Health</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{healthScore}</span>
                  <span className="text-sm text-gray-500">/ 100</span>
                </div>
                <div className="text-xs font-medium text-[#4ade80] mt-1">↑ 4 pts this week</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-36">
              <div className="w-8 h-8 rounded-lg bg-[#1b2b1b] text-[#86efac] flex items-center justify-center mb-2">
                <TrendingUp size={16} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Stock Price (Week)</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">₹{currentPrice.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 uppercase">{currentListing?.produceName || 'WHEAT'}/IN</span>
                </div>
                <div className={`text-xs font-medium mt-1 ${priceDeltaPercent >= 0 ? 'text-[#4ade80]' : 'text-red-400'}`}>
                  {priceDeltaPercent >= 0 ? '↑' : '↓'} {Math.abs(priceDeltaPercent).toFixed(1)}% since Monday
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-36">
              <div className="w-8 h-8 rounded-lg bg-[#2a2212] text-[#facc15] flex items-center justify-center mb-2">
                <Wallet size={16} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Pending Allocation</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{formatMoney(allocatedStr)}</span>
                </div>
                <div className="text-xs font-medium text-gray-500 mt-1">Releases after verification</div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-36">
              <div className="w-8 h-8 rounded-lg bg-[#2a1717] text-[#f87171] flex items-center justify-center mb-2">
                <ClipboardCheck size={16} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">This Week's Submission</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">Verifying</span>
                </div>
                <div className="text-xs font-medium text-[#fbbf24] mt-1">Step 3 of 6</div>
              </div>
            </div>
          </div>

          {/* Middle Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Left 2/3: Satellite */}
            <div className="lg:col-span-2 bg-[#151a15] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold">Satellite Imagery — Before / After</h3>
                <span className="text-xs text-gray-500">Updated 2 days ago</span>
              </div>
              <div className="h-[280px] rounded-xl overflow-hidden border border-white/5">
                <SatelliteCompare 
                  currentImage={satelliteCurrent} 
                  previousImage={satellitePrev} 
                  currentLabel="This week" 
                  previousLabel="Last week" 
                />
              </div>

              {/* Bottom embedded charts */}
              <div className="grid grid-cols-2 gap-8 mt-6 pt-6 border-t border-white/5">
                <div>
                  <h4 className="text-xs text-gray-400 mb-4">Crop Health</h4>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-24 h-24 transform -rotate-90">
                        <path className="text-white/5" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        <path className="text-[#4ade80]" strokeDasharray={`${healthScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white leading-none">{healthScore}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{healthScore > 75 ? 'Good condition' : 'Needs attention'}</div>
                      <div className="text-xs text-gray-500">Based on NDVI scan</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs text-gray-400 mb-4">NDVI Trend — 8 weeks</h4>
                  <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthHistory.length ? healthHistory : [{week:1,health:50},{week:2,health:55},{week:3,health:65},{week:4,health:78}]}>
                        <XAxis dataKey="week" hide />
                        <Tooltip contentStyle={{backgroundColor: '#1c241c', borderColor: '#348a21', color: '#fff'}} />
                        <Line type="monotone" dataKey="health" stroke="#4ade80" strokeWidth={2} dot={{ r: 0 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1/3: Allocations & Submissions */}
            <div className="flex flex-col gap-6">
              
              {/* Allocation */}
              <div className="bg-[#151a15] border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    Pending Allocation <span className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px]">i</span>
                  </span>
                  <span className="text-2xl font-bold text-white">
                    ₹{((cycleState?.capitalGrantedInr || 10000000) - (cycleState?.capitalDisbursedInr || 650000)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Weekly Submission */}
              <div className="bg-[#151a15] border border-white/5 rounded-2xl p-6 flex-1 flex flex-col">
                <h3 className="text-white font-bold mb-6">Weekly Submission</h3>
                
                <div className="flex-1 flex flex-col justify-center">
                  {/* Status Indicator */}
                  <div className="flex justify-between mb-8 px-2 relative">
                    <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#2a2a2a] -z-10"></div>
                    <div className="absolute top-4 left-6 right-1/2 h-0.5 bg-[#348a21] -z-10"></div>
                    
                    {[
                      { num: 1, label: 'Window\nOpen', done: true },
                      { num: 2, label: 'Captured', done: true },
                      { num: 3, label: 'Verifying', done: true, active: true },
                      { num: 4, label: 'Verified', done: false },
                      { num: 5, label: 'Analyzed', done: false },
                      { num: 6, label: 'Report\nReady', done: false },
                    ].map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.active ? 'bg-[#151a15] border-2 border-[#4ade80] text-[#4ade80]' :
                          step.done ? 'bg-[#151a15] border border-[#348a21] text-[#348a21]' :
                          'bg-[#151a15] border border-[#2a2a2a] text-gray-600'
                        }`}>
                          {step.done && !step.active ? '✓' : step.num}
                        </div>
                        <div className="text-[10px] text-gray-500 text-center whitespace-pre-line leading-tight">
                          {step.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-2 mb-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#2a2212] text-[#facc15] text-xs font-bold border border-[#facc15]/20">
                      C Step 2: Verification processing...
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <Link 
                      to={`/farmer/capture/${selectedListingId}`} 
                      className="flex-1 py-2.5 rounded-xl bg-[#286328] hover:bg-[#1e4a1e] text-white text-sm font-bold text-center transition-colors flex items-center justify-center gap-2 border border-[#4ade80]/30 shadow-lg shadow-[#4ade80]/10"
                    >
                      <UploadCloud size={16} /> Upload Evidence
                    </Link>
                    <Link to="#" className="text-xs font-bold text-[#4ade80] hover:text-[#86efac] transition-colors px-2 text-center leading-tight">
                      View<br/>Submissions
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
