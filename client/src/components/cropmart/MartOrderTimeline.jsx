import React from 'react';
import { Package, CheckCircle, Truck, MapPin } from 'lucide-react';

const MartOrderTimeline = ({ status }) => {
  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Package },
    { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: MapPin },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === status?.toLowerCase()) || 0;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {/* Background track */}
        <div className="absolute left-[20px] right-[20px] top-5 h-1 bg-gray-200 -z-10 rounded-full"></div>
        {/* Active track */}
        <div 
          className="absolute left-[20px] top-5 h-1 bg-green-500 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 relative z-0">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                  isCompleted 
                    ? 'bg-green-500 border-white text-white shadow-md' 
                    : 'bg-white border-gray-200 text-gray-400'
                } transition-colors duration-300`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-semibold text-center w-20 ${
                isCurrent ? 'text-green-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MartOrderTimeline;
