import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function FarmerRegister() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    aadhaar: '', pan: '',
    farmSize: '', state: '', crops: ''
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }

    setLoading(true);
    setError('');
    try {
      const data = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'FARMER'
      });
      login(data.user, data.token);
      navigate('/farmer/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto glass-card p-8 animate-slide-up">
        <h2 className="text-3xl font-extrabold text-brand-dark text-center mb-8 font-heading">
          Farmer Registration
        </h2>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-gray-600 font-medium">
            <span className={step >= 1 ? 'text-brand-green font-bold' : ''}>Account</span>
            <span className={step >= 2 ? 'text-brand-green font-bold' : ''}>KYC</span>
            <span className={step >= 3 ? 'text-brand-green font-bold' : ''}>Farm Details</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-brand-green h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" required value={form.name} onChange={update('name')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green" />
                <input type="email" placeholder="Email Address" required value={form.email} onChange={update('email')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green" />
                <input type="tel" placeholder="Phone Number" value={form.phone} onChange={update('phone')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green" />
                <input type="password" placeholder="Password (min 6 characters)" required minLength={6} value={form.password} onChange={update('password')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold mb-4">KYC Verification</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Aadhaar Number" value={form.aadhaar} onChange={update('aadhaar')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
                <input type="text" placeholder="PAN Number" value={form.pan} onChange={update('pan')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:border-brand-green transition-colors">
                  📄 Upload Aadhaar Card Document (placeholder)
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold mb-4">Farm Details</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Farm Size (e.g., 5 acres)" value={form.farmSize} onChange={update('farmSize')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
                <select value={form.state} onChange={update('state')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green">
                  <option value="">Select State</option>
                  <option value="MH">Maharashtra</option>
                  <option value="PB">Punjab</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="KA">Karnataka</option>
                  <option value="GJ">Gujarat</option>
                </select>
                <input type="text" placeholder="Primary Crops Grown" value={form.crops} onChange={update('crops')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-outline">
                Back
              </button>
            )}
            <button type="submit" disabled={loading} className="btn-primary ml-auto disabled:opacity-50">
              {loading ? 'Registering...' : step === 3 ? 'Complete Registration' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

