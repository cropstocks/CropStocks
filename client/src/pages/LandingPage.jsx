import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import heroImg from '../assets/hero.png';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Image / Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: -2
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gradient-green)',
          opacity: 0.6,
          zIndex: -1
        }} />

        <div className="container" style={{ textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
            {t('hero_title')}
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem', opacity: 0.9, lineHeight: 1.6 }}>
            {t('hero_subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              {t('start_investing')}
            </button>
            <button className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem', color: 'white', borderColor: 'white' }}>
              {t('raise_capital')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', color: 'var(--color-primary-dark)' }}>
            {t('features')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
                <Leaf size={30} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Satellite Monitoring</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Track crop health in real-time with NDVI satellite imagery ensuring your investments are growing.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
                <ShieldCheck size={30} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Verified Farmers</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Every listing is vetted and tied directly to registered land records and farmer identities.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
                <TrendingUp size={30} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Shared Growth</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>When farmers succeed, you succeed. Harvest profits are distributed securely.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
                <Users size={30} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Community Driven</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Join thousands of investors supporting local agriculture and global food security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
