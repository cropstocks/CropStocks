import api from './api';

export const cropmartApi = {
  // Products
  getProducts: (params) => api.get(`/cropmart?${new URLSearchParams(params)}`),
  getProduct: (id) => api.get(`/cropmart/products/${id}`),
  getFeatured: () => api.get('/cropmart/featured'),
  getDeals: () => api.get('/cropmart/deals'),
  getCategories: () => api.get('/cropmart/categories'),
  searchSuggest: (q) => api.get(`/cropmart/search/suggest?q=${q}`),
  getBanners: () => api.get('/cropmart/banners'),
  
  // Cart
  getCart: () => api.get('/cropmart/buyer/cart'),
  addToCart: (data) => api.post('/cropmart/buyer/cart', data),
  updateCartItem: (itemId, data) => api.put(`/cropmart/buyer/cart/${itemId}`, data),
  removeFromCart: (itemId) => api.delete(`/cropmart/buyer/cart/${itemId}`),
  
  // Wishlist
  getWishlist: () => api.get('/cropmart/buyer/wishlist'),
  addToWishlist: (productId) => api.post('/cropmart/buyer/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/cropmart/buyer/wishlist/${productId}`),
  
  // Orders
  checkout: (data) => api.post('/cropmart/buyer/checkout', data),
  getOrders: () => api.get('/cropmart/buyer/orders'),
  getOrder: (id) => api.get(`/cropmart/buyer/orders/${id}`),
  cancelOrder: (id, reason) => api.post(`/cropmart/buyer/orders/${id}/cancel`, { reason }),
  returnOrder: (id, reason) => api.post(`/cropmart/buyer/orders/${id}/return`, { reason }),
  
  // Reviews
  createReview: (data) => api.post('/cropmart/buyer/reviews', data),
  
  // Addresses
  getAddresses: () => api.get('/cropmart/buyer/addresses'),
  addAddress: (data) => api.post('/cropmart/buyer/addresses', data),
  updateAddress: (id, data) => api.put(`/cropmart/buyer/addresses/${id}`, data),
  deleteAddress: (id) => api.delete(`/cropmart/buyer/addresses/${id}`),
  
  // Coupons
  validateCoupon: (code) => api.post('/cropmart/buyer/coupons/validate', { code }),
  
  // Messages
  sendMessage: (data) => api.post('/cropmart/buyer/messages', data),
  getMessages: () => api.get('/cropmart/buyer/messages'),
  
  // Quotes
  requestQuote: (data) => api.post('/cropmart/buyer/quotes', data),
  
  // Seller
  registerSeller: (data) => api.post('/cropmart/seller/register', data),
  getSellerDashboard: () => api.get('/cropmart/seller/dashboard'),
  getSellerProducts: (params) => api.get(`/cropmart/seller/products?${new URLSearchParams(params)}`),
  addProduct: (data) => api.post('/cropmart/seller/products', data),
  updateProduct: (id, data) => api.put(`/cropmart/seller/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/cropmart/seller/products/${id}`),
  getSellerOrders: () => api.get('/cropmart/seller/orders'),
  updateOrderStatus: (id, data) => api.put(`/cropmart/seller/orders/${id}/status`, data),
  getEarnings: () => api.get('/cropmart/seller/earnings'),
  answerQuestion: (productId, qId, data) => api.post(`/cropmart/seller/products/${productId}/questions/${qId}/answer`, data),
  respondToQuote: (id, data) => api.post(`/cropmart/seller/quotes/${id}/respond`, data),
  
  // Admin
  getPendingSellers: () => api.get('/cropmart/admin/sellers'),
  verifySeller: (id, data) => api.put(`/cropmart/admin/sellers/${id}/verify`, data),
  getPendingProducts: () => api.get('/cropmart/admin/products/pending'),
  approveProduct: (id, data) => api.put(`/cropmart/admin/products/${id}/approve`, data),
  adminGetCategories: () => api.get('/cropmart/admin/categories'),
  adminCreateCategory: (data) => api.post('/cropmart/admin/categories', data),
  adminUpdateCategory: (id, data) => api.put(`/cropmart/admin/categories/${id}`, data),
  adminGetAnalytics: () => api.get('/cropmart/admin/analytics'),
  adminGetOrders: () => api.get('/cropmart/admin/orders'),
  adminGetCoupons: () => api.get('/cropmart/admin/coupons'),
  adminCreateCoupon: (data) => api.post('/cropmart/admin/coupons', data),
  adminGetBanners: () => api.get('/cropmart/admin/banners'),
  adminCreateBanner: (data) => api.post('/cropmart/admin/banners', data),
};

export default cropmartApi;
