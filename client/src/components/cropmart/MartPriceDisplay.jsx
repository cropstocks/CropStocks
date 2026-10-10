import React from 'react';

const MartPriceDisplay = ({ price, discountPercentage = 0, className = '' }) => {
  const discountedPrice = price - (price * (discountPercentage / 100));

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xl font-bold text-gray-900">{formatPrice(discountedPrice)}</span>
      {discountPercentage > 0 && (
        <>
          <span className="text-sm text-gray-500 line-through">{formatPrice(price)}</span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        </>
      )}
    </div>
  );
};

export default MartPriceDisplay;
