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
import { Download, AlertTriangle } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-brand-light p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">{t('Welcome')}, {user?.name}</h1>
          <p className="text-brand-slate text-sm">
            {t('Managing')}: 
            <select 
              value={selectedListingId} 
              onChange={(e) => setSelectedListingId(e.target.value)}
              className="ml-2 bg-transparent border-b border-gray-300 font-bold focus:outline-none"
            >
              {listings.map(l => <option key={l.id} value={l.id}>{l.produceName} - {l.region}</option>)}
            </select>
          </p>
        </div>
        <Link to={`/farmer/appeal/${selectedListingId}`} className="text-brand-blue font-semibold text-sm hover:underline mt-2 sm:mt-0">
          📋 {t('File Appeal')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-panel p-5 flex flex-col">
          <h3 className="font-heading font-semibold text-lg mb-4">{t('Satellite NDVI')}</h3>
          <div className="mb-4">
            <SatelliteCompare 
              currentImage={satelliteCurrent} 
              previousImage={satellitePrev} 
              currentLabel={t('Latest')} 
              previousLabel={t('Previous')} 
            />
          </div>
          <div className="h-24 w-full mt-auto">
            <h4 className="text-xs text-brand-slate mb-1">{t('NDVI Trend')}</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthHistory}>
                <XAxis dataKey="week" hide />
                <Tooltip />
                <Line type="monotone" dataKey="health" stroke="#eab308" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col justify-center">
          <h3 className="font-heading font-semibold text-lg mb-6">{t('Capital Status')}</h3>
          
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-sm text-brand-slate">{t('Disbursed')}</div>
              <div className="text-3xl font-bold text-brand-dark">₹{cycleState.capitalDisbursedInr}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-brand-slate">{t('Total Granted')}</div>
              <div className="text-xl font-bold text-gray-500">₹{cycleState.capitalGrantedInr}</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-brand-blue h-3 rounded-full" 
              style={{ width: `${Math.min(100, (cycleState.capitalDisbursedInr / cycleState.capitalGrantedInr) * 100)}%` }}
            ></div>
          </div>
          
          <div className="bg-brand-light p-3 rounded text-sm flex justify-between items-center">
            <span className="font-medium">{t('Pending Allocation')}</span>
            <span className="font-bold">₹{Math.max(0, cycleState.capitalGrantedInr - cycleState.capitalDisbursedInr)}</span>
          </div>
        </div>

        <div className="glass-panel p-5">
          <h3 className="font-heading font-semibold text-lg mb-4">{t('Stock Price')} (Week {cycleState.currentWeek})</h3>
          <PriceSparkline 
            data={priceHistory} 
            currentPrice={cycleState.currentPrice} 
            deltaPercent={priceDeltaPercent} 
          />
          {latestReport?.data?.attribution && (
            <div className="mt-4 text-sm text-brand-slate bg-white p-3 border rounded">
              <strong>{t('Latest Update')}:</strong> {latestReport.data.attribution[0]?.factor || t('Standard market movement.')}
            </div>
          )}
        </div>

        <div className="glass-panel p-5">
          <h3 className="font-heading font-semibold text-lg mb-2">{t('Weekly Submission')}</h3>
          <SubmissionStatus 
            currentStep={windowStatus?.status || 'WINDOW_OPEN'} 
            windowCloseTime={windowStatus?.closeTime} 
          />
          <div className="mt-6 flex justify-center">
            <Link 
              to={`/farmer/capture/${selectedListingId}`} 
              className={`btn btn-primary px-6 py-2 w-full text-center ${windowStatus?.status !== 'OPEN' ? 'opacity-50 pointer-events-none' : 'bg-brand-green text-white hover:bg-green-700'}`}
            >
              {t('Upload Evidence')}
            </Link>
          </div>
        </div>

        <div className="glass-panel p-5 md:col-span-2 lg:col-span-1">
          <h3 className="font-heading font-semibold text-lg mb-4">{t('Crop Health')}</h3>
          <div className="flex justify-center mb-6">
            <HealthGauge value={healthHistory.length > 0 ? healthHistory[healthHistory.length - 1].index || healthHistory[healthHistory.length - 1].health || 0 : 0} size={150} />
          </div>
          
          {activeFlags.length > 0 ? (
            <div>
              <h4 className="text-sm font-bold text-red-600 flex items-center gap-1 mb-3">
                <AlertTriangle size={16} /> {t('Active Flags')}
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {activeFlags.map((flag, i) => (
                  <RemediationCardComponent key={i} detection={flag} remediation={flag.remediation} language={i18n.language} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded">
              {t('No active diseases or pests detected.')}
            </div>
          )}
        </div>

        <div className="glass-panel p-5 md:col-span-2 lg:col-span-1">
          <h3 className="font-heading font-semibold text-lg mb-4">{t('Weekly Reports')}</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {reports.map((r, i) => {
              const rData = safeParseJSON(r.reportData) || {};
              return (
              <Link 
                key={i} 
                to={`/farmer/report/${selectedListingId}/${r.cycleWeek || r.week}`}
                className="block border rounded-lg p-3 hover:border-brand-green transition-colors bg-white group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Week {r.cycleWeek || r.week}</span>
                  <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-slate">
                  <span>Health: <span className="font-semibold text-brand-dark">{rData.healthIndex || '-'}</span></span>
                  <span>Price Δ: <span className={`font-semibold ${rData.newPrice >= rData.priorPrice ? 'text-green-600' : 'text-red-600'}`}>
                    {rData.newPrice >= rData.priorPrice ? '+' : ''}{rData.newPrice && rData.priorPrice ? ((rData.newPrice - rData.priorPrice)/rData.priorPrice*100).toFixed(1) : 0}%
                  </span></span>
                </div>
                <div className="mt-2 text-xs text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end">
                  {t('View Full Report')} <Download size={12} className="ml-1" />
                </div>
              </Link>
            )})}
            {reports.length === 0 && (
              <div className="text-center text-gray-500 py-8">{t('No reports generated yet.')}</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;
