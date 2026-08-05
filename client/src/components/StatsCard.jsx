import React, { useEffect, useState } from 'react';

export default function StatsCard({ title, value, prefix = '', suffix = '', icon }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-card p-6 flex items-center justify-between animate-slide-up">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h4 className="text-3xl font-heading font-bold text-brand-dark">
          {prefix}{count.toLocaleString()}{suffix}
        </h4>
      </div>
      {icon && (
        <div className="p-3 bg-brand-light rounded-full text-brand-green">
          {icon}
        </div>
      )}
    </div>
  );
}
