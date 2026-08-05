import React from 'react';

export default function InsuranceBadge({ insured }) {
  if (!insured) return null;
  
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-blue-50 text-brand-blue border border-blue-200">
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-1.998A11.954 11.954 0 0110 1.944zM10 16.143C6.391 14.73 4 11.115 4 7.027A13.91 13.91 0 0010 4.195a13.91 13.91 0 006 2.832c0 4.088-2.39 7.703-6 9.116z" clipRule="evenodd" />
        <path d="M10 9a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
      Insured
    </span>
  );
}
