import React from 'react';
import { Link } from 'react-router-dom';
import FundingProgressBar from './FundingProgressBar';
import RiskBadge from './RiskBadge';
import InsuranceBadge from './InsuranceBadge';

export default function ListingCard({ listing }) {
  return (
    <div className="glass-card hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col h-full animate-fade-in">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={listing.image || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop'} 
          alt={listing.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <RiskBadge level={listing.riskLevel} />
          <InsuranceBadge insured={listing.isInsured} />
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{listing.title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
        
        <div className="mt-auto space-y-4">
          <div className="flex justify-between text-sm">
            <div>
              <span className="block text-gray-500 text-xs">Expected Return</span>
              <span className="font-semibold text-brand-green">{listing.expectedReturn}%</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs">Duration</span>
              <span className="font-semibold text-gray-800">{listing.durationMonths} months</span>
            </div>
          </div>
          
          <FundingProgressBar raised={listing.raisedAmount} target={listing.targetAmount} />
          
          <Link to={`/listing/${listing.id}`} className="w-full btn-outline block text-center mt-4 py-2">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
