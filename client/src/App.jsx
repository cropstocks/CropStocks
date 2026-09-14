import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import InvestmentsPage from './pages/InvestmentsPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* We keep other existing routes out of this scope for simplicity as per requirement, or we could leave them. The prompt asks to redesign the frontend. */}
        </Routes>
      </Layout>
    </Router>
  );
}
