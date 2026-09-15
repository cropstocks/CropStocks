import React from 'react';
import { ShieldAlert, Pill, IndianRupee } from 'lucide-react';

const RemediationCardComponent = ({ detection = {}, remediation = {}, language = 'en' }) => {
  const { diseaseName = 'Unknown', severity = 'LOW', affectedPct = 0 } = detection;
  const { explanation = '', treatment = '', dosage = '', urgencyLevel = 'NORMAL', estimatedCostInr = 0 } = remediation;

  const getSeverityBadge = () => {
    switch (severity.toUpperCase()) {
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      case 'MODERATE': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'SEVERE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isUrgent = urgencyLevel === 'HIGH' || urgencyLevel === 'CRITICAL';

  let explText = explanation;
  try {
    const explObj = typeof explanation === 'string' && explanation.startsWith('{') ? JSON.parse(explanation) : explanation;
    if (typeof explObj === 'object') {
      explText = explObj[language] || explObj['en'] || Object.values(explObj)[0];
    }
  } catch (e) {
    // keep string
  }

  return (
    <div className={`glass-card overflow-hidden relative border ${isUrgent ? 'border-red-300' : 'border-gray-200'}`}>
      {isUrgent && (
        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1">
          <ShieldAlert size={14} /> Immediate Action Required
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-heading font-semibold text-brand-dark">{diseaseName}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getSeverityBadge()}`}>
            {severity} ({affectedPct}%)
          </span>
        </div>
        
        <p className="text-sm text-brand-slate mb-4 font-body">{explText}</p>
        
        <div className="bg-brand-light rounded p-3 mb-4">
          <div className="flex items-start gap-2 mb-2">
            <Pill size={16} className="text-brand-blue mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-brand-dark">Treatment</div>
              <div className="text-sm text-brand-slate">{treatment}</div>
            </div>
          </div>
          {dosage && (
            <div className="text-sm text-brand-slate ml-6 bg-white p-2 rounded border border-gray-100">
              <span className="font-medium">Dosage:</span> {dosage}
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
          <div className="flex items-center text-brand-slate font-medium">
            <IndianRupee size={16} className="mr-1" />
            {estimatedCostInr} <span className="text-xs text-gray-500 ml-1">Est. Cost</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="btn btn-outline flex-1 sm:flex-none text-xs py-1 px-3">Request Visit</button>
            <button className="btn btn-primary bg-brand-green hover:bg-green-700 text-white flex-1 sm:flex-none text-xs py-1 px-3">Order Input</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemediationCardComponent;
