import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import MartStarRating from './MartStarRating';

const MartFilterSidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters || {
    priceRange: [0, 100000],
    rating: 0,
    condition: [],
    brands: []
  });

  const handleApply = () => {
    if (onFilterChange) onFilterChange(localFilters);
    if (onClose) onClose();
  };

  const content = (
    <div className="p-5 flex flex-col h-full glass-panel">
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-lg font-bold flex items-center gap-2"><Filter className="w-5 h-5"/> Filters</h2>
        <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3 text-[var(--text-main)]">Price Range</h3>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={localFilters.priceRange[0]}
              onChange={(e) => setLocalFilters({...localFilters, priceRange: [Number(e.target.value), localFilters.priceRange[1]]})}
            />
            <span className="text-[var(--text-muted)]">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={localFilters.priceRange[1]}
              onChange={(e) => setLocalFilters({...localFilters, priceRange: [localFilters.priceRange[0], Number(e.target.value)]})}
            />
          </div>
        </div>

        <hr className="border-[var(--border-color)]" />

        {/* Condition */}
        <div>
          <h3 className="font-semibold mb-3 text-[var(--text-main)]">Condition</h3>
          <div className="space-y-2">
            {['New', 'Used', 'Refurbished'].map(cond => (
              <label key={cond} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-brand-green focus:ring-brand-green"
                  checked={localFilters.condition.includes(cond)}
                  onChange={(e) => {
                    const newCond = e.target.checked 
                      ? [...localFilters.condition, cond]
                      : localFilters.condition.filter(c => c !== cond);
                    setLocalFilters({...localFilters, condition: newCond});
                  }}
                />
                <span className="text-sm text-[var(--text-muted)]">{cond}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-[var(--border-color)]" />

        {/* Rating */}
        <div>
          <h3 className="font-semibold mb-3 text-[var(--text-main)]">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map(stars => (
              <label key={stars} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="ratingFilter"
                  className="text-brand-green focus:ring-brand-green"
                  checked={localFilters.rating === stars}
                  onChange={() => setLocalFilters({...localFilters, rating: stars})}
                />
                <MartStarRating rating={stars} />
                <span className="text-sm text-[var(--text-muted)]">& Up</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex gap-3">
        <button 
          onClick={() => setLocalFilters({priceRange: [0, 100000], rating: 0, condition: [], brands: []})}
          className="flex-1 py-2 px-4 border border-gray-300 text-[var(--text-main)] rounded-lg hover:bg-[var(--bg-main)] font-medium transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={handleApply}
          className="flex-1 py-2 px-4 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark font-medium transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
          <div className="relative w-[280px] max-w-[80vw] h-full glass-panel shadow-xl animate-slide-right">
            {content}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 glass-panel border border-[var(--border-color)] rounded-xl overflow-hidden h-fit sticky top-24">
        {content}
      </div>
    </>
  );
};

export default MartFilterSidebar;
