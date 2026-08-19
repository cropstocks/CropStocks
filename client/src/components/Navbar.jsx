import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LocaleContext } from '../context/LocaleContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { locale, changeLocale, t } = useContext(LocaleContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center h-16 overflow-hidden w-48">
              <img src="/logo.png" alt="CropStocks Logo" className="h-28 md:h-32 w-auto object-contain -ml-4" />
            </Link>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-brand-green bg-green-50 px-2 py-1 rounded-full border border-green-200 whitespace-nowrap">
              in Development
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => alert('In Production')} className="text-gray-700 hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium text-left">
              {t('marketplace')}
            </button>
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="text-gray-700 bg-transparent hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="gu">ગુજરાતી</option>
            </select>

            {user ? (
              <>
                <Link 
                  to={user.role === 'FARMER' ? '/farmer/dashboard' : user.role === 'ADMIN' ? '/admin/dashboard' : '/investor/dashboard'} 
                  className="text-gray-700 hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t('dashboard')}
                </Link>
                <Link to="/documents" className="text-gray-700 hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium">
                  Legal Docs
                </Link>
                <button onClick={logout} className="btn-outline text-sm">
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-brand-green px-3 py-2 rounded-md text-sm font-medium text-left">
                  {t('login')}
                </Link>
                <a href="https://forms.gle/86m7SFE6ZJudK16F9" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                  Fill Survey
                </a>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-brand-green"
            >
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => alert('In Production')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50">
              {t('marketplace')}
            </button>
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50 outline-none bg-transparent"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="gu">ગુજરાતી</option>
            </select>

            {user ? (
              <>
                <Link to={user.role === 'FARMER' ? '/farmer/dashboard' : user.role === 'ADMIN' ? '/admin/dashboard' : '/investor/dashboard'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50">
                  {t('dashboard')}
                </Link>
                <Link to="/documents" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50">
                  Legal Docs
                </Link>
                <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-green font-bold hover:bg-gray-50">
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50">
                  {t('login')}
                </Link>
                <a href="https://forms.gle/86m7SFE6ZJudK16F9" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-brand-green font-bold hover:bg-gray-50">
                  Fill Survey
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
