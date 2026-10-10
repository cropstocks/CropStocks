import React, { useState } from 'react';

const MartImageGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0] || 'https://via.placeholder.com/600?text=No+Image');

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-4">
        <img 
          src={mainImage} 
          alt="Product" 
          className="w-full h-full object-contain cursor-zoom-in"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden bg-white p-1 transition-all ${
                mainImage === img ? 'border-brand-green shadow-sm' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MartImageGallery;
