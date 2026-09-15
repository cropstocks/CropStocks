import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

const FarmerAppealForm = () => {
  const { listingId } = useParams();
  const { t } = useTranslation();
  
  const [cycleState, setCycleState] = useState(null);
  const [appeals, setAppeals] = useState([]);
  const [type, setType] = useState('HEALTH_SCORE');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, [listingId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cycleRes, appealsRes] = await Promise.all([
        api.get(`/crop-cycle/${listingId}`),
        api.get(`/appeals/${listingId}`).catch(() => [])
      ]);
      setCycleState(cycleRes);
      setAppeals(appealsRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reason.length < 50) {
      alert(t('Please provide at least 50 characters of explanation.'));
      return;
    }
    
    setSubmitting(true);
    try {
      await api.post('/appeals', {
        cycleStateId: cycleState?.id,
        cycleWeek: cycleState?.currentWeek,
        appealType: type,
        reason
      });
      setSuccessMsg(t('Your appeal has been submitted and will be reviewed within 7 days.'));
      setReason('');
      fetchData();
    } catch (err) {
      alert(t('Failed to submit appeal'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">{t('Loading...')}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-6">{t('File an Appeal')}</h1>
      
      {cycleState && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-sm mb-1">{t('Current Status Context')}</h4>
          <div className="text-sm">
            {t('Week')}: {cycleState.currentWeek} | {t('Health Index')}: {cycleState.currentHealthIndex} | {t('Stock Price')}: ₹{cycleState.currentPrice}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">{t('Appeal Type')}</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="appealType" value="HEALTH_SCORE" checked={type === 'HEALTH_SCORE'} onChange={() => setType('HEALTH_SCORE')} className="mr-2" />
              {t('Health Score Dispute')}
            </label>
            <label className="flex items-center">
              <input type="radio" name="appealType" value="PRICE_MOVEMENT" checked={type === 'PRICE_MOVEMENT'} onChange={() => setType('PRICE_MOVEMENT')} className="mr-2" />
              {t('Price Movement Dispute')}
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">{t('Reason for Appeal')}</label>
          <textarea 
            className="w-full input-field border rounded p-3"
            rows={5}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t('Please explain in detail why you are appealing... (minimum 50 characters)')}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {reason.length} / 50 {t('min characters')}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={submitting || reason.length < 50}
          className="w-full btn btn-primary bg-brand-green text-white py-3 disabled:bg-gray-400"
        >
          {submitting ? t('Submitting...') : t('Submit Appeal')}
        </button>
      </form>

      {appeals.length > 0 && (
        <div>
          <h2 className="text-xl font-heading font-bold mb-4">{t('Appeal History')}</h2>
          <div className="space-y-4">
            {appeals.map(a => (
              <div key={a.id} className="glass-card p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-sm">{a.appealType === 'HEALTH_SCORE' ? t('Health Score') : t('Price Movement')} (Week {a.cycleWeek})</span>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${a.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : a.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t(a.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{a.reason}</p>
                <div className="text-xs text-gray-400 mt-2">{new Date(a.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerAppealForm;
