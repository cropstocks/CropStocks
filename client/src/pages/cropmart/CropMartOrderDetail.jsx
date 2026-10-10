import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MartOrderTimeline from '../../components/cropmart/MartOrderTimeline';
import { Download, ChevronLeft } from 'lucide-react';

const CropMartOrderDetail = () => {
  const { id } = useParams();

  return (
    <div className="bg-[var(--bg-main)] min-h-screen py-8">
      <div className="container mx-auto max-w-5xl px-4">
        
        <Link to="/cropmart/orders" className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] mb-6 w-fit">
          <ChevronLeft className="w-4 h-4" /> Back to Orders
        </Link>

        <div className="glass-panel rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden mb-6">
          <div className="bg-[var(--bg-main)] p-6 border-b border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-[var(--text-main)]">Order ID: {id || 'ORD-2023-1045'}</h1>
              <p className="text-sm text-[var(--text-muted)]">Placed on Oct 28, 2023</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 glass-panel border border-gray-300 rounded-lg text-sm font-medium hover:bg-[var(--bg-main)] transition-colors">
              <Download className="w-4 h-4" /> Invoice
            </button>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="font-bold text-[var(--text-main)] mb-6 text-lg">Delivery Status</h2>
            <MartOrderTimeline status="shipped" />

            <div className="mt-12">
              <h2 className="font-bold text-[var(--text-main)] mb-4 text-lg">Items in this Order</h2>
              <div className="border border-[var(--border-color)] rounded-xl p-4 flex gap-4">
                <img src="https://via.placeholder.com/100" alt="Product" className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-main)]">Mahindra 265 DI Power Plus Tractor</h3>
                  <div className="text-sm text-[var(--text-muted)] mb-2">Seller: Kisan Agro Traders</div>
                  <div className="font-bold text-[var(--text-main)]">₹4,80,000 <span className="text-sm font-normal text-[var(--text-muted)]">x 1</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)]">
            <h3 className="font-bold text-[var(--text-main)] mb-4">Delivery Address</h3>
            <p className="font-medium text-[var(--text-main)]">Manan</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">123 Farm Road, Sector 4<br/>Ludhiana, Punjab - 141001</p>
            <p className="text-sm text-[var(--text-muted)] mt-2 font-medium">Phone: +91 9876543210</p>
          </div>

          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)]">
            <h3 className="font-bold text-[var(--text-main)] mb-4">Payment Summary</h3>
            <div className="space-y-2 text-sm text-[var(--text-muted)] mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹4,80,000</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Payment Method</span>
                <span>Net Banking</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border-color)] flex justify-between font-bold text-lg text-[var(--text-main)]">
              <span>Total Amount</span>
              <span>₹4,80,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropMartOrderDetail;
