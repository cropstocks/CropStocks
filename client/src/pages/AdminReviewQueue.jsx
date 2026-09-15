import React, { useState, useEffect, useContext } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AdminReviewQueue = () => {
  const { user } = useContext(AuthContext);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [healthOverride, setHealthOverride] = useState('');

  useEffect(() => {
    if (user && (user.role === 'ADMIN' || user.role === 'FIELD_AGENT')) {
      fetchQueue();
    }
  }, [user]);

  const fetchQueue = async () => {
    try {
      const res = await api.get('/reviews/queue');
      setQueue(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedReport) return;
    try {
      await api.post(`/reviews/${selectedReport.id}/approve`);
      setSelectedReport(null);
      fetchQueue();
    } catch (err) {
      alert('Approval failed');
    }
  };

  const handleOverride = async () => {
    if (!selectedReport || !overrideReason) {
      alert('Justification required for override');
      return;
    }
    try {
      await api.post(`/reviews/${selectedReport.id}/override`, {
        reason: overrideReason,
        healthIndex: healthOverride ? parseInt(healthOverride, 10) : undefined
      });
      setSelectedReport(null);
      setOverrideReason('');
      setHealthOverride('');
      fetchQueue();
    } catch (err) {
      alert('Override failed');
    }
  };

  if (!user || (user.role !== 'ADMIN' && user.role !== 'FIELD_AGENT')) {
    return <div className="p-8 text-center text-red-600">Access Denied</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-6">Review Queue</h1>
      
      {loading ? (
        <div className="text-center p-4">Loading queue...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {queue.map(item => {
              const hoursLeft = Math.max(0, Math.floor((new Date(item.slaDeadline) - new Date()) / (1000 * 60 * 60)));
              return (
                <div key={item.id} className="glass-card p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{item.farmerName}</h3>
                    <p className="text-sm text-brand-slate">{item.crop} | {item.region} | Week {item.week}</p>
                    <div className="flex gap-3 mt-2 text-sm">
                      <span className={`px-2 py-0.5 rounded font-bold ${item.healthIndex < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        Health: {item.healthIndex}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Conf: {item.confidence}%</span>
                      {item.severeDetections > 0 && (
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded flex items-center gap-1">
                          <AlertCircle size={14} /> {item.severeDetections} Severe
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-bold flex items-center mb-2 ${hoursLeft < 4 ? 'text-red-600' : 'text-gray-500'}`}>
                      <Clock size={12} className="mr-1" /> {hoursLeft}h SLA
                    </span>
                    <button 
                      onClick={() => setSelectedReport(item)}
                      className="btn btn-outline text-sm py-1"
                    >
                      Review
                    </button>
                  </div>
                </div>
              );
            })}
            {queue.length === 0 && <div className="text-center p-8 text-gray-500">Queue is empty.</div>}
          </div>

          <div className="lg:col-span-1">
            {selectedReport ? (
              <div className="glass-panel p-5 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Review Details</h2>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm">Summary</h4>
                  <p className="text-sm text-gray-700 mt-1">{selectedReport.summaryText}</p>
                </div>
                
                {selectedReport.anomalies?.length > 0 && (
                  <div className="mb-4 bg-red-50 p-3 rounded border border-red-100">
                    <h4 className="font-semibold text-sm text-red-800 flex items-center gap-1">
                      <AlertCircle size={14} /> Anomalies Flagged
                    </h4>
                    <ul className="text-sm text-red-700 list-disc pl-4 mt-1">
                      {selectedReport.anomalies.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                )}

                <div className="border-t pt-4 mt-4">
                  <button onClick={handleApprove} className="w-full btn btn-primary bg-brand-green text-white mb-3">
                    <CheckCircle size={16} className="inline mr-2" /> Approve Report
                  </button>
                  
                  <div className="bg-amber-50 p-3 rounded border border-amber-200">
                    <h4 className="font-semibold text-sm mb-2 text-amber-800">Override Options</h4>
                    <textarea 
                      className="w-full p-2 border rounded text-sm mb-2 bg-white"
                      placeholder="Justification for override..."
                      value={overrideReason}
                      onChange={e => setOverrideReason(e.target.value)}
                      rows={3}
                    />
                    <input 
                      type="number"
                      className="w-full p-2 border rounded text-sm mb-2 bg-white"
                      placeholder="New Health Index (Optional)"
                      value={healthOverride}
                      onChange={e => setHealthOverride(e.target.value)}
                      min="0" max="100"
                    />
                    <button onClick={handleOverride} className="w-full btn bg-amber-500 hover:bg-amber-600 text-white text-sm">
                      Apply Override
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full min-h-[300px]">
                <CheckCircle size={48} className="mb-4 text-gray-300" />
                Select a report to review
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewQueue;
