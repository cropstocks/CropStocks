import React from 'react';

export default function RiskBadge({ level }) {
  const getBadgeStyle = (level) => {
    switch(level?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getBadgeStyle(level)}`}>
      {level} Risk
    </span>
  );
}
