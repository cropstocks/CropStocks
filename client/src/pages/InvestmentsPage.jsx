import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, X, TrendingUp, Calendar, MapPin, ArrowLeft } from 'lucide-react';
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

  if (selectedInvestment) {
    return (
      <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
        <button
          onClick={() => setSelectedInvestment(null)}
          className="btn btn-outline"
          style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)' }}
        >
          <ArrowLeft size={18} /> Back to Market
        </button>

        <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
          {/* Header */}
          <div style={{ background: 'var(--gradient-green)', padding: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selectedInvestment.farmName}</h1>
            <p style={{ opacity: 0.9, fontSize: '1.2rem' }}>By {selectedInvestment.farmerName}</p>
          </div>

          {/* Body */}
          <div style={{ padding: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'revert', '@media (minWidth: 768px)': { gridTemplateColumns: '1fr 1fr' }, gap: '3rem', marginBottom: '4rem', display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}><MapPin size={18} /> Crop Details</h4>
                <p style={{ fontWeight: 600, fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>{selectedInvestment.cropName}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Season: {selectedInvestment.season}</p>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}><Calendar size={18} /> Maturity</h4>
                <p style={{ fontWeight: 600, fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>{new Date(selectedInvestment.maturityDate).toLocaleDateString()}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Remaining: <span style={{ fontWeight: 600 }}>{selectedInvestment.remainingIssue} Shares</span></p>
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
                <TrendingUp size={24} color="var(--color-primary)" /> Farmer Success / Growth Ratio
              </h3>
              <div style={{ height: '400px', width: '100%', background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedInvestment.history}>
                    <defs>
                      <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13 }} dx={-10} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', background: 'var(--bg-surface)', color: 'var(--text-main)', padding: '12px' }} />
                    <Area type="monotone" dataKey="performance" stroke="var(--color-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorPerf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center' }}>
                This graph indicates the historical growth and success ratio of this farm's previous yields.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ padding: '2rem 3rem', background: 'var(--bg-main)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{t('value_per_share')}</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>₹{selectedInvestment.valuePerShare.toLocaleString()}</p>
            </div>
            <button className="btn btn-primary" style={{ padding: '1.25rem 4rem', fontSize: '1.2rem', borderRadius: 'var(--radius-xl)', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)' }}>
              {t('buy_now')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
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
          <button className="btn btn-outline" style={{ background: 'var(--bg-surface)' }}>
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
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    background: inv.riskFactor === 'Low' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
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
    </div>
  );
}
