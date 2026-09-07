import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../context/LocaleContext';
import { api } from '../services/api';

function MarketTicker({ listings }) {
  if (!listings.length) return null;
  return (
    <div className="bg-gray-900 border-b border-gray-700 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center h-10">
        <span className="text-xs text-gray-400 font-bold px-4 border-r border-gray-700 whitespace-nowrap">LIVE MARKET</span>
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-marquee space-x-8 px-4">
            {listings.concat(listings).map((l, i) => {
              const changePercent = l.ndviScore ? ((l.ndviScore - 0.5) * 20).toFixed(1) : '0.0';
              const isPositive = parseFloat(changePercent) >= 0;
              return (
                <div key={i} className="flex items-center space-x-2 whitespace-nowrap text-xs">
                  <span className="text-white font-bold">{l.produceName?.toUpperCase()}</span>
                  <span className="text-gray-300">₹{l.stockPrice?.toLocaleString()}</span>
                  <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
                    {isPositive ? '▲' : '▼'} {Math.abs(changePercent)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { t } = useContext(LocaleContext);
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState({ totalRaised: 0, farmers: 0, investors: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get('/listings');
        const items = Array.isArray(data) ? data : (data.listings || []);
        setListings(items);
        const totalRaised = items.reduce((sum, l) => sum + (l.capitalRaised || 0), 0);
        const uniqueFarmers = new Set(items.map(l => l.farmerId)).size;
        setStats({ totalRaised, farmers: uniqueFarmers, investors: uniqueFarmers * 2 }); // estimate
      } catch (err) {
        // API not available, use demo data
        setStats({ totalRaised: 435000, farmers: 3, investors: 2 });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark overflow-hidden">
      <MarketTicker listings={listings} />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-green to-brand-gold opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        
        <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40 text-center animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
            {t('hero_title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {t('hero_subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Link to="/register/investor" className="btn-primary text-lg px-8 py-3 w-full sm:w-auto">
              Start Investing
            </Link>
            <Link to="/register/farmer" className="bg-white text-brand-green font-bold text-lg px-8 py-3 rounded-md border-2 border-brand-green hover:bg-green-50 transition-colors w-full sm:w-auto shadow">
              Raise Capital
            </Link>
            <Link to="/marketplace" className="text-sm font-semibold leading-6 text-white hover:text-brand-green transition-colors mt-2 sm:mt-0">
              {t('explore_market')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="bg-gray-900/50 border-y border-gray-700 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-brand-green font-heading">₹{(stats.totalRaised / 100000).toFixed(1)}L</p>
              <p className="mt-1 text-sm text-gray-400">Capital Raised</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-brand-gold font-heading">{stats.farmers}+</p>
              <p className="mt-1 text-sm text-gray-400">Verified Farmers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-blue-400 font-heading">{stats.investors}+</p>
              <p className="mt-1 text-sm text-gray-400">Active Investors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Listings Preview */}
      {listings.length > 0 && (
        <div className="bg-gray-900/30 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8 font-heading">📈 Trending Farm Stocks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listings.slice(0, 3).map(l => {
                const changePercent = l.ndviScore ? ((l.ndviScore - 0.5) * 20).toFixed(1) : '0.0';
                const isPositive = parseFloat(changePercent) >= 0;
                return (
                  <Link key={l.id} to={`/listing/${l.id}`} className="bg-gray-800/80 backdrop-blur rounded-xl p-6 border border-gray-700 hover:border-brand-green transition-all hover:scale-105">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-white font-bold text-lg">{l.produceName}</p>
                        <p className="text-gray-400 text-xs">{l.region} • {l.farmer?.name}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        l.vegetationStatus === 'Excellent' ? 'bg-green-900 text-green-300' :
                        l.vegetationStatus === 'Good' ? 'bg-lime-900 text-lime-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {l.vegetationStatus || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-white">₹{l.stockPrice?.toLocaleString()}</p>
                      <span className={`text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? '▲' : '▼'} {Math.abs(changePercent)}%
                      </span>
                    </div>
                    <div className="mt-3 w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-brand-green h-1.5 rounded-full" style={{ width: `${Math.min((l.capitalRaised / l.capitalRequired) * 100, 100)}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{((l.capitalRaised / l.capitalRequired) * 100).toFixed(0)}% funded • {l.expectedReturn}% return</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-green">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Satellite-Powered Agricultural Investing</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col glass-card p-8 bg-brand-light">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 font-heading">
                  <span className="text-3xl">🧑‍🌾</span> Farmers List Crops
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-7 text-gray-600">
                  <p>Verified farmers list their capital needs with GPS coordinates for satellite monitoring.</p>
                </dd>
              </div>
              <div className="flex flex-col glass-card p-8 bg-brand-light">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 font-heading">
                  <span className="text-3xl">🛰️</span> Satellite Monitors
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-7 text-gray-600">
                  <p>NDVI satellite imagery tracks crop health. Lush farms get higher stock prices.</p>
                </dd>
              </div>
              <div className="flex flex-col glass-card p-8 bg-brand-light">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 font-heading">
                  <span className="text-3xl">💰</span> Investors Fund
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-7 text-gray-600">
                  <p>Browse verified listings with real-time vegetation health data and invest with confidence.</p>
                </dd>
              </div>
              <div className="flex flex-col glass-card p-8 bg-brand-light">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 font-heading">
                  <span className="text-3xl">📈</span> Shared Growth
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-7 text-gray-600">
                  <p>Upon harvest, profits are distributed. Healthier crops → higher returns for everyone.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
