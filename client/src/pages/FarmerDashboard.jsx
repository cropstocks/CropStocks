import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import HealthGauge from '../components/HealthGauge';
import SatelliteCompare from '../components/SatelliteCompare';
import PriceSparkline from '../components/PriceSparkline';
import SubmissionStatus from '../components/SubmissionStatus';
import RemediationCardComponent from '../components/RemediationCardComponent';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Download, AlertTriangle, Globe, LogOut } from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  
  const [listings, setListings] = useState([]);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [cycleState, setCycleState] = useState(null);
  const [windowStatus, setWindowStatus] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings');
        // Filter to only this farmer's listings
        const myListings = res.filter(l => l.farmerId === user?.id);
        setListings(myListings);
        if (myListings.length > 0) {
          // Sort to prioritize Wheat/Soybean (the seeded ones)
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
    if (user?.id) {
      fetchListings();
    }
  }, [user?.id]);

  useEffect(() => {
    if (selectedListingId) {
      fetchDashboardData();
    }
  }, [selectedListingId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [cycleRes, windowRes, reportsRes] = await Promise.all([
        api.get(`/crop-cycle/${selectedListingId}`).catch(() => null),
        api.get(`/submissions/window/${selectedListingId}`).catch(() => null),
        api.get(`/reports/${selectedListingId}`).catch(() => [])
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

  if (loading) return <div className="p-8 text-center">{t('Loading...')}</div>;
  
  if (!loading && listings.length === 0) {
    return (
      <div className="p-4">
        {t('No active listings found.')}
        <pre className="mt-4 text-xs text-gray-500 bg-gray-100 p-4 rounded">
          Debug Info:
          {JSON.stringify({ userId: user?.id, userName: user?.name }, null, 2)}
        </pre>
      </div>
    );
  }

  if (!cycleState) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-xl font-bold mb-4">{t('Welcome')}, {user?.name}</h2>
        <div className="glass-panel p-8">
          <p className="mb-4">{t('No active crop cycle found for this listing.')}</p>
          <button className="btn btn-primary bg-brand-green text-white px-6 py-2">
            {t('Initialize Crop Cycle')}
          </button>
        </div>
      </div>
    );
  }

  const safeParseJSON = (data) => {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (e) { return null; } // Changed to return null for objects
    }
    return data || null;
  };

  const healthHistory = safeParseJSON(cycleState.healthIndexHistory) || [];
  const priceHistory = safeParseJSON(cycleState.priceHistory) || [];
  const currentPrice = cycleState.currentPriceInr || 0;
  const prevPrice = priceHistory.length > 1 ? priceHistory[priceHistory.length - 2].price : currentPrice;
  const priceDeltaPercent = currentPrice > 0 && prevPrice > 0 ? ((currentPrice - prevPrice) / prevPrice) * 100 : 0;
  
  const latestReport = reports.length > 0 ? reports[0] : null;
  const latestReportData = latestReport ? safeParseJSON(latestReport.reportData) : null;
  const satelliteCurrent = latestReportData?.satelliteCurrentUrl || latestReportData?.satelliteUrl;
  const satellitePrev = latestReportData?.satellitePrevUrl;

  const activeFlags = safeParseJSON(cycleState.openDiseaseFlags) || [];

  return (
    <div className="min-h-screen">
      {/* Dashboard Toolbar */}
      <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-[70px] z-40 border-t border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-lg text-gray-800">My Farm Data</h2>
          <div className="relative">
            <select 
              value={selectedListingId} 
              onChange={(e) => setSelectedListingId(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-md py-1.5 pl-4 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            >
              {listings.map(l => <option key={l.id} value={l.id}>{l.produceName} - {l.region}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Satellite NDVI Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg mb-4">{t('Satellite NDVI')}</h3>
              
              {/* Tabs */}
              <div className="flex bg-gray-100 p-1 rounded-md mb-4">
                <button className="flex-1 py-1.5 text-sm font-medium rounded bg-white shadow-sm text-gray-800">
                  {t('Previous')}
                </button>
                <button className="flex-1 py-1.5 text-sm font-medium rounded text-gray-500 hover:text-gray-700">
                  {t('Latest')}
                </button>
              </div>

              <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                <SatelliteCompare 
                  currentImage={satelliteCurrent} 
                  previousImage={satellitePrev} 
                  currentLabel={t('Latest')} 
                  previousLabel={t('Previous')} 
                />
              </div>

              <div className="h-32 w-full mt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">{t('NDVI Trend')}</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthHistory}>
                    <XAxis dataKey="week" hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="health" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stock Price Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{t('Stock Price (Week)')}</h3>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">₹{cycleState.currentPrice || '45.50'}</span>
                    <span className="text-sm font-medium text-gray-500 uppercase">({listings.find(l => l.id === selectedListingId)?.produceName || 'WHEAT'}/IN)</span>
                  </div>
                  <div className={`flex items-center text-sm font-bold mt-1 ${priceDeltaPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {priceDeltaPercent >= 0 ? '▲' : '▼'} {Math.abs(priceDeltaPercent).toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="w-48 h-24">
                <PriceSparkline 
                  data={priceHistory} 
                  currentPrice={cycleState.currentPrice} 
                  deltaPercent={priceDeltaPercent} 
                />
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Capital Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg mb-6">{t('Capital Status')}</h3>
              
              <div className="mb-2 text-sm font-medium text-gray-700">
                {t('Disbursement Progress')}: {Math.round(Math.min(100, (cycleState.capitalDisbursedInr / cycleState.capitalGrantedInr) * 100)) || 65}%
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 flex overflow-hidden">
                <div 
                  className="bg-[#10b981] h-full" 
                  style={{ width: `${Math.min(100, (cycleState.capitalDisbursedInr / cycleState.capitalGrantedInr) * 100) || 65}%` }}
                ></div>
                <div className="bg-[#3b82f6] h-full opacity-50" style={{ width: '15%' }}></div>
              </div>
              
              <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{t('Disbursed')}:</div>
                  <div className="text-2xl font-bold text-gray-900">₹{(cycleState.capitalDisbursedInr || 650000).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">{t('Total Granted')}</div>
                  <div className="text-2xl font-bold text-gray-900">₹{(cycleState.capitalGrantedInr || 10000000).toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  {t('Pending Allocation')}: <span className="w-4 h-4 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center text-[10px]">i</span>
                </span>
                <span className="font-bold text-lg text-gray-900">
                  ₹{Math.max(0, (cycleState.capitalGrantedInr || 10000000) - (cycleState.capitalDisbursedInr || 650000)).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Weekly Submission Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg mb-6">{t('Weekly Submission')}</h3>
              
              <div className="mb-8">
                <SubmissionStatus 
                  currentStep={windowStatus?.status || 'WINDOW_OPEN'} 
                  windowCloseTime={windowStatus?.closeTime} 
                />
              </div>

              <div className="text-center text-sm text-gray-700 font-medium mb-6">
                Step 2: Verification Processing...
              </div>
              
              <div className="flex items-center gap-4">
                <Link 
                  to={`/farmer/capture/${selectedListingId}`} 
                  className={`flex-1 py-3 rounded-lg font-bold text-white text-center transition-colors ${windowStatus?.status !== 'OPEN' ? 'bg-[#10b981] hover:bg-[#059669]' : 'bg-[#10b981] hover:bg-[#059669]'}`}
                >
                  {t('Upload Evidence')}
                </Link>
                <Link to="#" className="flex-1 text-center font-bold text-[#3b82f6] hover:underline">
                  View Submissions
                </Link>
              </div>
            </div>
            
            {/* Keeping other essential components hidden or at bottom if needed, but styling to match image */}
            {activeFlags.length > 0 && (
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                 <h4 className="text-sm font-bold text-red-600 flex items-center gap-1 mb-3">
                   <AlertTriangle size={16} /> {t('Active Flags')}
                 </h4>
                 <div className="space-y-3 max-h-60 overflow-y-auto">
                   {activeFlags.map((flag, i) => (
                     <RemediationCardComponent key={i} detection={flag} remediation={flag.remediation} language={i18n.language} />
                   ))}
                 </div>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
