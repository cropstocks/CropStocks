import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, X, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { mockInvestments } from '../data/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function InvestmentsPage() {
  const { t } = useTranslation();
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvestments = mockInvestments.filter(inv =>
    inv.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.cropName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0', position: 'relative' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2>{t('market')} / {t('farms_stocks')}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search farms..."
              className="input-field"
              style={{ paddingLeft: '35px', width: '250px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} /> {t('filter')}
          </button>
        </div>
      </div>

      <div className="table-container shadow-md">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('farms_stocks')}</th>
              <th>{t('total_value')}</th>
              <th>{t('value_per_share')}</th>
              <th>{t('issue_size')}</th>
              <th>{t('risk_factor')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestments.map(inv => (
              <tr key={inv.id} onClick={() => setSelectedInvestment(inv)}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{inv.farmName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{inv.cropName}</div>
                </td>
                <td>₹{inv.totalValue.toLocaleString()}</td>
                <td>₹{inv.valuePerShare.toLocaleString()}</td>
                <td>{inv.issueSize.toLocaleString()} Shares</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    background: inv.riskFactor === 'Low' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: inv.riskFactor === 'Low' ? 'var(--color-primary-dark)' : '#d97706'
                  }}>
                    {inv.riskFactor}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Investment Details Overlay */}
      <div className={`modal-overlay ${selectedInvestment ? 'open' : ''}`} style={{ zIndex: 200 }}>
        {selectedInvestment && (
          <div className="modal-content" style={{ maxWidth: '800px', flexDirection: 'column', height: '80vh', position: 'relative', display: 'flex' }}>
            <button
              onClick={() => setSelectedInvestment(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'var(--bg-surface)', borderRadius: '50%', padding: '0.5rem', boxShadow: 'var(--shadow-sm)', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div style={{ background: 'var(--gradient-green)', padding: '2.5rem 3rem', color: 'white', flexShrink: 0 }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{selectedInvestment.farmName}</h2>
              <p style={{ opacity: 0.9 }}>By {selectedInvestment.farmerName}</p>
            </div>

            {/* Modal Body (Scrollable) */}
            <div style={{ padding: '2rem 3rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Crop Details</h4>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedInvestment.cropName}</p>
                  <p style={{ color: 'var(--text-muted)' }}>Season: {selectedInvestment.season}</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Maturity</h4>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{new Date(selectedInvestment.maturityDate).toLocaleDateString()}</p>
                  <p style={{ color: 'var(--text-muted)' }}>Remaining: {selectedInvestment.remainingIssue} Shares</p>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} color="var(--color-primary)" /> Farmer Success/Growth Ratio
                </h3>
                <div style={{ height: '300px', width: '100%', background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedInvestment.history}>
                      <defs>
                        <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--bg-surface)', color: 'var(--text-main)' }} />
                      <Area type="monotone" dataKey="performance" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  This graph indicates the historical growth and success ratio of this farm's previous yields.
                </p>
              </div>
            </div>

            {/* Fixed Footer with Buy Button */}
            <div style={{ padding: '1.5rem 3rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('value_per_share')}</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>₹{selectedInvestment.valuePerShare.toLocaleString()}</p>
              </div>
              <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-xl)' }}>
                {t('buy_now')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
