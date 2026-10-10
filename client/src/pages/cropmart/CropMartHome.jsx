import React from 'react';
import { Link } from 'react-router-dom';
import MartSearchBar from '../../components/cropmart/MartSearchBar';
import MartCategoryCard from '../../components/cropmart/MartCategoryCard';
import MartProductCard from '../../components/cropmart/MartProductCard';
import { ChevronRight } from 'lucide-react';

const categories = [
  { slug: 'machinery', name: 'Machinery', icon: '🚜' },
  { slug: 'seeds', name: 'Seeds', icon: '🌱' },
  { slug: 'fertilizers', name: 'Fertilizers', icon: '🧪' },
  { slug: 'tools', name: 'Farm Tools', icon: '⛏️' },
  { slug: 'feed', name: 'Animal Feed', icon: '🌾' },
  { slug: 'packaging', name: 'Packaging', icon: '📦' },
  { slug: 'rental', name: 'Rental', icon: '⏱️' },
  { slug: 'used', name: 'Used Equipment', icon: '♻️' }
];

const featuredProducts = [
  { id: '1', title: 'Mahindra 265 DI Power Plus', price: 480000, discount: 5, rating: 4.8, reviewsCount: 120, image: 'https://via.placeholder.com/300?text=Tractor', sellerLocation: 'Punjab', condition: 'New' },
  { id: '2', title: 'Premium Wheat Seeds - 50kg', price: 2500, discount: 10, rating: 4.5, reviewsCount: 45, image: 'https://via.placeholder.com/300?text=Seeds', sellerLocation: 'Haryana', condition: 'New' },
  { id: '3', title: 'Organic Urea Fertilizer', price: 800, discount: 0, rating: 4.2, reviewsCount: 89, image: 'https://via.placeholder.com/300?text=Fertilizer', sellerLocation: 'Gujarat', condition: 'New' },
  { id: '4', title: 'Heavy Duty Cultivator', price: 45000, discount: 15, rating: 4.6, reviewsCount: 34, image: 'https://via.placeholder.com/300?text=Cultivator', sellerLocation: 'Maharashtra', condition: 'New' },
];

const CropMartHome = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] pb-12">
      {/* Hero Section */}
      <div className="bg-[var(--gradient-green)] text-white pt-8 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-outfit">Welcome to CropMart</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl">The most trusted marketplace for farmers. Buy seeds, fertilizers, and machinery at the best prices.</p>
          <MartSearchBar categories={categories} />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 -mt-8 relative z-20">
        {/* Categories Grid */}
        <div className="glass-panel rounded-xl shadow-md p-6 mb-8 border border-[var(--border-color)]">
          <h2 className="text-xl font-bold mb-6 text-[var(--text-main)] font-outfit flex items-center justify-between">
            Shop by Category
            <Link to="/cropmart/category/all" className="text-sm text-brand-green hover:text-brand-green-dark flex items-center">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map(cat => (
              <MartCategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-main)] font-outfit flex items-center justify-between">
            Featured Products
            <Link to="/cropmart/category/all" className="text-sm text-brand-green hover:text-brand-green-dark flex items-center">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <MartProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Banner CTA */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2 font-outfit">Grow your agribusiness with us</h2>
            <p className="text-[var(--text-muted)]">Join thousands of verified sellers and reach farmers across the country.</p>
          </div>
          <Link to="/cropmart/seller/register" className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-dark text-white font-bold rounded-lg whitespace-nowrap transition-colors shadow-sm">
            Become a Seller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CropMartHome;
