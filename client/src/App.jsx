import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocaleProvider } from './context/LocaleContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import FarmerRegister from './pages/FarmerRegister';
import InvestorRegister from './pages/InvestorRegister';
import Marketplace from './pages/Marketplace';
import ListingDetail from './pages/ListingDetail';
import FarmerDashboard from './pages/FarmerDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ListingWizard from './pages/ListingWizard';
import GuidanceFeed from './pages/GuidanceFeed';
import FarmMonitor from './pages/FarmMonitor';
import DocumentGenerator from './pages/DocumentGenerator';
import FarmerSurveyForm from './pages/FarmerSurveyForm';
import FastEntryForm from './pages/FastEntryForm';

export default function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-brand-light flex flex-col font-body text-brand-dark">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register/farmer" element={<FarmerRegister />} />
                <Route path="/register/investor" element={<InvestorRegister />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/listing/:id" element={<ListingDetail />} />
                
                <Route path="/farmer/dashboard" element={
                  <ProtectedRoute allowedRoles={['FARMER']}><FarmerDashboard /></ProtectedRoute>
                } />
                <Route path="/farmer/new-listing" element={
                  <ProtectedRoute allowedRoles={['FARMER']}><ListingWizard /></ProtectedRoute>
                } />
                <Route path="/farmer/satellite" element={
                  <ProtectedRoute allowedRoles={['FARMER']}><FarmMonitor /></ProtectedRoute>
                } />
                <Route path="/farmer/guidance" element={
                  <ProtectedRoute allowedRoles={['FARMER']}><GuidanceFeed /></ProtectedRoute>
                } />
                
                <Route path="/investor/dashboard" element={
                  <ProtectedRoute allowedRoles={['INVESTOR']}><InvestorDashboard /></ProtectedRoute>
                } />
                
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
                } />
                <Route path="/documents" element={
                  <ProtectedRoute><DocumentGenerator /></ProtectedRoute>
                } />
                <Route path="/survey" element={
                  <FarmerSurveyForm />
                } />
                <Route path="/survey/fast-entry" element={
                  <FastEntryForm />
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </LocaleProvider>
  );
}
