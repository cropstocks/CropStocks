import React, { useState, useRef } from 'react';

const SatelliteCompare = ({ currentImage, previousImage, currentLabel, previousLabel }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => handleMove(e);

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16px' fill='%2394a3b8'%3ENo Image%3C/text%3E%3C/svg%3E";

  return (
    <div className="relative w-full h-64 bg-brand-light rounded-lg overflow-hidden select-none" ref={containerRef} onTouchMove={handleMove}>
      <img src={previousImage || placeholder} alt={previousLabel} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10">{previousLabel}</div>
      
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img src={currentImage || placeholder} alt={currentLabel} className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: '100%', minWidth: containerRef.current ? containerRef.current.offsetWidth : '100vw' }} draggable={false} />
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10 whitespace-nowrap">{currentLabel}</div>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-md"
        style={{ left: `calc(${sliderPos}% - 2px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => { e.stopPropagation(); }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 text-brand-slate flex justify-between">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteCompare;
