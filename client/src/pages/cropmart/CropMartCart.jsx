import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import MartPriceDisplay from '../../components/cropmart/MartPriceDisplay';

const mockCart = [
  { id: '1', title: 'Premium Wheat Seeds - 50kg', price: 2500, discount: 10, quantity: 2, image: 'https://via.placeholder.com/100' },
  { id: '3', title: 'Organic Urea Fertilizer', price: 800, discount: 0, quantity: 5, image: 'https://via.placeholder.com/100' }
];

const CropMartCart = () => {
  const calculateTotal = () => {
    let subtotal = 0;
    let discount = 0;
    mockCart.forEach(item => {
      subtotal += item.price * item.quantity;
      discount += (item.price * (item.discount / 100)) * item.quantity;
    });
    return { subtotal, discount, total: subtotal - discount };
  };

  const { subtotal, discount, total } = calculateTotal();

  if (mockCart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/cropmart" className="btn bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-green-dark">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-2xl font-bold text-gray-800 font-outfit mb-6">Shopping Cart ({mockCart.length})</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {mockCart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg border border-gray-100" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">{item.title}</h3>
                  <div className="mt-1">
                    <MartPriceDisplay price={item.price} discountPercentage={item.discount} className="!text-lg" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 border-r border-gray-300">-</button>
                    <span className="px-3 py-1 text-sm font-medium w-10 text-center">{item.quantity}</span>
                    <button className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 border-l border-gray-300">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
                <div className="flex justify-between">
                  <span>Price ({mockCart.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg text-gray-800 mb-6">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="mb-6 flex gap-2">
                <input type="text" placeholder="Coupon Code" className="flex-1 px-4 py-2 border rounded-lg text-sm outline-none focus:border-brand-green" />
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-black">Apply</button>
              </div>

              <Link to="/cropmart/checkout" className="w-full btn bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropMartCart;
