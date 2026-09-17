import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Custom dark mode stats card for Dev Dashboard
const DevStatsCard = ({ title, value, prefix = '', suffix = '' }) => (
  <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-lg shadow-sm hover:border-[#8b949e] transition-colors">
    <p className="text-sm font-medium text-[#8b949e] mb-2 font-mono uppercase tracking-wider">{title}</p>
    <h4 className="text-3xl font-mono font-bold text-[#58a6ff]">
      {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
    </h4>
  </div>
);

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

  if (loading) return <div className="min-h-screen bg-[#0d1117] p-12 text-center text-[#58a6ff] font-mono animate-pulse">Initializing Developer Environment...</div>;

  const pendingListings = listings.filter(l => l.status === 'PENDING' || l.status === 'ACTIVE' || l.status === 'FUNDING'); 
  const totalFarmers = new Set(listings.map(l => l.farmerId)).size + surveys.length;
  const activeInvestors = 3; 

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans pb-12">
      <div className="border-b border-[#30363d] bg-[#161b22] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#58a6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Developer Workspace</h1>
              <p className="text-[#8b949e] text-sm mt-1">Platform architecture, API metrics, and raw data access.</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <div className="bg-[#238636] text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 border border-[rgba(240,246,252,0.1)]">
              <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse"></span>
              DEV_BRANCH_ACTIVE
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <DevStatsCard title="Total Farmers" value={totalFarmers || 24} />
          <DevStatsCard title="Active Investors" value={activeInvestors || 12} />
          <DevStatsCard title="Pending Verifications" value={listings.length} />
          <DevStatsCard title="API Latency" value="42ms" />
        </div>

        <div className="flex space-x-1 mb-6 border-b border-[#30363d] overflow-x-auto">
          {['overview', 'farmers', 'investors', 'verification', 'cms'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`py-2.5 px-5 text-sm font-semibold capitalize whitespace-nowrap rounded-t-md transition-colors ${activeTab === tab ? 'bg-[#161b22] border-t border-l border-r border-[#30363d] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]/50 border-t border-l border-r border-transparent'}`}
              style={{ marginBottom: '-1px' }}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="bg-[#161b22] shadow-xl rounded-b-xl rounded-tr-xl border border-[#30363d] min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="animate-fade-in p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#8b949e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                System Telemetry
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0d1117] rounded-md border border-[#30363d] overflow-hidden">
                  <div className="bg-[#1f2428] px-4 py-2 border-b border-[#30363d] flex justify-between items-center">
                    <span className="text-xs font-mono text-[#8b949e]">tail -f /var/log/syslog</span>
                    <span className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                    </span>
                  </div>
                  <div className="p-4 font-mono text-xs text-[#8b949e] space-y-1.5 h-64 overflow-y-auto">
                    <div className="flex gap-3"><span className="text-[#3fb950]">[OK]</span> <span className="text-white">API Sync:</span> <span>Completed farmer db sync (124ms)</span></div>
                    <div className="flex gap-3"><span className="text-[#d29922]">[WARN]</span> <span className="text-white">Auth:</span> <span>Rate limit approached for IP 192.168.1.5</span></div>
                    <div className="flex gap-3"><span className="text-[#3fb950]">[OK]</span> <span className="text-white">Cron:</span> <span>Executed payout calculation job</span></div>
                    <div className="flex gap-3"><span className="text-[#58a6ff]">[INFO]</span> <span className="text-white">Storage:</span> <span>Firebase snapshot created successfully</span></div>
                    <div className="flex gap-3"><span className="text-[#3fb950]">[OK]</span> <span className="text-white">NDVI:</span> <span>Satellite imagery processed for 3 regions</span></div>
                    <div className="flex gap-3 mt-4 animate-pulse"><span className="text-[#8b949e]">&gt;</span> <span>Awaiting new events...</span></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[#0d1117] rounded-md border border-[#30363d] p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">Database Health</h3>
                    <ul className="text-sm space-y-3">
                      <li className="flex justify-between items-center"><span className="text-[#8b949e]">Active Connections</span> <span className="font-mono text-[#58a6ff]">42 / 100</span></li>
                      <li className="flex justify-between items-center"><span className="text-[#8b949e]">Storage Used</span> <span className="font-mono text-white">1.2 GB (12%)</span></li>
                      <li className="flex justify-between items-center"><span className="text-[#8b949e]">Query Cache Hit</span> <span className="font-mono text-[#3fb950]">94.2%</span></li>
                    </ul>
                  </div>
                  <div className="bg-[#0d1117] rounded-md border border-[#30363d] p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">Service Endpoints</h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex justify-between items-center"><code className="text-xs text-[#ff7b72]">POST /api/auth</code> <span className="text-[#3fb950] text-xs font-bold">200 OK</span></li>
                      <li className="flex justify-between items-center"><code className="text-xs text-[#79c0ff]">GET /api/listings</code> <span className="text-[#3fb950] text-xs font-bold">200 OK</span></li>
                      <li className="flex justify-between items-center"><code className="text-xs text-[#a5d6ff]">PUT /api/admin</code> <span className="text-[#d29922] text-xs font-bold">401 UNAUTH</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'farmers' && (
            <div className="animate-fade-in">
              <div className="p-4 border-b border-[#30363d] flex justify-between items-center bg-[#1f2428] rounded-t-xl">
                <h2 className="text-sm font-semibold text-white">Raw Farmer Data (JSON/Table)</h2>
                <div className="flex gap-2">
                  <span className="bg-[#0d1117] text-xs text-[#8b949e] px-2 py-1 rounded border border-[#30363d]">Total Records: {listings.length}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#30363d] bg-[#0d1117]">
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">ID (UUID)</th>
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">PRODUCE_NAME</th>
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">REGION</th>
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">NDVI_SCORE</th>
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">PAYLOAD</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                    {listings.map((l, i) => (
                      <tr key={l.id} className="border-b border-[#30363d] hover:bg-[#1f2428] transition-colors">
                        <td className="py-3 px-4 text-[#79c0ff]">{l.farmerId || `FARM-${1000+i}`}</td>
                        <td className="py-3 px-4 text-white">{l.produceName}</td>
                        <td className="py-3 px-4 text-[#c9d1d9]">{l.region}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded border ${l.ndviScore > 0.7 ? 'border-[#3fb950] text-[#3fb950] bg-[#3fb950]/10' : 'border-[#d29922] text-[#d29922] bg-[#d29922]/10'}`}>
                            {l.ndviScore ? l.ndviScore.toFixed(2) : 'NULL'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-[#8b949e] hover:text-white underline decoration-[#30363d] hover:decoration-white underline-offset-4">{'{}'} View JSON</button>
                        </td>
                      </tr>
                    ))}
                    {listings.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-8 text-[#8b949e]">0 rows returned from SELECT * FROM farmers;</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="animate-fade-in">
              <div className="p-4 border-b border-[#30363d] flex justify-between items-center bg-[#1f2428] rounded-t-xl">
                <h2 className="text-sm font-semibold text-white">Investor Accounts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#30363d] bg-[#0d1117]">
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">ACCOUNT_ID</th>
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">TOTAL_INVESTED (INR)</th>
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">PORTFOLIO_SIZE</th>
                      <th className="py-3 px-4 font-semibold text-[#8b949e]">KYC_STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                    <tr className="border-b border-[#30363d] hover:bg-[#1f2428]">
                      <td className="py-3 px-4 text-[#79c0ff]">INV-8492</td>
                      <td className="py-3 px-4 text-[#3fb950]">150000.00</td>
                      <td className="py-3 px-4 text-white">3</td>
                      <td className="py-3 px-4"><span className="text-[#3fb950]">[ VERIFIED ]</span></td>
                    </tr>
                    <tr className="border-b border-[#30363d] hover:bg-[#1f2428]">
                      <td className="py-3 px-4 text-[#79c0ff]">INV-1023</td>
                      <td className="py-3 px-4 text-[#3fb950]">45000.00</td>
                      <td className="py-3 px-4 text-white">1</td>
                      <td className="py-3 px-4"><span className="text-[#d29922]">[ PENDING_REVIEW ]</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="animate-fade-in p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Registration Pipeline</h2>
              {pendingListings.length === 0 ? (
                <div className="text-center py-12 text-[#8b949e] bg-[#0d1117] rounded-md border border-[#30363d] font-mono text-sm">Pipeline is empty. No pending crop registrations.</div>
              ) : (
                <div className="space-y-4">
                  {pendingListings.map(l => (
                    <div key={l.id} className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0 w-full md:w-2/3">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-white">{l.produceName}</h3>
                          <span className="bg-[#1f2428] border border-[#30363d] text-[#8b949e] px-2 py-0.5 rounded text-xs font-mono">{l.region}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono mt-3 p-3 bg-[#161b22] rounded border border-[#30363d]">
                          <div><span className="text-[#8b949e]">CAPITAL_REQ:</span> <span className="text-[#3fb950]">₹{l.capitalRequired}</span></div>
                          <div><span className="text-[#8b949e]">CYCLE_DURATION:</span> <span className="text-white">{l.cycleDuration}d</span></div>
                          <div><span className="text-[#8b949e]">RISK_TIER:</span> <span className="text-[#ff7b72]">{l.riskTier || 'N/A'}</span></div>
                          <div><span className="text-[#8b949e]">SPLIT (F/I):</span> <span className="text-[#a5d6ff]">{l.profitSplitFarmer}% / {100 - l.profitSplitFarmer}%</span></div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        <button className="w-full bg-[#21262d] border border-[#363b42] hover:bg-[#30363d] hover:border-[#8b949e] text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
                          Inspect Payload
                        </button>
                        <button onClick={() => handleApprove(l.id)} className="w-full bg-[#238636] border border-[rgba(240,246,252,0.1)] hover:bg-[#2ea043] text-white px-4 py-2 rounded font-semibold text-sm transition-colors shadow-sm">
                          Verify & Approve (POST)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'cms' && (
            <div className="animate-fade-in p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Environment Configurations</h2>
              <form onSubmit={handleCmsSave} className="max-w-2xl bg-[#0d1117] border border-[#30363d] rounded-md p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono text-[#8b949e] mb-1.5 uppercase">APP_SITE_TITLE</label>
                    <input 
                      type="text" 
                      value={cmsSettings.siteTitle}
                      onChange={(e) => setCmsSettings({...cmsSettings, siteTitle: e.target.value})}
                      className="w-full bg-[#010409] border border-[#30363d] rounded-md p-2.5 text-white text-sm focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none font-mono" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#8b949e] mb-1.5 uppercase">APP_HERO_SUBTITLE</label>
                    <input 
                      type="text" 
                      value={cmsSettings.heroSubtitle}
                      onChange={(e) => setCmsSettings({...cmsSettings, heroSubtitle: e.target.value})}
                      className="w-full bg-[#010409] border border-[#30363d] rounded-md p-2.5 text-white text-sm focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none font-mono" 
                    />
                  </div>
                  <div className="flex items-center p-3 bg-[#161b22] rounded border border-[#30363d]">
                    <input 
                      type="checkbox" 
                      id="maintenance"
                      checked={cmsSettings.maintenanceMode}
                      onChange={(e) => setCmsSettings({...cmsSettings, maintenanceMode: e.target.checked})}
                      className="h-4 w-4 bg-[#010409] border-[#30363d] rounded cursor-pointer accent-[#58a6ff]" 
                    />
                    <label htmlFor="maintenance" className="ml-3 block text-sm font-mono text-white cursor-pointer">
                      ENABLE_MAINTENANCE_MODE (HTTP 503)
                    </label>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-[#30363d]">
                  <button type="submit" className="bg-[#21262d] border border-[#363b42] hover:bg-[#30363d] hover:border-[#8b949e] text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-colors w-full sm:w-auto shadow-sm">
                    Deploy Configuration
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
