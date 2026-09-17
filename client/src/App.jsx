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
import CropRegistration from './pages/CropRegistration';
import DeveloperDashboard from './pages/DeveloperDashboard';

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
          <Route path="/developer" element={<DeveloperDashboard />} />
          <Route path="/farmer/crop-registration" element={<CropRegistration />} />
          {/* We keep other existing routes out of this scope for simplicity as per requirement, or we could leave them. The prompt asks to redesign the frontend. */}
        </Routes>
      </Layout>
    </Router>
  );
}
