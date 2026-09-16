import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, ArrowRight, Play, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '../assets/hero.png';

export default function LandingPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white">
      
      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center flex flex-col" 
        style={{ backgroundImage: `url(/bg-hero.png)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Transparent Header */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 flex items-center justify-between px-6 lg:px-12 text-white ${isScrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg py-4' : 'bg-transparent border-b border-white/20 py-6'}`}>
          <div className="flex items-center gap-2">
            <img 
              src="/homepage-logo.png" 
              alt="CropStocks™ Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-2xl tracking-tight">CropStocks™</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-yellow-400 transition-colors">Home</button>
            <a href="/marketplace" className="hover:text-yellow-400 transition-colors">Marketplace</a>
            <a href="#how-it-works" className="hover:text-yellow-400 transition-colors">How it Works</a>
            <a href="#about" className="hover:text-yellow-400 transition-colors">About Us</a>
            <a href="mailto:support@cropstocks.in" className="hover:text-yellow-400 transition-colors">Contact Us</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button onClick={() => window.dispatchEvent(new CustomEvent('toggle-theme'))} className="text-white hover:text-yellow-400 transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('toggle-lang'))} className="text-white hover:text-yellow-400 transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-login'))} className="bg-[#348a21] hover:bg-[#286f18] text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
              Get Started Now <ArrowRight size={16} className="bg-[#fbbf24] text-white rounded-full p-0.5" />
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center pb-20">
          <div className="inline-block border border-yellow-400 text-yellow-400 rounded-full px-5 py-1.5 text-xs font-semibold mb-6 uppercase tracking-wider w-max">
            Transparent Agricultural Marketplace
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Invest in Local Farms<br />& Shared Growth
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mb-10 leading-relaxed font-light">
            Direct investments in agricultural growth. When farmers succeed, you succeed. Harvest profits are distributed securely while ensuring global food security.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-login'))} className="bg-[#348a21] hover:bg-[#286f18] text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg">
              Start Investing <ArrowRight size={18} className="bg-[#fbbf24] text-white rounded-full p-0.5" />
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-login'))} className="border border-white hover:border-yellow-400 hover:text-yellow-400 text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-all">
              Raise Capital <ArrowRight size={18} className="bg-[#fbbf24] text-white rounded-full p-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Yellow Banner Section */}
      <div className="bg-[#fbbf24] py-8 relative overflow-hidden shadow-inner">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" alt="Client" />
              <img src="https://i.pravatar.cc/100?img=2" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" alt="Client" />
              <img src="https://i.pravatar.cc/100?img=3" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" alt="Client" />
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900 leading-tight">10,000+ Verified</div>
              <div className="font-bold text-xl text-gray-900 leading-tight">Farmers & Investors</div>
            </div>
          </div>

          <div className="flex items-center justify-center relative">
            <div className="w-24 h-24 rounded-full border border-dashed border-gray-900 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '10s' }}>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#348a21] text-white w-12 h-12 rounded-full flex items-center justify-center">
                <ArrowRight className="-rotate-45" size={24} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-bold text-xl text-gray-900 leading-tight">Secure, Monitored,</div>
              <div className="font-bold text-xl text-gray-900 leading-tight">and Profitable</div>
            </div>
            <div className="relative w-24 h-16 rounded-lg overflow-hidden shadow-md group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1595858178877-3e33f9d50cc1?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" alt="Video thumbnail" />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                <Play className="text-[#fbbf24] fill-[#fbbf24]" size={24} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="inline-block border border-[#348a21] text-[#348a21] rounded-full px-4 py-1 text-xs font-bold mb-4 uppercase tracking-wider">
                Key Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-xl">
                Why Invest with CropStocks™
              </h2>
            </div>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#348a21] hover:text-[#348a21] transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#348a21] flex items-center justify-center text-white shadow-md hover:bg-[#286f18] transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-[#348a21] rounded-2xl p-4 text-white group cursor-pointer transition-transform hover:-translate-y-2 duration-300 shadow-xl">
              <div className="rounded-xl overflow-hidden mb-6 h-48">
                <img src="https://images.unsplash.com/photo-1592982537447-6f2c395e5927?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Satellite" />
              </div>
              <div className="px-2 pb-4">
                <div className="inline-block border border-white/30 rounded-full px-3 py-1 text-[10px] font-bold mb-3 uppercase tracking-wider">
                  Technology
                </div>
                <h3 className="text-2xl font-bold mb-3">Satellite Monitoring</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  Track crop health in real-time with NDVI satellite imagery ensuring your investments are actively growing.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#348a21] rounded-2xl p-4 text-white group cursor-pointer transition-transform hover:-translate-y-2 duration-300 shadow-xl">
              <div className="rounded-xl overflow-hidden mb-6 h-48">
                <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Farmer" />
              </div>
              <div className="px-2 pb-4">
                <div className="inline-block border border-white/30 rounded-full px-3 py-1 text-[10px] font-bold mb-3 uppercase tracking-wider">
                  Security
                </div>
                <h3 className="text-2xl font-bold mb-3">Verified Farmers</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  Every listing is vetted and tied directly to registered land records and farmer identities to ensure trust.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#348a21] rounded-2xl p-4 text-white group cursor-pointer transition-transform hover:-translate-y-2 duration-300 shadow-xl">
              <div className="rounded-xl overflow-hidden mb-6 h-48">
                <img src="https://images.unsplash.com/photo-1549429141-86e5893d98f7?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Growth" />
              </div>
              <div className="px-2 pb-4">
                <div className="inline-block border border-white/30 rounded-full px-3 py-1 text-[10px] font-bold mb-3 uppercase tracking-wider">
                  Returns
                </div>
                <h3 className="text-2xl font-bold mb-3">Shared Growth</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  When farmers succeed, you succeed. Harvest profits are distributed securely straight to your portfolio.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Recently Completed Section */}
      <section className="py-20 bg-[#fef8f3]">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
            <div className="max-w-xl">
              <div className="inline-block border border-[#348a21] text-[#348a21] rounded-full px-4 py-1 text-xs font-bold mb-4 uppercase tracking-wider">
                Recently Funded
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Recently Funded Farms
              </h2>
            </div>
            <p className="text-gray-500 max-w-md text-sm leading-relaxed">
              Discover farms that have recently reached their funding goals and are currently in the active growing cycle, monitored by our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Wheat - Punjab', img: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=400&auto=format&fit=crop' },
              { title: 'Soybean - MP', img: 'https://images.unsplash.com/photo-1592982537447-6f2c395e5927?q=80&w=400&auto=format&fit=crop' },
              { title: 'Cotton - Gujarat', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=400&auto=format&fit=crop' },
              { title: 'Rice - West Bengal', img: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=400&auto=format&fit=crop' }
            ].map((proj, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden h-[350px] shadow-lg cursor-pointer">
                <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={proj.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">{proj.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex gap-3">
             <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-[#348a21] hover:text-[#348a21] transition-colors">
               <ChevronLeft size={16} />
             </button>
             <button className="w-8 h-8 rounded-full bg-[#348a21] flex items-center justify-center text-white shadow-md hover:bg-[#286f18] transition-colors">
               <ChevronRight size={16} />
             </button>
          </div>
        </div>
      </section>

      {/* How We Do Agricultural Work Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                <video 
                  src="/TitleVideo.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="inline-block border border-[#348a21] text-[#348a21] rounded-full px-4 py-1 text-xs font-bold mb-4 uppercase tracking-wider">
                How It Works
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                From Investment to Harvest
              </h2>
              <p className="text-gray-500 mb-12 text-sm leading-relaxed max-w-md">
                CropStocks™ connects investors directly with vetted farmers, providing transparent tracking and secure returns while eliminating middlemen.
              </p>

              <div className="space-y-8">
                {[
                  { num: '01', title: 'Browse Verified Listings', desc: 'Explore vetted farms needing capital for the upcoming season.' },
                  { num: '02', title: 'Invest Capital', desc: 'Purchase shares in a farm\'s crop cycle securely through the platform.' },
                  { num: '03', title: 'Monitor Growth', desc: 'Track crop health via satellite NDVI and weekly farmer reports.' },
                  { num: '04', title: 'Receive Returns', desc: 'Once the harvest is sold, receive your share of the profits directly.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="text-4xl font-light text-gray-300 font-serif leading-none mt-1">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-500 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#112a14] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          
          <div className="inline-block border border-yellow-400 text-yellow-400 rounded-full px-4 py-1 text-xs font-bold mb-4 uppercase tracking-wider">
            Top Farmers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-16 max-w-2xl mx-auto">
            Meet Some of Our Successful Partners
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Rajesh Kumar', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
              { name: 'Amit Singh', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
              { name: 'Ramesh Patel', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop' },
              { name: 'Suresh Reddy', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop' }
            ].map((member, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden bg-gray-800 p-2 border border-white/10">
                <div className="rounded-xl overflow-hidden h-[300px]">
                  <img src={member.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={member.name} />
                </div>
                <div className="pt-4 pb-2">
                  <h3 className="font-bold text-lg text-white">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer / About Us teaser */}
      <section id="about" className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="inline-block border border-[#348a21] text-[#348a21] rounded-full px-4 py-1 text-xs font-bold mb-4 uppercase tracking-wider">
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Empowering Agriculture Through Investment
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-normal max-w-3xl mx-auto">
            CropStocks™ is India's premier agricultural marketplace, bridging the gap between hardworking farmers and forward-thinking investors. By replacing predatory middlemen with transparent, fractional crop funding, we empower farmers with upfront seasonal capital while enabling investors to earn returns directly from harvest yields. Backed by satellite NDVI tracking and verified land records, we make farm investing secure, profitable, and impactful.
          </p>
        </div>
      </section>

    </div>
  );
}
