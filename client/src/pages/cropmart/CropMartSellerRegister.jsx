import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CropMartSellerRegister = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Real implementation would call API
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4">
        <div className="max-w-md glass-panel p-8 rounded-xl shadow-sm text-center border border-[var(--border-color)]">
          <div className="w-16 h-16 bg-green-100 text-[#348a21] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Registration Submitted!</h2>
          <p className="text-[var(--text-muted)] mb-6">Thank you for registering as a seller. Our team will verify your details and activate your account within 24-48 hours.</p>
          <button onClick={() => navigate('/cropmart')} className="btn bg-brand-green text-white px-6 py-2 rounded-lg font-semibold w-full hover:bg-brand-green-dark">Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-main)] min-h-screen py-8">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-main)] font-outfit mb-2">Become a Seller</h1>
          <p className="text-[var(--text-muted)]">Join our marketplace and reach thousands of farmers</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-xl shadow-sm border border-[var(--border-color)] p-6 md:p-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 border-b pb-2">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Business/Shop Name*</label>
                  <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-1">GST Number (Optional)</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 border-b pb-2">Pickup Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Complete Address*</label>
                  <textarea required rows="2" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">City*</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">State*</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Pincode*</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 border-b pb-2">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Account Number*</label>
                  <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-1">IFSC Code*</label>
                  <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:border-brand-green outline-none" />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 mt-4">
              <input required type="checkbox" className="mt-1" />
              <span className="text-sm text-[var(--text-muted)]">I agree to the CropMart Seller Terms & Conditions. I confirm that the information provided is accurate.</span>
            </label>
          </div>

          <div className="mt-8">
            <button type="submit" className="w-full bg-brand-gold text-white font-bold py-3 rounded-lg hover:bg-brand-gold-dark transition-colors">
              Submit Registration
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CropMartSellerRegister;
