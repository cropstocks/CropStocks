import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import MartPriceDisplay from '../../components/cropmart/MartPriceDisplay';

const mockOrders = [
  { 
    id: 'ORD-2023-1001', 
    date: 'Oct 15, 2023', 
    total: 8500, 
    status: 'Delivered',
    items: [
      { id: '1', title: 'Premium Wheat Seeds - 50kg', image: 'https://via.placeholder.com/100' }
    ]
  },
  { 
    id: 'ORD-2023-1045', 
    date: 'Oct 28, 2023', 
    total: 480000, 
    status: 'Shipped',
    items: [
      { id: '2', title: 'Mahindra 265 DI Power Plus Tractor', image: 'https://via.placeholder.com/100' }
    ]
  }
];

const CropMartOrders = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-2xl font-bold text-gray-800 font-outfit mb-6">My Orders</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {['all', 'active', 'delivered', 'cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm capitalize whitespace-nowrap ${
                activeTab === tab ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4 text-sm">
                <div className="flex gap-6">
                  <div>
                    <div className="text-gray-500">Order Placed</div>
                    <div className="font-semibold">{order.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Total</div>
                    <div className="font-semibold">₹{order.total.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500">Order # {order.id}</div>
                  <Link to={`/cropmart/orders/${order.id}`} className="text-brand-blue font-medium hover:underline">View Details</Link>
                </div>
              </div>
              
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img src={order.items[0].image} alt="Product" className="w-20 h-20 rounded-lg border border-gray-200" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{order.items[0].title}</h3>
                    {order.items.length > 1 && <div className="text-sm text-gray-500">+{order.items.length - 1} more items</div>}
                  </div>
                </div>
                
                <div className="w-full md:w-1/3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <span className="font-semibold text-gray-800">{order.status}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.status === 'Delivered' ? 'Your item has been delivered' : 'Arriving by Nov 2, 2023'}
                  </div>
                </div>
                
                <div className="w-full md:w-auto">
                  <Link to={`/cropmart/orders/${order.id}`} className="w-full md:w-auto btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium">
                    Track Package <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CropMartOrders;
