import React, { useState } from 'react';
import { Users, Package, ShoppingCart, CheckCircle, XCircle } from 'lucide-react';

const mockSellers = [
  { id: '1', name: 'Kisan Agro Traders', email: 'contact@kisanagro.com', status: 'Pending' },
  { id: '2', name: 'Punjab Seeds Co.', email: 'sales@punjabseeds.in', status: 'Verified' }
];

const mockProducts = [
  { id: '1', title: 'Organic Fertilizer 50kg', seller: 'Green Earth', price: 1200, status: 'Pending Review' }
];

const CropMartAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('sellers');

  return (
    <div className="bg-[var(--bg-main)] min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-[var(--text-main)] font-outfit mb-8">CropMart Admin</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Total Sellers</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">45</h3>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-[#348a21] rounded-full flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Total Products</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">1,204</h3>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">342</h3>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="glass-panel rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden">
          <div className="flex border-b border-[var(--border-color)] bg-[var(--bg-main)]">
            {['sellers', 'products', 'categories'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold text-sm capitalize ${
                  activeTab === tab ? 'text-brand-green glass-panel border-b-2 border-brand-green' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {tab} Management
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'sellers' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Pending Seller Approvals</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[var(--bg-main)] text-[var(--text-muted)]">
                      <tr>
                        <th className="px-4 py-3 font-medium rounded-tl-lg">Seller Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium rounded-tr-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockSellers.map(seller => (
                        <tr key={seller.id} className="hover:bg-[var(--bg-main)]/50">
                          <td className="px-4 py-3 font-medium text-[var(--text-main)]">{seller.name}</td>
                          <td className="px-4 py-3 text-[var(--text-muted)]">{seller.email}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${seller.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {seller.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            {seller.status !== 'Verified' && (
                              <>
                                <button className="p-1.5 bg-green-100 text-[#348a21] rounded hover:bg-green-200" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                                <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Reject"><XCircle className="w-4 h-4" /></button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Products Pending Review</h2>
                <p className="text-sm text-[var(--text-muted)] mb-4">Review products before they go live on the marketplace.</p>
                {/* Similar table as above */}
                <div className="p-4 border border-[var(--border-color)] rounded-lg text-center text-[var(--text-muted)]">
                  Mock product approval list goes here.
                </div>
              </div>
            )}
            
            {activeTab === 'categories' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Category Management</h2>
                <button className="px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-medium mb-4">+ Add Category</button>
                <div className="p-4 border border-[var(--border-color)] rounded-lg text-center text-[var(--text-muted)]">
                  Category list goes here.
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CropMartAdminPanel;
