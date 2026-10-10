import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, MapPin } from 'lucide-react';
import MartStarRating from './MartStarRating';
import MartPriceDisplay from './MartPriceDisplay';

const MartProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    if (onToggleWishlist) onToggleWishlist(product.id, !isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all relative group">
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-red-50 transition-colors z-10"
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>

      {product.condition && (
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur text-white text-xs font-semibold rounded z-10">
          {product.condition}
        </div>
      )}

      <Link to={`/cropmart/product/${product.id || product._id}`} className="block">
        <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center relative overflow-hidden">
          <img 
            src={product.image || 'https://via.placeholder.com/300?text=No+Image'} 
            alt={product.title}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1 line-clamp-1">
            <MapPin className="w-3 h-3" />
            {product.sellerLocation || 'Unknown location'}
          </div>
          
          <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px]">
            {product.title}
          </h3>

          <div className="mb-2">
            <MartStarRating rating={product.rating || 0} count={product.reviewsCount} />
          </div>

          <div className="mb-4">
            <MartPriceDisplay price={product.price} discountPercentage={product.discount} />
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full btn bg-brand-green hover:bg-brand-green-dark text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-semibold"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default MartProductCard;
