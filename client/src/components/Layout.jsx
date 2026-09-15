import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, LogIn, X, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

import SignupModal from './SignupModal';

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('light');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [loginRole, setLoginRole] = useState('investor');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOpenLogin = (e) => {
      if (e.detail && e.detail.role) {
        setLoginRole(e.detail.role);
      }
      setIsLoginOpen(true);
    };
    window.addEventListener('open-login', handleOpenLogin);
    return () => window.removeEventListener('open-login', handleOpenLogin);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const { login, user, logout } = React.useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      alert('Please enter email and password');
      return;
    }
    
    try {
      const res = await api.post('/auth/login', { email: emailInput, password: passwordInput });
      login(res.user, res.token);
      setIsLoginOpen(false);
      setEmailInput('');
      setPasswordInput('');
      
      if (res.user.role === 'FARMER') {
        navigate('/farmer-dashboard');
      } else if (res.user.role === 'INVESTOR') {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={`app-container ${isLoginOpen ? 'blur-background' : ''}`}>
      <style>{`
        .blur-background > header,
        .blur-background > main {
          filter: blur(8px);
          pointer-events: none;
          transition: filter 0.3s ease;
        }
      `}</style>

      {/* Navbar */}
      <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
        <div className="container flex-between" style={{ height: '70px' }}>
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/">
              <img src="/logo.png" alt="CropStocks" style={{ height: '40px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
            </Link>
          </div>

          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleTheme} className="icon-btn" style={{ background: 'transparent', color: 'var(--text-main)', border: 'none', cursor: 'pointer' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div style={{ position: 'relative' }}>
              <button onClick={() => setLangOpen(!langOpen)} className="icon-btn" style={{ background: 'transparent', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '5px', border: 'none', cursor: 'pointer' }}>
                <Globe size={20} /> {i18n.language.toUpperCase()}
              </button>
              {langOpen && (
                <div className="glass-panel" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '100px', zIndex: 110 }}>
                  <button onClick={() => changeLanguage('en')} style={{ background: 'transparent', color: 'var(--text-main)', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '5px' }}>English</button>
                  <button onClick={() => changeLanguage('hi')} style={{ background: 'transparent', color: 'var(--text-main)', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '5px' }}>हिंदी</button>
                  <button onClick={() => changeLanguage('gu')} style={{ background: 'transparent', color: 'var(--text-main)', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '5px' }}>ગુજરાતી</button>
                </div>
              )}
            </div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{user.name}</span>
                <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px' }}>
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <button onClick={() => { setLoginRole('investor'); setIsLoginOpen(true); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LogIn size={18} /> {t('login')}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ minHeight: 'calc(100vh - 70px)' }}>
        {children}
      </main>

      {/* Login Modal */}
      <div className={`modal-overlay ${isLoginOpen ? 'open' : ''}`}>
        <div className="modal-content" style={{ display: 'flex', flexDirection: 'row', width: '900px', maxWidth: '95vw', background: 'var(--bg-surface)' }}>

          {/* Left Side: Branding (Green Gradient) */}
          <div style={{ flex: 1, background: 'var(--gradient-green)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '3rem', textAlign: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '100px', marginBottom: '1.5rem', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{t('app_name')}</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.5 }}>
              A transparent stock market for agricultural produce.
            </p>
          </div>

          {/* Right Side: Form */}
          <div style={{ flex: 1, padding: '3rem 2.5rem', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <button onClick={() => setIsLoginOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: 'var(--text-main)' }}>{loginRole === 'investor' ? 'Investor Login' : 'Farmer Login'}</h2>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input required type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder={t('email')} className="input-field" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
              </div>
              <div>
                <input required type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder={t('password')} className="input-field" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                  {t('sign_in')}
                </button>
              </div>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setLoginRole(loginRole === 'investor' ? 'farmer' : 'investor')}>
                {loginRole === 'investor' ? 'Or login as Farmer' : 'Or login as Investor'}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span style={{ padding: '0 10px' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              </div>

              <button onClick={() => handleLogin(loginRole)} className="btn btn-outline" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                {t('sign_in_google')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <button onClick={() => { setIsLoginOpen(false); setIsSignupOpen(true); }} style={{ background: 'transparent', color: 'var(--color-primary)', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  {t('create_new_user')}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        defaultRole={loginRole}
      />
    </div>
  );
}
