import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MartImageGallery from '../../components/cropmart/MartImageGallery';
import MartPriceDisplay from '../../components/cropmart/MartPriceDisplay';
import MartStarRating from '../../components/cropmart/MartStarRating';
import { Shield, Truck, MapPin, Heart, Share2, Info, ChevronRight, MessageSquare } from 'lucide-react';

const mockProduct = {
  id: '1',
  title: 'Mahindra 265 DI Power Plus Tractor (45 HP, 4WD)',
  brand: 'Mahindra',
  price: 500000,
  discount: 5,
  rating: 4.8,
  reviewsCount: 124,
  stock: 3,
  condition: 'New',
  images: [
    'https://via.placeholder.com/600?text=Tractor+1',
    'https://via.placeholder.com/600?text=Tractor+2',
    'https://via.placeholder.com/600?text=Tractor+3'
  ],
  description: 'The Mahindra 265 DI Power Plus is a highly reliable and powerful 45 HP tractor designed for multiple agricultural operations. It comes with a 4-cylinder engine and advanced hydraulics.',
  specs: {
    'Engine Power': '45 HP',
    'Cylinders': '4',
    'Drive': '4WD',
    'Lifting Capacity': '1500 kg',
    'Warranty': '2 Years'
  },
  seller: {
    name: 'Kisan Agro Traders',
    rating: 4.9,
    location: 'Ludhiana, Punjab',
    verified: true,
    memberSince: '2021'
  }
};

const CropMartProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');

  return (
    <div className="bg-[var(--bg-main)] min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-[var(--text-muted)] mb-6 flex items-center gap-2">
          <Link to="/cropmart" className="hover:text-brand-green">Home</Link> <ChevronRight className="w-3 h-3" />
          <Link to="/cropmart/category/machinery" className="hover:text-brand-green">Machinery</Link> <ChevronRight className="w-3 h-3" />
          <span className="text-[var(--text-main)] truncate">{mockProduct.title}</span>
        </div>

        <div className="glass-panel rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Images */}
            <div className="w-full lg:w-2/5 p-6 border-b lg:border-b-0 lg:border-r border-[var(--border-color)]">
              <MartImageGallery images={mockProduct.images} />
            </div>

            {/* Details */}
            <div className="w-full lg:w-3/5 p-6 lg:p-8">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold text-[var(--text-main)] font-outfit">{mockProduct.title}</h1>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-brand-green font-semibold bg-green-50 px-2 py-1 rounded">
                  Brand: {mockProduct.brand}
                </span>
                <MartStarRating rating={mockProduct.rating} count={mockProduct.reviewsCount} />
              </div>

              <div className="mb-6">
                <MartPriceDisplay price={mockProduct.price} discountPercentage={mockProduct.discount} className="!text-3xl" />
                <div className="text-sm text-[var(--text-muted)] mt-1">Inclusive of all taxes</div>
              </div>

              <hr className="border-[var(--border-color)] mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left col */}
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-semibold text-[var(--text-main)] block mb-2">Condition</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{mockProduct.condition}</span>
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-[var(--text-main)] block mb-2">Quantity</span>
                    <div className="flex items-center border border-gray-300 w-fit rounded-lg overflow-hidden">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 bg-[var(--bg-main)] hover:bg-gray-100 text-[var(--text-muted)] border-r border-gray-300"
                      >-</button>
                      <span className="px-4 py-1 text-sm font-medium">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(mockProduct.stock, quantity + 1))}
                        className="px-3 py-1 bg-[var(--bg-main)] hover:bg-gray-100 text-[var(--text-muted)] border-l border-gray-300"
                      >+</button>
                    </div>
                    <span className="text-xs text-[#348a21] mt-1 block">In Stock ({mockProduct.stock} available)</span>
                  </div>
                </div>

                {/* Right col: Delivery & Seller */}
                <div className="bg-[var(--bg-main)] p-4 rounded-xl space-y-4 border border-[var(--border-color)]">
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-[var(--text-main)] text-sm mb-2">
                      <MapPin className="w-4 h-4 text-brand-green" /> Delivery
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Enter Pincode" className="flex-1 px-3 py-1.5 text-sm border rounded-lg" />
                      <button className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-black">Check</button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-2 font-semibold text-[var(--text-main)] text-sm mb-1">
                      <Shield className="w-4 h-4 text-brand-green" /> Sold By
                    </div>
                    <div className="text-sm text-brand-blue font-medium">{mockProduct.seller.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{mockProduct.seller.location}</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Link to="/cropmart/cart" className="flex-1 btn bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-lg">
                  Add to Cart
                </Link>
                <Link to="/cropmart/checkout" className="flex-1 btn bg-brand-gold hover:bg-brand-gold-dark text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-lg">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-panel rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden">
          <div className="flex border-b border-[var(--border-color)] overflow-x-auto">
            {['desc', 'specs', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold text-sm capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'text-brand-green border-b-2 border-brand-green' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)]'
                }`}
              >
                {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Reviews'}
              </button>
            ))}
          </div>
          
          <div className="p-6 lg:p-8">
            {activeTab === 'desc' && (
              <div className="prose max-w-none text-[var(--text-main)]">
                <p>{mockProduct.description}</p>
                <div className="mt-4 flex items-start gap-2 bg-blue-50 p-4 rounded-lg text-brand-blue">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Government subsidy of up to 40% may be available on this machinery. Please check your local state agriculture department schemes.</p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <table className="w-full text-sm text-left border-collapse">
                  <tbody>
                    {Object.entries(mockProduct.specs).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-[var(--bg-main)]' : 'glass-panel'}>
                        <td className="py-3 px-4 font-semibold text-[var(--text-main)] w-1/3 border border-[var(--border-color)]">{key}</td>
                        <td className="py-3 px-4 text-[var(--text-muted)] border border-[var(--border-color)]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-4xl font-bold text-[var(--text-main)]">{mockProduct.rating}</div>
                  <div>
                    <MartStarRating rating={mockProduct.rating} />
                    <div className="text-sm text-[var(--text-muted)] mt-1">Based on {mockProduct.reviewsCount} reviews</div>
                  </div>
                </div>
                {/* Mock Review */}
                <div className="border-b border-[var(--border-color)] pb-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[var(--text-muted)]">R</div>
                    <div>
                      <div className="font-semibold text-sm">Ramesh Kumar</div>
                      <MartStarRating rating={5} />
                    </div>
                  </div>
                  <p className="text-[var(--text-main)] text-sm">Great tractor, very powerful. Delivered on time by the seller.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CropMartProductDetail;
