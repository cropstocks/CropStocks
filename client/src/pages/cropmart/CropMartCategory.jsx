import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MartFilterSidebar from '../../components/cropmart/MartFilterSidebar';
import MartProductCard from '../../components/cropmart/MartProductCard';
import { Filter } from 'lucide-react';

const mockProducts = [
  { id: '1', title: 'Mahindra 265 DI Power Plus', price: 480000, discount: 5, rating: 4.8, reviewsCount: 120, image: 'https://via.placeholder.com/300?text=Tractor', sellerLocation: 'Punjab', condition: 'New' },
  { id: '2', title: 'Premium Wheat Seeds - 50kg', price: 2500, discount: 10, rating: 4.5, reviewsCount: 45, image: 'https://via.placeholder.com/300?text=Seeds', sellerLocation: 'Haryana', condition: 'New' },
  { id: '3', title: 'Organic Urea Fertilizer', price: 800, discount: 0, rating: 4.2, reviewsCount: 89, image: 'https://via.placeholder.com/300?text=Fertilizer', sellerLocation: 'Gujarat', condition: 'New' },
  { id: '4', title: 'Heavy Duty Cultivator', price: 45000, discount: 15, rating: 4.6, reviewsCount: 34, image: 'https://via.placeholder.com/300?text=Cultivator', sellerLocation: 'Maharashtra', condition: 'New' },
  { id: '5', title: 'Used Rotavator', price: 25000, discount: 0, rating: 3.8, reviewsCount: 12, image: 'https://via.placeholder.com/300?text=Rotavator', sellerLocation: 'Rajasthan', condition: 'Used' },
  { id: '6', title: 'Drip Irrigation Kit', price: 12000, discount: 20, rating: 4.9, reviewsCount: 210, image: 'https://via.placeholder.com/300?text=Irrigation', sellerLocation: 'Tamil Nadu', condition: 'New' },
];

const CropMartCategory = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  const title = query ? `Search results for "${query}"` : slug === 'all' ? 'All Products' : `Category: ${slug}`;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Home / CropMart / {slug === 'all' ? 'All Products' : slug}
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800 font-outfit capitalize">{title}</h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium outline-none cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Average Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <MartFilterSidebar 
            isOpen={isMobileFilterOpen} 
            onClose={() => setIsMobileFilterOpen(false)} 
            onFilterChange={(f) => console.log('Filters applied:', f)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {mockProducts.length} products
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {mockProducts.map(product => (
                <MartProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-2 border border-brand-green text-brand-green font-medium rounded-lg hover:bg-brand-green/5 transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropMartCategory;
