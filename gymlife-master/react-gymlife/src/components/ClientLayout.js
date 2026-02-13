import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Apple, DollarSign, Calendar, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ClientLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/client/home', label: 'Home', icon: Home },
    { path: '/client/schedule', label: 'Schedule', icon: Dumbbell },
    { path: '/client/nutrition', label: 'Nutrition', icon: Apple },
    { path: '/client/payments', label: 'Payments', icon: DollarSign },
    { path: '/client/attendance', label: 'Attendance', icon: Calendar },
    { path: '/client/notifications', label: 'Notifications', icon: Bell },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.layout}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        .client-nav-item {
          transition: all 0.3s ease;
          position: relative;
        }
        .client-nav-item:hover {
          color: #FF6B35 !important;
        }
        .client-nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 24px;
          height: 3px;
          background: #FF6B35;
          border-radius: 2px;
          transition: transform 0.3s ease;
        }
        .client-nav-item:hover::after,
        .client-nav-item.active::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>

      <nav style={styles.topNav}>
        <div style={styles.navBrand} onClick={() => navigate('/client/home')}>
          <Dumbbell size={28} color="#FF6B35" />
          <span style={styles.brandText}>GYMLIFE</span>
        </div>

        <div style={styles.navLinks}>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.path}
                className={`client-nav-item ${isActive(item.path) ? 'active' : ''}`}
                style={{
                  ...styles.navItem,
                  ...(isActive(item.path) ? styles.navItemActive : {})
                }}
                onClick={() => navigate(item.path)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        <button style={styles.logoutButton} onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>

      <main style={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

const styles = {
  layout: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    fontFamily: "'Work Sans', sans-serif",
  },
  topNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '70px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(12px)',
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  brandText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '28px',
    color: '#fff',
    letterSpacing: '3px',
  },
  navLinks: {
    display: 'flex',
    gap: '4px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '8px',
    color: '#8892b0',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  navItemActive: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    borderRadius: '8px',
    color: '#FF6B6B',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  mainContent: {
    minHeight: 'calc(100vh - 70px)',
  },
};

export default ClientLayout;
