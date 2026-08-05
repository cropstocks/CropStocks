import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function InvestorRegister() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'INVESTOR'
      });
      login(data.user, data.token);
      navigate('/investor/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto glass-card p-8 animate-slide-up">
        <h2 className="text-3xl font-extrabold text-brand-dark text-center mb-8 font-heading">
          Investor Registration
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" required value={form.name} onChange={update('name')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            <input type="email" placeholder="Email Address" required value={form.email} onChange={update('email')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            <input type="password" placeholder="Password (min 6 characters)" required minLength={6} value={form.password} onChange={update('password')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-brand-blue mb-2">💰 Wallet Setup</h4>
              <p className="text-xs text-gray-600 mb-2">Your wallet will be credited with ₹1,00,000 demo balance to start investing.</p>
              <button type="button" className="text-sm bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 w-full text-left transition-colors">
                💳 Link Bank Account (Razorpay / UPI — Placeholder)
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

