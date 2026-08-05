import React, { useEffect, useState } from 'react';

export default function FundingProgressBar({ raised, target }) {
  const [progress, setProgress] = useState(0);
  const percentage = Math.min((raised / target) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span className="text-brand-green">₹{raised.toLocaleString()} raised</span>
        <span className="text-gray-500">₹{target.toLocaleString()} target</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-brand-green h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1 text-right">{percentage.toFixed(1)}% funded</p>
    </div>
  );
}
