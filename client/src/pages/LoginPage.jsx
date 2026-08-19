import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LocaleContext } from '../context/LocaleContext';
import { api } from '../services/api';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { t } = useContext(LocaleContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (code !== '113300660808') {
      setError('Invalid admin code');
      return;
    }

    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email: 'admin@cropstocks.in', password: 'admin123' });
      login(data.user, data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-card p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brand-dark font-heading">
            Admin Login
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
            <label className="block text-sm font-medium text-gray-700">Admin Code</label>
            <input
              type="password"
              required
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
              placeholder="Enter Admin Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

