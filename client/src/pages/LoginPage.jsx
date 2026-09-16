import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email, password });
      login(data.user, data.token);
      // Route based on role
      if (data.user.role === 'FARMER') navigate('/farmer/dashboard');
      else if (data.user.role === 'INVESTOR') navigate('/investor/dashboard');
      else if (data.user.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-card p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brand-dark font-heading">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your CropStocks™ account
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-lg disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 border-t pt-6 space-y-3">
          <p className="text-center text-sm text-gray-600">Don't have an account?</p>
          <div className="flex gap-3">
            <Link to="/register/farmer" className="flex-1 text-center py-2.5 border-2 border-brand-green text-brand-green rounded-lg font-medium hover:bg-green-50 transition-colors">
              🧑‍🌾 I'm a Farmer
            </Link>
            <Link to="/register/investor" className="flex-1 text-center py-2.5 border-2 border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              💰 I'm an Investor
            </Link>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 p-3 rounded-lg border">
          <p className="text-xs text-gray-500 font-medium mb-1">Demo Accounts:</p>
          <p className="text-xs text-gray-400">Farmer: rajesh@example.com / password123</p>
          <p className="text-xs text-gray-400">Investor: vikram@example.com / password123</p>
        </div>
      </div>
    </div>
  );
}
