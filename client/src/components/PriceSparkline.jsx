import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const PriceSparkline = ({ data = [], currentPrice = 0, deltaPercent = 0, height = 60 }) => {
  const isPositive = deltaPercent >= 0;
  const color = isPositive ? '#22c55e' : '#ef4444'; // brand-green or red
  const fillColor = isPositive ? 'url(#colorPos)' : 'url(#colorNeg)';

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex flex-col">
        <span className="text-2xl font-heading font-bold text-brand-dark">₹{currentPrice.toFixed(2)}</span>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(deltaPercent).toFixed(2)}%
        </span>
      </div>
      <div className="flex-1" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="price" stroke={color} fillOpacity={1} fill={fillColor} strokeWidth={2} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceSparkline;
