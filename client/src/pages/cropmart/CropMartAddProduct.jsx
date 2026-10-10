import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CropMartAddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', category: '', price: '', discount: '0', stock: '',
    condition: 'New', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Product saved successfully (mock)!');
    navigate('/cropmart/seller/dashboard');
  };

  return (
    <div className="bg-[var(--bg-main)] min-h-screen py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-2xl font-bold text-[var(--text-main)] font-outfit mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="glass-panel rounded-xl shadow-sm border border-[var(--border-color)] p-6 md:p-8">
          
          {/* Images */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-[var(--text-main)] mb-3 uppercase tracking-wider">Product Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-[var(--text-muted)] bg-[var(--bg-main)] hover:bg-gray-100 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="font-medium">Click to upload images or drag & drop</p>
              <p className="text-xs mt-1">PNG, JPG up to 5MB (Max 5 images)</p>
            </div>
          </div>

          <hr className="border-[var(--border-color)] mb-8" />

          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-[var(--text-main)] mb-4 uppercase tracking-wider">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Product Title*</label>
                <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-green" placeholder="e.g. Mahindra Tractor 265 DI" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Category*</label>
                <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-green glass-panel">
                  <option value="">Select Category</option>
                  <option value="machinery">Machinery</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Condition*</label>
                <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-green glass-panel">
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-[var(--border-color)] mb-8" />

          {/* Pricing & Inventory */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-[var(--text-main)] mb-4 uppercase tracking-wider">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Price (₹)*</label>
                <input required type="number" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-green" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Discount (%)</label>
                <input type="number" min="0" max="100" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-green" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Stock Quantity*</label>
                <input required type="number" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-green" placeholder="0" />
              </div>
            </div>
          </div>

          <hr className="border-[var(--border-color)] mb-8" />

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-[var(--text-main)] mb-4 uppercase tracking-wider">Description</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Product Description*</label>
              <textarea required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-green resize-y" placeholder="Describe the product features, benefits, and specifications..."></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-gray-300 text-[var(--text-main)] rounded-lg font-medium hover:bg-[var(--bg-main)]">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-brand-green text-white rounded-lg font-bold hover:bg-brand-green-dark">Save Product</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CropMartAddProduct;
