import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, CheckCircle } from 'lucide-react';

const CropMartCheckout = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Mock success
    alert('Order placed successfully!');
    navigate('/cropmart/orders');
  };

  return (
    <div className="bg-[var(--bg-main)] min-h-screen py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-2xl font-bold text-[var(--text-main)] font-outfit mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            
            {/* Step 1: Address */}
            <div className={`glass-panel rounded-xl shadow-sm border ${step === 1 ? 'border-brand-green ring-1 ring-brand-green' : 'border-[var(--border-color)]'}`}>
              <div 
                className="p-4 bg-[var(--bg-main)] rounded-t-xl border-b border-[var(--border-color)] flex items-center gap-3 cursor-pointer"
                onClick={() => setStep(1)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-brand-green text-white' : 'bg-gray-200 text-[var(--text-muted)]'}`}>1</div>
                <h2 className="text-lg font-semibold text-[var(--text-main)] flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Delivery Address
                </h2>
                {step > 1 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
              </div>
              
              {step === 1 && (
                <div className="p-6">
                  <div className="border border-brand-green bg-green-50 p-4 rounded-lg mb-4 relative">
                    <div className="absolute top-4 right-4 w-4 h-4 rounded-full border-4 border-brand-green glass-panel"></div>
                    <div className="font-semibold mb-1">Manan (Home)</div>
                    <div className="text-sm text-[var(--text-muted)]">123 Farm Road, Sector 4</div>
                    <div className="text-sm text-[var(--text-muted)]">Ludhiana, Punjab - 141001</div>
                    <div className="text-sm text-[var(--text-muted)] mt-2 font-medium">+91 9876543210</div>
                  </div>
                  <button className="text-brand-blue font-medium text-sm">+ Add New Address</button>
                  <div className="mt-6">
                    <button onClick={() => setStep(2)} className="px-8 py-2.5 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green-dark">Deliver Here</button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`glass-panel rounded-xl shadow-sm border ${step === 2 ? 'border-brand-green ring-1 ring-brand-green' : 'border-[var(--border-color)]'}`}>
              <div className="p-4 bg-[var(--bg-main)] rounded-t-xl border-b border-[var(--border-color)] flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-brand-green text-white' : 'bg-gray-200 text-[var(--text-muted)]'}`}>2</div>
                <h2 className="text-lg font-semibold text-[var(--text-main)] flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Payment Method
                </h2>
              </div>
              
              {step === 2 && (
                <div className="p-6 space-y-3">
                  {['UPI', 'Credit / Debit Card', 'Net Banking', 'Cash on Delivery'].map((method) => (
                    <label key={method} className="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:bg-[var(--bg-main)]">
                      <input type="radio" name="payment" className="w-4 h-4 text-brand-green focus:ring-brand-green mr-4" />
                      <span className="font-medium text-[var(--text-main)]">{method}</span>
                    </label>
                  ))}
                  <div className="mt-6">
                    <button onClick={handlePlaceOrder} className="px-8 py-2.5 bg-brand-gold text-white font-semibold rounded-lg hover:bg-brand-gold-dark w-full md:w-auto">
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Price Summary */}
          <div className="lg:w-1/3">
            <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] sticky top-24">
              <h2 className="text-lg font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-4 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm text-[var(--text-muted)] mb-4 border-b border-[var(--border-color)] pb-4">
                <div className="flex justify-between">
                  <span>Price (2 items)</span>
                  <span>₹9,000</span>
                </div>
                <div className="flex justify-between text-[#348a21]">
                  <span>Discount</span>
                  <span>-₹500</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-[#348a21]">Free</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg text-[var(--text-main)]">
                <span>Total Amount</span>
                <span>₹8,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropMartCheckout;
