import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, ShoppingBag, PackageOpen, AlertTriangle } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const CropMartSellerDashboard = () => {
  return (
    <div className="bg-[var(--bg-main)] min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-main)] font-outfit">Seller Dashboard</h1>
          <Link to="/cropmart/seller/products/new" className="btn bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
            + Add New Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#348a21]">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Total Earnings</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">₹45,200</h3>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">124</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <PackageOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Pending Orders</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">12</h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">3</h3>
            </div>
          </div>
        </div>

        {/* Chart & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)]">
            <h2 className="text-lg font-bold text-[var(--text-main)] mb-6">Revenue (Last 7 Days)</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#00D09C" strokeWidth={3} dot={{r: 4, fill: '#00D09C', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)]">
            <h2 className="text-lg font-bold text-[var(--text-main)] mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-[var(--border-color)] last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium text-[var(--text-main)] text-sm">#ORD-00{i}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">Premium Seeds x{i}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-brand-green text-sm">₹{2500 * i}</div>
                    <div className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded mt-1 inline-block">Pending</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/cropmart/seller/orders" className="block text-center text-sm font-medium text-brand-blue mt-6 hover:underline">
              View All Orders
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CropMartSellerDashboard;
