import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, MapPin, Tractor, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

export default function SignupModal({ isOpen, onClose, defaultRole = 'farmer' }) {
  const { t } = useTranslation();
  const { login } = React.useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(defaultRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    aadhaarNo: '',
    panNo: '',
    farmSize: '',
    state: '',
    crops: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: role.toUpperCase(),
        profile: role === 'farmer' ? {
          aadhaarNo: formData.aadhaarNo,
          panNo: formData.panNo,
          farmSize: formData.farmSize ? `${formData.farmSize} acres` : null,
          state: formData.state,
          crops: formData.crops.split(',').map(c => c.trim())
        } : {}
      };
      
      const res = await api.post('/auth/register', payload);
      login(res.user, res.token);
      onClose();
      // Redirect to the appropriate dashboard
      if (role.toLowerCase() === 'farmer') {
        window.location.href = '/farmer-dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay open">
      <div className="modal-content" style={{ display: 'flex', flexDirection: 'row', width: '900px', maxWidth: '95vw', background: 'var(--bg-surface)' }}>
        
        {/* Left Side: Branding */}
        <div style={{ flex: 1, background: 'var(--gradient-green)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '3rem', textAlign: 'center' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '80px', width: '80px', marginBottom: '1.5rem', objectFit: 'cover', borderRadius: '50%', backgroundColor: 'white', padding: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} onError={(e) => { e.target.style.display = 'none' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{t('create_new_user')}</h2>
          <p style={{ opacity: 0.9, lineHeight: 1.5 }}>
            Join CropStocks™ today to {role === 'farmer' ? 'tokenize your farm and raise capital directly.' : 'invest in high-yield agricultural produce.'}
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '30px' }}>
            <button 
              onClick={() => { setRole('farmer'); setStep(1); }} 
              style={{ padding: '0.5rem 1.5rem', borderRadius: '20px', border: 'none', background: role === 'farmer' ? 'white' : 'transparent', color: role === 'farmer' ? 'var(--color-primary-dark)' : 'white', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Farmer
            </button>
            <button 
              onClick={() => { setRole('investor'); setStep(1); }} 
              style={{ padding: '0.5rem 1.5rem', borderRadius: '20px', border: 'none', background: role === 'investor' ? 'white' : 'transparent', color: role === 'investor' ? 'var(--color-primary-dark)' : 'white', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Investor
            </button>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: 1, padding: '3rem 2.5rem', position: 'relative', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '90vh' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
          
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: 'var(--text-main)' }}>Sign Up as {role === 'farmer' ? 'Farmer' : 'Investor'}</h3>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '2rem' }}>
            <div style={{ height: '4px', flex: 1, background: step >= 1 ? 'var(--color-primary)' : 'var(--border-color)', borderRadius: '2px' }}></div>
            <div style={{ height: '4px', flex: 1, background: step >= 2 ? 'var(--color-primary)' : 'var(--border-color)', borderRadius: '2px' }}></div>
            {role === 'farmer' && <div style={{ height: '4px', flex: 1, background: step >= 3 ? 'var(--color-primary)' : 'var(--border-color)', borderRadius: '2px' }}></div>}
          </div>

          {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

          <form onSubmit={step === (role === 'farmer' ? 3 : 2) ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            
            {step === 1 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Basic Details</h4>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password (min 6 chars)" minLength={6} className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact & Identity</h4>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
                
                {role === 'farmer' && (
                  <>
                    <div style={{ position: 'relative' }}>
                      <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input required name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} type="text" placeholder="Aadhaar Number (12 digits)" pattern="\d{12}" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input required name="panNo" value={formData.panNo} onChange={handleChange} type="text" placeholder="PAN Number (e.g. ABCDE1234F)" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 3 && role === 'farmer' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Farm Details</h4>
                <div style={{ position: 'relative' }}>
                  <Tractor size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required name="farmSize" value={formData.farmSize} onChange={handleChange} type="number" step="0.1" placeholder="Farm Size (in Acres)" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required name="state" value={formData.state} onChange={handleChange} type="text" placeholder="State (e.g. Punjab, Gujarat)" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <Tractor size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input required name="crops" value={formData.crops} onChange={handleChange} type="text" placeholder="Main Crops (comma separated)" className="input-field" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
              {step > 1 && (
                <button type="button" onClick={handlePrev} className="btn btn-outline" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                {step === (role === 'farmer' ? 3 : 2) ? (
                  loading ? 'Creating Account...' : 'Complete Sign Up'
                ) : (
                  <>Next <ChevronRight size={18} /></>
                )}
              </button>
            </div>
            
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              By creating an account, you agree to our Terms of Service.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
