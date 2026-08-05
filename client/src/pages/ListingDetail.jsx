import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import FundingProgressBar from '../components/FundingProgressBar';
import TimelineMilestones from '../components/TimelineMilestones';
import RiskBadge from '../components/RiskBadge';
import InsuranceBadge from '../components/InsuranceBadge';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ListingDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [investAmount, setInvestAmount] = useState('');
  const [investing, setInvesting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const data = await api.get(`/listings/${id}`);
      setListing(data);
    } catch (err) {
      setError('Failed to load listing details');
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async () => {
    if (!investAmount || isNaN(investAmount)) return;
    setInvesting(true);
    try {
      await api.post('/investments', {
        listingId: parseInt(id),
        amount: parseFloat(investAmount)
      });
      setInvestAmount('');
      fetchListing();
    } catch (err) {
      alert(err.message || 'Investment failed');
    } finally {
      setInvesting(false);
    }
  };

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (error || !listing) return <div className="p-12 text-center text-red-500">{error || 'Not found'}</div>;

  let milestones = [];
  try {
    if (listing.milestones) milestones = JSON.parse(listing.milestones);
  } catch(e) {}

  let currentStep = 1;
  if (listing.status === 'FUNDING') currentStep = 2;
  else if (listing.status === 'ACTIVE') currentStep = 3;
  else if (listing.status === 'HARVESTED') currentStep = 4;
  else if (listing.status === 'CLOSED') currentStep = 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="h-64 sm:h-96 w-full relative bg-brand-green">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex space-x-2 mb-3">
              <RiskBadge level={listing.riskTier || 'MEDIUM'} />
              <InsuranceBadge insured={listing.insuranceFlag} />
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">{listing.status}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold font-heading">{listing.produceName}</h1>
            <p className="mt-2 text-lg">📍 {listing.region}</p>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-2xl font-bold mb-4 font-heading">About the Project</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Type: {listing.type} <br/>
                Expected Yield: {listing.expectedYield} <br/>
                Expected Price: ₹{listing.expectedPrice} <br/>
                Status: {listing.status}
              </p>
            </section>
            
            {milestones.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-4 font-heading">Project Timeline</h3>
                <TimelineMilestones milestones={milestones} currentStep={currentStep} />
              </section>
            )}
            
            {listing.progressUpdates && listing.progressUpdates.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-4 font-heading">Updates</h3>
                <div className="space-y-4">
                  {listing.progressUpdates.map((update, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded border">
                      <p>{update.content || JSON.stringify(update)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 bg-brand-light">
              <h4 className="text-xl font-bold mb-4">Investment Overview</h4>
              <FundingProgressBar raised={listing.capitalRaised || 0} target={listing.capitalRequired || 1} />
              
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
                <div>
                  <span className="text-sm text-gray-500 block">Expected Return</span>
                  <span className="text-2xl font-bold text-brand-green">{listing.expectedReturn || 0}%</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">Duration</span>
                  <span className="text-xl font-bold">{listing.cycleDuration} days</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">Profit Split</span>
                  <span className="text-lg font-bold">F:{listing.profitSplitFarmer}% / I:{listing.profitSplitInvestor}%</span>
                </div>
              </div>
              
              {user?.role === 'INVESTOR' && (listing.status === 'FUNDING' || listing.status === 'APPROVED') && (
                <div className="mt-8">
                  <input type="number" placeholder="Amount (₹)" value={investAmount} onChange={e => setInvestAmount(e.target.value)} className="w-full p-3 border rounded mb-3" />
                  <button onClick={handleInvest} disabled={investing || !investAmount} className="w-full btn-primary py-3 disabled:opacity-50">
                    {investing ? 'Processing...' : 'Invest Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
