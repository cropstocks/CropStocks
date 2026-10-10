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

  const vendorLinks = [
    { to: '/cropmart/seller/dashboard', label: 'Seller Dashboard' },
  ];

  const roleLinks = user?.role === 'FARMER' ? farmerLinks
    : user?.role === 'INVESTOR' ? investorLinks
    : user?.role === 'ADMIN' ? adminLinks
    : user?.role === 'VENDOR' ? vendorLinks : [];

  return (
    <nav className="bg-[#2a2a2a] shadow-lg sticky top-0 z-50 print:hidden text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img src="/homepage-logo.png" alt="CropStocks™" className="h-12 w-auto object-contain" />
            <span className="font-bold text-2xl tracking-tight hidden sm:block">CropStocks™</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-yellow-400 text-sm font-semibold transition-colors">
              Home
            </Link>
            <Link to="/marketplace" className="text-white hover:text-yellow-400 text-sm font-semibold transition-colors">
              {t('marketplace')}
            </Link>
            <Link to="/cropmart" className="text-white hover:text-yellow-400 text-sm font-semibold transition-colors flex items-center gap-1">
              🛒 CropMart
            </Link>

            {user ? (
              <>
                {roleLinks.map(link => (
                  <Link key={link.to} to={link.to} className="text-white hover:text-yellow-400 text-sm font-semibold transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-3 border-l border-white/20 pl-6 ml-2">
                  <select
                    value={locale}
                    onChange={(e) => changeLocale(e.target.value)}
                    className="text-white bg-transparent hover:text-yellow-400 text-sm font-medium cursor-pointer outline-none appearance-none"
                  >
                    <option value="en" className="text-black">EN</option>
                    <option value="hi" className="text-black">HI</option>
                    <option value="gu" className="text-black">GU</option>
                  </select>
                  <span className="text-xs bg-white/10 text-white px-3 py-1 rounded-full font-semibold border border-white/20">
                    {user.name} ({user.role})
                  </span>
                  <button onClick={logout} className="text-white hover:text-red-400 text-sm font-semibold transition-colors ml-2">
                    {t('logout')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/#how-it-works" className="text-white hover:text-yellow-400 text-sm font-semibold transition-colors">How it Works</Link>
                <Link to="/#about" className="text-white hover:text-yellow-400 text-sm font-semibold transition-colors">About Us</Link>
                
                <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
                  <select
                    value={locale}
                    onChange={(e) => changeLocale(e.target.value)}
                    className="text-white bg-transparent hover:text-yellow-400 text-sm font-medium cursor-pointer outline-none appearance-none"
                  >
                    <option value="en" className="text-black">EN</option>
                    <option value="hi" className="text-black">HI</option>
                    <option value="gu" className="text-black">GU</option>
                  </select>
                  
                  <Link to="/login" className="text-white hover:text-yellow-400 text-sm font-semibold transition-colors">
                    {t('login')}
                  </Link>
                  <Link to="/register/investor" className="bg-[#348a21] hover:bg-[#286f18] text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
                    Get Started Now
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-yellow-400">
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
        <div className="md:hidden border-t border-white/10 bg-[#2a2a2a]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/marketplace" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 hover:text-yellow-400">
              {t('marketplace')}
            </Link>
            <Link to="/cropmart" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 hover:text-yellow-400 flex items-center gap-1">
              🛒 CropMart
            </Link>
            {user ? (
              <>
                {roleLinks.map(link => (
                  <Link key={link.to} to={link.to} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 hover:text-yellow-400">
                    {link.label}
                  </Link>
                ))}
                <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-white/10">
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 hover:text-yellow-400">
                  {t('login')}
                </Link>
                <Link to="/register/investor" className="block px-3 py-2 rounded-md text-base font-medium text-brand-green hover:bg-white/10">
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
