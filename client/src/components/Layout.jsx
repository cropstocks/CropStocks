import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, LogIn, X } from 'lucide-react';
import logoUrl from '../assets/logo.png';

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('light');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const handleLogin = (isNewUser) => {
    setIsLoginOpen(false);
    if (isNewUser) {
      navigate('/investments');
    } else {
      navigate('/dashboard');
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
            <img src={logoUrl} alt="Logo" style={{ height: '40px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
            <Link to="/">
              <h2 style={{ color: 'var(--color-primary-dark)' }}>{t('app_name')}</h2>
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

            <button onClick={() => setIsLoginOpen(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogIn size={18} /> {t('login')}
            </button>
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
            <img src={logoUrl} alt="Logo" style={{ height: '100px', marginBottom: '1.5rem', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
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
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: 'var(--text-main)' }}>{t('login')}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input type="email" placeholder={t('email')} className="input-field" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
              </div>
              <div>
                <input type="password" placeholder={t('password')} className="input-field" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button onClick={() => handleLogin(true)} className="btn btn-primary" style={{ flex: 1, padding: '1rem' }}>
                  {t('sign_in')} (New Route)
                </button>
                <button onClick={() => handleLogin(false)} className="btn btn-outline" style={{ flex: 1, padding: '1rem' }}>
                  {t('sign_in')} (Old Route)
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span style={{ padding: '0 10px' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              </div>

              <button onClick={() => handleLogin(true)} className="btn btn-outline" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '20px' }} />
                {t('sign_in_google')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button onClick={() => handleLogin(true)} style={{ background: 'transparent', color: 'var(--color-primary)', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  {t('create_new_user')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
