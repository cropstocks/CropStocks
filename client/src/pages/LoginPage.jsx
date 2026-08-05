import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LocaleContext } from '../context/LocaleContext';
import { api } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { t } = useContext(LocaleContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email, password });
      login(data.user, data.token);
      if (data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (data.user.role === 'FARMER') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/investor/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-card p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brand-dark font-heading">
            {t('login')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to CropStocks
          </p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              required
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
              placeholder="farmer@example.com or investor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
          <p className="font-semibold mb-1">Demo Accounts:</p>
          <p>🧑‍🌾 Farmer: farmer@example.com / farmer123</p>
          <p>💰 Investor: investor@example.com / investor123</p>
          <p>👑 Admin: admin@cropstocks.in / admin123</p>
        </div>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register/investor" className="font-medium text-brand-green hover:text-brand-green-dark">
            Register as Investor
          </Link>
          <span className="text-gray-600"> or </span>
          <Link to="/register/farmer" className="font-medium text-brand-green hover:text-brand-green-dark">
            Farmer
          </Link>
        </div>
      </div>
    </div>
  );
}

