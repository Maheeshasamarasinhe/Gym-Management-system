import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ activePage }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin, isClient } = useAuth();
  
  const getActiveClass = (page) => {
    if (activePage === page) return 'active';
    if (!activePage && location.pathname === '/') return 'active';
    return '';
  };

  return (
    <>
      {/* Offcanvas Menu Section */}
      <div className={`offcanvas-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}></div>
      <div className={`offcanvas-menu-wrapper ${isMobileMenuOpen ? 'show-offcanvas-menu-wrapper' : ''}`}>
        <div className="canvas-close" onClick={() => setIsMobileMenuOpen(false)}>
          <i className="fa fa-close"></i>
        </div>
        <div className="canvas-search search-switch" onClick={() => setIsSearchOpen(true)}>
          <i className="fa fa-search"></i>
        </div>
        <nav className="canvas-menu mobile-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/class-details">Classes</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><a href="#">Pages</a>
              <ul className="dropdown">
                <li><Link to="/about-us">About us</Link></li>
                <li><Link to="/class-timetable">Classes timetable</Link></li>
                <li><Link to="/bmi-calculator">Bmi calculate</Link></li>
                <li><Link to="/team">Our team</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/blog">Our blog</Link></li>
                <li><Link to="/404">404</Link></li>
              </ul>
            </li>
            <li><Link to="/contact">Contact</Link></li>
            {user ? (
              <>
                <li><Link to={isAdmin ? '/admin-dashboard' : '/user-dashboard'}>Dashboard</Link></li>
                <li><a href="#" onClick={logout}>Logout</a></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="canvas-social">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-youtube-play"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
        </div>
      </div>

      {/* Header Section */}
      <header className="header-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo">
                <Link to="/">
                  <img src="/img/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="nav-menu">
                <ul>
                  <li className={getActiveClass('home')}><Link to="/">Home</Link></li>
                  <li className={getActiveClass('about')}><Link to="/about-us">About Us</Link></li>
                  <li className={getActiveClass('classes')}><Link to="/class-details">Classes</Link></li>
                  <li className={getActiveClass('services')}><Link to="/services">Services</Link></li>
                  <li className={getActiveClass('team')}><Link to="/team">Our Team</Link></li>
                  <li><a href="#">Pages</a>
                    <ul className="dropdown">
                      <li><Link to="/about-us">About us</Link></li>
                      <li><Link to="/class-timetable">Classes timetable</Link></li>
                      <li><Link to="/bmi-calculator">Bmi calculate</Link></li>
                      <li><Link to="/team">Our team</Link></li>
                      <li><Link to="/gallery">Gallery</Link></li>
                      <li><Link to="/blog">Our blog</Link></li>
                      <li><Link to="/404">404</Link></li>
                    </ul>
                  </li>
                  <li className={getActiveClass('contact')}><Link to="/contact">Contact</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="top-option">
                <div className="to-search search-switch" onClick={() => setIsSearchOpen(true)}>
                  <i className="fa fa-search"></i>
                </div>
                {user ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Link 
                      to={isAdmin ? '/admin-dashboard' : '/user-dashboard'} 
                      style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none' }}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={logout}
                      style={{ 
                        background: 'transparent', 
                        border: '1px solid #f36100', 
                        color: '#f36100', 
                        padding: '5px 10px', 
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    style={{ 
                      background: '#f36100', 
                      color: '#ffffff', 
                      padding: '8px 15px', 
                      fontSize: '12px', 
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontWeight: '700'
                    }}
                  >
                    Login
                  </Link>
                )}
                <div className="to-social">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-youtube-play"></i></a>
                  <a href="#"><i className="fa fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="canvas-open" onClick={() => setIsMobileMenuOpen(true)}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <div className={`search-model ${isSearchOpen ? 'd-flex' : 'd-none'}`}>
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch" onClick={() => setIsSearchOpen(false)}>+</div>
          <form className="search-model-form">
            <input type="text" id="search-input" placeholder="Search here....." />
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;