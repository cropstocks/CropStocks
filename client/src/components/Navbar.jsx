import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LocaleContext } from '../context/LocaleContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { locale, changeLocale, t } = useContext(LocaleContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const farmerLinks = [
    { to: '/farmer/dashboard', label: 'Dashboard' },
    { to: '/farmer/satellite', label: '🛰️ Satellite' },
    { to: '/farmer/guidance', label: 'Guidance' },
  ];

  const investorLinks = [
    { to: '/investor/dashboard', label: 'Portfolio' },
    { to: '/marketplace', label: t('marketplace') },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Admin Panel' },
  ];

  const roleLinks = user?.role === 'FARMER' ? farmerLinks
    : user?.role === 'INVESTOR' ? investorLinks
    : user?.role === 'ADMIN' ? adminLinks : [];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="CropStocks™" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/marketplace" className="text-gray-600 hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
              {t('marketplace')}
            </Link>

            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="text-gray-600 bg-transparent hover:text-brand-green px-2 py-2 rounded-md text-sm font-medium cursor-pointer outline-none"
            >
              <option value="en">English</option>
              <option value="hi">Hinglish</option>
              <option value="gu">ગુજરાતી</option>
            </select>

            {user ? (
              <>
                {roleLinks.map(link => (
                  <Link key={link.to} to={link.to} className="text-gray-600 hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {link.label}
                  </Link>
                ))}
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  {user.role}
                </span>
                <button onClick={logout} className="btn-outline text-sm ml-2">
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t('login')}
                </Link>
                <Link to="/register/investor" className="btn-primary text-sm">
                  Start Investing
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 hover:text-brand-green">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/marketplace" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              {t('marketplace')}
            </Link>
            {user ? (
              <>
                {roleLinks.map(link => (
                  <Link key={link.to} to={link.to} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                    {link.label}
                  </Link>
                ))}
                <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50">
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                  {t('login')}
                </Link>
                <Link to="/register/farmer" className="block px-3 py-2 rounded-md text-base font-medium text-brand-green hover:bg-gray-50">
                  Register as Farmer
                </Link>
                <Link to="/register/investor" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50">
                  Start Investing
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
