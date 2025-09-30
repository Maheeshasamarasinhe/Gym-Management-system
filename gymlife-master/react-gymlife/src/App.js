import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;