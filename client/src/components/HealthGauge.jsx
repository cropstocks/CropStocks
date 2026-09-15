import React, { useEffect, useState } from 'react';

const HealthGauge = ({ value = 0, size = 180, label }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Animate value on mount
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - 20) / 2;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const strokeWidth = 15;
  const circumference = Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  let color = '#22c55e'; // green
  if (value < 30) color = '#ef4444'; // red
  else if (value < 60) color = '#f97316'; // orange
  else if (value < 80) color = '#eab308'; // yellow

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in" style={{ width: size, height: size }}>
      <svg width={size} height={size / 2 + 20} className="overflow-visible">
        <path
          d={`M ${10} ${cy} a ${radius} ${radius} 0 0 1 ${size - 20} 0`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${10} ${cy} a ${radius} ${radius} 0 0 1 ${size - 20} 0`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          className="text-4xl font-heading font-bold"
          fill="currentColor"
        >
          {Math.round(animatedValue)}
        </text>
      </svg>
      {label && <div className="mt-2 text-sm text-brand-slate font-body font-medium">{label}</div>}
    </div>
  );
};

export default HealthGauge;
