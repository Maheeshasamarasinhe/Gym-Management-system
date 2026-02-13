import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GymDataProvider } from './context/GymDataContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import GalleryPage from './pages/GalleryPage';
import ClassDetailsPage from './pages/ClassDetailsPage';
import ClassTimetablePage from './pages/ClassTimetablePage';
import BMICalculatorPage from './pages/BMICalculatorPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AppointmentPage from './pages/AppointmentPage';
import ExpertSelectionPage from './pages/ExpertSelectionPage';
import PricingPage from './pages/PricingPage';

// Admin pages
import AdminLayout from './components/AdminLayout';
import AdminLandingPage from './components/AdminLandingPage';
import AdminMemberPage from './components/AdminMemberPage';
import AdminExercisePage from './components/AdminExercisePage';
import AdminTrainersPage from './components/AdminTrainersPage';

// Client pages
import ClientLayout from './components/ClientLayout';
import ClientHomePage from './components/ClientHomePage';
import ClientSchedulePage from './components/ClientSchedulePage';
import ClientNutritionPage from './components/ClientNutritionPage';
import ClientPaymentHistoryPage from './components/ClientPaymentHistoryPage';
import ClientAttendancePage from './components/ClientAttendancePage';
import ClientNotificationsPage from './components/ClientNotificationsPage';

// Route guard for admin-only routes
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/client/home" replace />;
  return children;
};

// Route guard for client-only routes
const ClientRoute = ({ children }) => {
  const { user, isClient } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isClient) return <Navigate to="/admin/members" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <GymDataProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog-details" element={<BlogDetailsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/class-details" element={<ClassDetailsPage />} />
              <Route path="/class-timetable" element={<ClassTimetablePage />} />
              <Route path="/bmi-calculator" element={<BMICalculatorPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/experts" element={<ExpertSelectionPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              {/* Legacy dashboard redirects */}
              <Route path="/admin-dashboard" element={<Navigate to="/admin/members" replace />} />
              <Route path="/user-dashboard" element={<Navigate to="/client/home" replace />} />

              {/* Admin Routes */}
              <Route path="/admin/members" element={<AdminRoute><AdminLayout><AdminLandingPage /></AdminLayout></AdminRoute>} />
              <Route path="/admin/members/:memberId" element={<AdminRoute><AdminLayout><AdminMemberPage /></AdminLayout></AdminRoute>} />
              <Route path="/admin/exercises" element={<AdminRoute><AdminLayout><AdminExercisePage /></AdminLayout></AdminRoute>} />
              <Route path="/admin/trainers" element={<AdminRoute><AdminLayout><AdminTrainersPage /></AdminLayout></AdminRoute>} />

              {/* Client Routes */}
              <Route path="/client/home" element={<ClientRoute><ClientLayout><ClientHomePage /></ClientLayout></ClientRoute>} />
              <Route path="/client/schedule" element={<ClientRoute><ClientLayout><ClientSchedulePage /></ClientLayout></ClientRoute>} />
              <Route path="/client/nutrition" element={<ClientRoute><ClientLayout><ClientNutritionPage /></ClientLayout></ClientRoute>} />
              <Route path="/client/payments" element={<ClientRoute><ClientLayout><ClientPaymentHistoryPage /></ClientLayout></ClientRoute>} />
              <Route path="/client/attendance" element={<ClientRoute><ClientLayout><ClientAttendancePage /></ClientLayout></ClientRoute>} />
              <Route path="/client/notifications" element={<ClientRoute><ClientLayout><ClientNotificationsPage /></ClientLayout></ClientRoute>} />
            </Routes>
          </div>
        </Router>
      </GymDataProvider>
    </AuthProvider>
  );
}

export default App;