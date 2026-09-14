import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockInvestments, userPortfolio } from '../data/mockData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useTranslation();
  // By default, select the first investment in the portfolio
  const defaultInvestment = mockInvestments.find(i => i.id === userPortfolio[0]?.investmentId) || mockInvestments[0];
  const [selectedInvestment, setSelectedInvestment] = useState(defaultInvestment);

  // Combine user portfolio data with mock investments
  const portfolioWithDetails = userPortfolio.map(p => {
    const details = mockInvestments.find(inv => inv.id === p.investmentId);
    return { ...p, ...details };
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
      <h2 style={{ marginBottom: '2rem' }}>{t('dashboard')}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>

        {/* Left Side: Graph */}
        <div className="glass-panel" style={{ padding: '2rem', minHeight: '500px' }}>
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)' }}>
                <Activity size={20} /> {selectedInvestment.farmName} Performance
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>{selectedInvestment.cropName}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{selectedInvestment.totalValue.toLocaleString()}</p>
              <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
                <TrendingUp size={16} /> +{selectedInvestment.farmerSuccessRate}%
              </span>
            </div>
          </div>

          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedInvestment.history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid var(--color-primary)',
                    boxShadow: 'var(--shadow-md)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-main)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="var(--color-primary)"
                  strokeWidth={4}
                  dot={{ r: 6, fill: 'var(--color-primary)', strokeWidth: 2, stroke: 'var(--bg-surface)' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Investments List */}
        <div className="glass-panel" style={{ padding: '1.5rem', maxHeight: '500px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Your {t('investments')}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {portfolioWithDetails.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedInvestment(item)}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${selectedInvestment.id === item.id ? 'var(--color-primary)' : 'var(--border-color)'}`,
                  background: selectedInvestment.id === item.id ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-surface)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fluid)'
                }}
              >
                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                  <h4 style={{ color: selectedInvestment.id === item.id ? 'var(--color-primary-dark)' : 'var(--text-main)' }}>
                    {item.farmName}
                  </h4>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>+{item.growth}%</span>
                </div>
                <div className="flex-between" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>{item.sharesOwned} Shares</span>
                  <span>₹{item.currentValue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
