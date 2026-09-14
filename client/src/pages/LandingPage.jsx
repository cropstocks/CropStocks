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
        background: 'var(--bg-main)',
        padding: '2rem 0'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'revert', gap: '4rem', '@media (minWidth: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' }, display: 'flex', flexWrap: 'wrap' }}>

          {/* Left Side: Farmer Image Card */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ position: 'relative', width: '100%', maxWidth: '500px', overflow: 'hidden', padding: '1rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '450px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${heroImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.85)'
                }} />
                {/* Overlay text on image */}
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'var(--glass-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(8px)' }}>
                  <h3 style={{ color: 'var(--text-main)', marginBottom: '0.2rem' }}>Verified Farms</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Direct investments in agricultural growth.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Info & CTA */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-primary-dark)', lineHeight: 1.1 }}>
                {t('hero_title')}
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', opacity: 0.9, lineHeight: 1.6 }}>
                {t('hero_subtitle')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                {t('start_investing')}
              </button>
              <button className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                {t('raise_capital')}
              </button>
            </div>
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
