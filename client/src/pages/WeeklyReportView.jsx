import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import HealthGauge from '../components/HealthGauge';
import SatelliteCompare from '../components/SatelliteCompare';
import RemediationCardComponent from '../components/RemediationCardComponent';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const WeeklyReportView = () => {
  const { listingId, week } = useParams();
  const { t, i18n } = useTranslation();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/${listingId}/${week}`);
        setReport(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [listingId, week]);

  if (loading) return <div className="p-8 text-center">{t('Loading...')}</div>;
  if (!report) return <div className="p-8 text-center text-red-500">{t('Report not found')}</div>;

  const { data } = report; 

  const healthTrendData = data.healthTrend || [];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="glass-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">{data.farmerName} - {data.crop}</h1>
          <p className="text-brand-slate">{data.region} | Week {week}</p>
          {data.isVerified && (
            <div className="flex items-center text-brand-green text-sm font-bold mt-2">
              <ShieldCheck size={16} className="mr-1" /> {t('Verified Report')}
            </div>
          )}
        </div>
        <button className="btn btn-outline flex items-center mt-4 md:mt-0">
          <Download size={16} className="mr-2" /> {t('Download PDF')}
        </button>
      </div>

      <div className="bg-brand-light p-5 rounded-lg border border-gray-200">
        <h3 className="font-heading font-semibold text-lg mb-2">{t('Executive Summary')}</h3>
        <p className="font-body text-brand-slate leading-relaxed">{data.summaryText}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5">
          <h3 className="font-heading font-semibold text-lg mb-4">{t('Field Evidence')}</h3>
          <div className="grid grid-cols-2 gap-2">
            {data.images?.slice(0,4).map((img, i) => (
              <div key={i} className="relative aspect-square rounded overflow-hidden">
                <img src={img.url} alt="Field" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[10px] text-white p-1">
                  {new Date(img.timestamp).toLocaleTimeString()} | {img.lat.toFixed(4)}, {img.lng.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5">
          <h3 className="font-heading font-semibold text-lg mb-4">{t('Satellite NDVI')}</h3>
          <SatelliteCompare 
            currentImage={data.satelliteCurrentUrl}
            previousImage={data.satellitePrevUrl}
            currentLabel={t('This Week')}
            previousLabel={t('Last Week')}
          />
        </div>
      </div>

      <div className="glass-card p-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-shrink-0">
          <HealthGauge value={data.healthIndex} size={160} label={t('Crop Health Index')} />
        </div>
        <div className="flex-1 w-full h-40">
          <h4 className="text-sm font-semibold mb-2 text-brand-slate text-center">{t('Health Trend')}</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tick={{fontSize: 12}} />
              <YAxis domain={[0, 100]} tick={{fontSize: 12}} />
              <Tooltip />
              <Line type="monotone" dataKey="health" stroke="#22c55e" strokeWidth={3} dot={{r:4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {data.detections && data.detections.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-xl">{t('Diagnostics & Advisory')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.detections.map((det, i) => (
              <RemediationCardComponent 
                key={i} 
                detection={det} 
                remediation={det.remediation} 
                language={i18n.language} 
              />
            ))}
          </div>
        </div>
      )}

      <div className="glass-panel p-5">
        <h3 className="font-heading font-semibold text-lg mb-4">{t('Financials (This Week)')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left mb-4">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2">{t('Item')}</th>
                <th className="px-4 py-2">{t('Amount')}</th>
              </tr>
            </thead>
            <tbody>
              {data.bills?.map((b, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{b.description}</td>
                  <td className="px-4 py-2">₹{b.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-50">
                <td className="px-4 py-2">{t('Total Weekly Spend')}</td>
                <td className="px-4 py-2">₹{data.weeklySpendTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{t('Total Capital Disbursed')}</span>
            <span>₹{data.totalDisbursed} / ₹{data.capitalGranted}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-brand-blue h-2.5 rounded-full" style={{ width: `${(data.totalDisbursed / data.capitalGranted) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-5 bg-gradient-to-br from-brand-light to-white">
        <h3 className="font-heading font-semibold text-lg mb-4">{t('Valuation Update')}</h3>
        <div className="flex items-center gap-6 mb-6">
          <div className="text-gray-500 line-through text-xl">₹{data.priorPrice}</div>
          <div className="text-3xl font-bold text-brand-dark">₹{data.newPrice}</div>
          <div className={`text-lg font-semibold ${data.newPrice >= data.priorPrice ? 'text-green-600' : 'text-red-600'}`}>
            {data.newPrice >= data.priorPrice ? '+' : ''}{((data.newPrice - data.priorPrice) / data.priorPrice * 100).toFixed(2)}%
          </div>
        </div>
        
        <h4 className="text-sm font-semibold mb-2">{t('Attribution Breakdown')}</h4>
        <table className="w-full text-sm text-left">
          <tbody>
            {data.attribution?.map((attr, i) => (
              <tr key={i} className="border-b border-dashed border-gray-200">
                <td className="py-2">{attr.factor}</td>
                <td className={`py-2 text-right font-medium ${attr.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {attr.impact >= 0 ? '+' : ''}₹{attr.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center text-xs text-gray-400 mt-8 pb-4">
        Model version: {data.modelVersion} | KB: {data.kbVersion} | Generated: {new Date(data.generatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default WeeklyReportView;
