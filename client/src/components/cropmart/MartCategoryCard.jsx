import React from 'react';
import { Link } from 'react-router-dom';

const MartCategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/cropmart/category/${category.slug || category.name.toLowerCase()}`}
      className="flex flex-col items-center p-4 glass-panel rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[var(--border-color)]"
    >
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-[#348a21] mb-3">
        {/* Placeholder for icon */}
        {category.icon || <span className="text-2xl">🌱</span>}
      </div>
      <h3 className="font-semibold text-[var(--text-main)] text-center text-sm">{category.name}</h3>
      {category.count !== undefined && (
        <span className="text-xs text-[var(--text-muted)] mt-1">{category.count} Products</span>
      )}
    </Link>
  );
};

export default MartCategoryCard;
