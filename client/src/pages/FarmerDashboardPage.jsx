import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle, TrendingUp, Package } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockPerformanceData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 7000 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 8000 },
];

export default function FarmerDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2>Farmer Portal</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage your listings and track harvest capital.</p>
        </div>
        <button className="btn btn-primary">
          <PlusCircle size={20} /> List New Farm
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={18} /> Active Listings
          </h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>2</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} /> Total Capital Raised
          </h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>₹1,250,000</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Capital Revenue Overview</h3>
        <div style={{ height: '350px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--bg-surface)', color: 'var(--text-main)' }} />
              <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
