import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../context/LocaleContext';

export default function LandingPage() {
  const { t } = useContext(LocaleContext);

  return (
    <div className="min-h-screen bg-brand-dark overflow-hidden">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-green to-brand-gold opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
            {t('hero_title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {t('hero_subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/register/investor" className="btn-primary text-lg px-8 py-3">
              {t('get_started')}
            </Link>
            <Link to="/marketplace" className="text-sm font-semibold leading-6 text-white hover:text-brand-green transition-colors">
              {t('explore_market')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-green">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Empowering Farmers, Rewarding Investors</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col glass-card p-8 bg-brand-light">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900 font-heading">
                  <span className="text-3xl">🧑‍🌾</span> Farmers List Crops
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Verified farmers list their upcoming season's capital needs for specific crops with estimated returns.</p>
                </dd>
              </div>
              <div className="flex flex-col glass-card p-8 bg-brand-light">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900 font-heading">
                  <span className="text-3xl">💰</span> Investors Fund
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Investors browse verified listings and fund crops they believe in, earning potential high returns.</p>
                </dd>
              </div>
              <div className="flex flex-col glass-card p-8 bg-brand-light">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900 font-heading">
                  <span className="text-3xl">📈</span> Shared Growth
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Farmers get capital to grow without predatory loans. Upon harvest and sale, profits are distributed.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
