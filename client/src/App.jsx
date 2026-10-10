import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import InvestmentsPage from './pages/InvestmentsPage';
import InvestorDashboard from './pages/InvestorDashboard';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import CaptureScreen from './pages/CaptureScreen';
import WeeklyReportView from './pages/WeeklyReportView';
import AdminReviewQueue from './pages/AdminReviewQueue';
import FarmerAppealForm from './pages/FarmerAppealForm';
import FarmerDashboard from './pages/FarmerDashboard';
<<<<<<< Updated upstream
=======
import CropRegistration from './pages/CropRegistration';
import ProtectedRoute from './components/ProtectedRoute';

// CropMart Pages
import CropMartHome from './pages/cropmart/CropMartHome';
import CropMartCategory from './pages/cropmart/CropMartCategory';
import CropMartProductDetail from './pages/cropmart/CropMartProductDetail';
import CropMartCart from './pages/cropmart/CropMartCart';
import CropMartCheckout from './pages/cropmart/CropMartCheckout';
import CropMartOrders from './pages/cropmart/CropMartOrders';
import CropMartOrderDetail from './pages/cropmart/CropMartOrderDetail';
import CropMartSellerDashboard from './pages/cropmart/CropMartSellerDashboard';
import CropMartAddProduct from './pages/cropmart/CropMartAddProduct';
import CropMartSellerRegister from './pages/cropmart/CropMartSellerRegister';
import CropMartAdminPanel from './pages/cropmart/CropMartAdminPanel';
>>>>>>> Stashed changes

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/dashboard" element={<InvestorDashboard />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer-dashboard-old" element={<FarmerDashboardPage />} />
          <Route path="/farmer/capture/:listingId" element={<CaptureScreen />} />
          <Route path="/farmer/report/:listingId/:week" element={<WeeklyReportView />} />
          <Route path="/farmer/appeal/:listingId" element={<FarmerAppealForm />} />
          <Route path="/admin/reviews" element={<AdminReviewQueue />} />
<<<<<<< Updated upstream
=======
          <Route path="/farmer/crop-registration" element={<CropRegistration />} />
          
          {/* CropMart Routes */}
          <Route path="/cropmart" element={<CropMartHome />} />
          <Route path="/cropmart/category/:slug" element={<CropMartCategory />} />
          <Route path="/cropmart/product/:id" element={<CropMartProductDetail />} />
          <Route path="/cropmart/cart" element={<ProtectedRoute><CropMartCart /></ProtectedRoute>} />
          <Route path="/cropmart/checkout" element={<ProtectedRoute><CropMartCheckout /></ProtectedRoute>} />
          <Route path="/cropmart/orders" element={<ProtectedRoute><CropMartOrders /></ProtectedRoute>} />
          <Route path="/cropmart/orders/:id" element={<ProtectedRoute><CropMartOrderDetail /></ProtectedRoute>} />
          <Route path="/cropmart/seller/register" element={<ProtectedRoute><CropMartSellerRegister /></ProtectedRoute>} />
          <Route path="/cropmart/seller/dashboard" element={<ProtectedRoute><CropMartSellerDashboard /></ProtectedRoute>} />
          <Route path="/cropmart/seller/products/new" element={<ProtectedRoute><CropMartAddProduct /></ProtectedRoute>} />
          <Route path="/cropmart/seller/products/:id/edit" element={<ProtectedRoute><CropMartAddProduct /></ProtectedRoute>} />
          <Route path="/cropmart/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><CropMartAdminPanel /></ProtectedRoute>} />
          
>>>>>>> Stashed changes
          {/* We keep other existing routes out of this scope for simplicity as per requirement, or we could leave them. The prompt asks to redesign the frontend. */}
        </Routes>
      </Layout>
    </Router>
  );
}
