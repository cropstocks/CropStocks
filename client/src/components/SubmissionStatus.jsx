import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { id: 'WINDOW_OPEN', label: 'Window Open' },
  { id: 'CAPTURED', label: 'Captured' },
  { id: 'VERIFYING', label: 'Verifying' },
  { id: 'VERIFIED', label: 'Verified' },
  { id: 'ANALYZED', label: 'Analyzed' },
  { id: 'REPORT_READY', label: 'Report Ready' }
];

const SubmissionStatus = ({ currentStep = 'WINDOW_OPEN', windowCloseTime }) => {
  const isMissed = currentStep === 'MISSED';
  
  let currentIndex = steps.findIndex(s => s.id === currentStep);
  if (currentIndex === -1 && !isMissed) currentIndex = 0;
  if (isMissed) currentIndex = 0; 

  const calculateTimeLeft = () => {
    if (!windowCloseTime) return 'Unknown';
    const diff = new Date(windowCloseTime) - new Date();
    if (diff <= 0) return 'Closed';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m remaining`;
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative mb-8 px-2">
        <div className="absolute left-[10%] right-[10%] top-1/2 h-1 bg-gray-200 -translate-y-1/2 z-0" />
        
        {!isMissed && currentIndex > 0 && (
          <div 
            className="absolute left-[10%] top-1/2 h-1 bg-brand-green -translate-y-1/2 z-0 transition-all duration-500"
            style={{ right: `${100 - (currentIndex / (steps.length - 1)) * 80 - 10}%` }}
          />
        )}

        {steps.map((step, index) => {
          const isActive = index === currentIndex && !isMissed;
          const isCompleted = index < currentIndex && !isMissed;
          
          let circleClasses = "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors border-2 bg-white";
          if (isMissed) {
            circleClasses += " border-red-500 bg-red-50 text-red-500";
          } else if (isActive) {
            circleClasses += " border-brand-green bg-brand-green text-white shadow-[0_0_0_4px_rgba(34,197,94,0.2)] animate-pulse";
          } else if (isCompleted) {
            circleClasses += " border-brand-green bg-brand-green text-white";
          } else {
            circleClasses += " border-gray-300 text-gray-400";
          }

          return (
            <div key={step.id} className="flex flex-col items-center relative w-1/6">
              <div className={circleClasses}>
                {isCompleted ? <Check size={16} /> : <span className="text-xs font-bold">{index + 1}</span>}
              </div>
              <div className={`absolute top-10 text-[10px] sm:text-xs font-medium text-center w-20 sm:w-24 -ml-10 sm:-ml-12 left-1/2 ${isActive ? 'text-brand-dark' : 'text-gray-400'} ${isMissed ? 'text-red-500' : ''}`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-6 h-6">
        {currentStep === 'WINDOW_OPEN' && windowCloseTime && (
          <p className="text-sm text-amber-600 font-medium">
            Time to upload: {calculateTimeLeft()}
          </p>
        )}
        {isMissed && (
          <p className="text-sm text-red-600 font-medium">
            Submission window missed.
          </p>
        )}
        {!isMissed && currentStep !== 'WINDOW_OPEN' && currentStep !== 'REPORT_READY' && (
          <p className="text-sm text-brand-blue font-medium animate-pulse">
            Processing...
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmissionStatus;
