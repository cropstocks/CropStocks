import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function FarmerRegister() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    aadhaar: '', pan: '',
    farmSize: '', state: '', crops: '',
    latitude: '', longitude: ''
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
        setLocating(false);
      },
      () => {
        setError('Unable to retrieve your location. Please enter coordinates manually.');
        setLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 4) { setStep(step + 1); return; }

    setLoading(true);
    setError('');
    try {
      const data = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: 'FARMER',
        profile: {
          aadhaarNo: form.aadhaar,
          panNo: form.pan,
          farmSize: form.farmSize,
          state: form.state,
          crops: form.crops,
          latitude: form.latitude,
          longitude: form.longitude
        }
      });
      login(data.user, data.token);
      navigate('/farmer/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Account', 'KYC', 'Farm Details', 'Farm Location'];

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto glass-card p-8 animate-slide-up">
        <h2 className="text-3xl font-extrabold text-brand-dark text-center mb-2 font-heading">
          🧑‍🌾 Farmer Registration
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">Join CropStocks™ to raise capital and get satellite monitoring</p>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-xs text-gray-500 font-medium">
            {steps.map((s, i) => (
              <span key={s} className={step >= i + 1 ? 'text-brand-green font-bold' : ''}>{s}</span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-brand-green h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
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
                <input type="tel" placeholder="Phone Number (10 digits)" value={form.phone} onChange={update('phone')} pattern="[6-9][0-9]{9}" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green" />
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
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                </select>
                <input type="text" placeholder="Primary Crops Grown (e.g. Wheat, Rice)" value={form.crops} onChange={update('crops')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold mb-2">Farm Location</h3>
              <p className="text-sm text-gray-500 mb-4">
                We use your farm's GPS coordinates to fetch satellite imagery and monitor crop health via NDVI analysis. This directly impacts your listing's stock price.
              </p>
              <div className="space-y-4">
                <button 
                  type="button" 
                  onClick={handleGetLocation} 
                  disabled={locating}
                  className="w-full py-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-700 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  {locating ? '📡 Detecting Location...' : '📍 Get Current Location Automatically'}
                </button>
                <div className="text-center text-xs text-gray-400">— or enter manually —</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input type="number" step="any" placeholder="e.g. 26.8467" value={form.latitude} onChange={update('latitude')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input type="number" step="any" placeholder="e.g. 80.9462" value={form.longitude} onChange={update('longitude')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
                  </div>
                </div>
                {form.latitude && form.longitude && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-sm text-green-700">
                    ✅ Location captured: {form.latitude}°N, {form.longitude}°E
                  </div>
                )}
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-xs text-yellow-700">
                  <strong>Why do we need this?</strong> Satellite imagery of your farm is used to calculate the Vegetation Health Index (NDVI). Healthier farms get a higher stock price, attracting more investors.
                </div>
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
              {loading ? 'Registering...' : step === 4 ? 'Complete Registration' : 'Next →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
