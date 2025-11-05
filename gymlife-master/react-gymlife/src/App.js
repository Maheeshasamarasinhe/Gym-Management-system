import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
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
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="/user-dashboard" element={<UserDashboardPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;