import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, LogIn, X } from 'lucide-react';
import logoUrl from '../assets/logo.png'; // Assuming logo is here or we'll use an icon if not found

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
        .blur-background > *:not(.modal-overlay) {
          filter: blur(8px);
          pointer-events: none;
        }
      `}</style>

      {/* Navbar */}
      <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
        <div className="container flex-between" style={{ height: '70px' }}>
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoUrl} alt="Logo" style={{ height: '40px' }} onError={(e) => { e.target.style.display = 'none' }} />
            <Link to="/">
              <h2 style={{ color: 'var(--color-primary-dark)' }}>{t('app_name')}</h2>
            </Link>
          </div>

          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleTheme} className="icon-btn" style={{ background: 'transparent', color: 'var(--text-main)' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div style={{ position: 'relative' }}>
              <button onClick={() => setLangOpen(!langOpen)} className="icon-btn" style={{ background: 'transparent', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Globe size={20} /> {i18n.language.toUpperCase()}
              </button>
              {langOpen && (
                <div className="glass-panel" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '100px' }}>
                  <button onClick={() => changeLanguage('en')} style={{ background: 'transparent', color: 'var(--text-main)', textAlign: 'left' }}>English</button>
                  <button onClick={() => changeLanguage('hi')} style={{ background: 'transparent', color: 'var(--text-main)', textAlign: 'left' }}>हिंदी</button>
                  <button onClick={() => changeLanguage('gu')} style={{ background: 'transparent', color: 'var(--text-main)', textAlign: 'left' }}>ગુજરાતી</button>
                </div>
              )}
            </div>

            <button onClick={() => setIsLoginOpen(true)} className="btn btn-primary">
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
        <div className="modal-content">
          <div style={{ flex: 1, background: 'var(--gradient-green)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '2rem', textAlign: 'center' }}>
            <img src={logoUrl} alt="Logo" style={{ height: '80px', marginBottom: '1rem' }} onError={(e) => { e.target.style.display = 'none' }} />
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('app_name')}</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{t('hero_subtitle')}</p>
          </div>
          <div style={{ flex: 1, padding: '3rem 2rem', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <button onClick={() => setIsLoginOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem' }}>{t('login')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="email" placeholder={t('email')} className="input-field" />
              <input type="password" placeholder={t('password')} className="input-field" />

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => handleLogin(true)} className="btn btn-primary" style={{ flex: 1 }}>
                  Login (New User)
                </button>
                <button onClick={() => handleLogin(false)} className="btn btn-outline" style={{ flex: 1 }}>
                  Login (Old User)
                </button>
              </div>

              <div style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--text-muted)' }}>OR</div>

              <button onClick={() => handleLogin(true)} className="btn btn-outline" style={{ width: '100%' }}>
                {t('sign_in_google')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button style={{ background: 'transparent', color: 'var(--color-primary)', fontWeight: 600 }}>
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
