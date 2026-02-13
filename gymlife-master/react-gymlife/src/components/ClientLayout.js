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
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');
        
        .client-nav-item {
          transition: all 0.3s ease;
          position: relative;
        }
        .client-nav-item:hover {
          color: #f36100 !important;
        }
        .client-nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 24px;
          height: 3px;
          background: #f36100;
          border-radius: 0;
          transition: transform 0.3s ease;
        }
        .client-nav-item:hover::after,
        .client-nav-item.active::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>

      <nav style={styles.topNav}>
        <div style={styles.navBrand} onClick={() => navigate('/client/home')}>
          <Dumbbell size={28} color="#f36100" />
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
    background: '#151515',
    fontFamily: "'Muli', sans-serif",
  },
  topNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '70px',
    background: '#0a0a0a',
    borderBottom: '2px solid #252525',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  brandText: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    color: '#fff',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    fontWeight: '500',
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
    borderRadius: '0',
    color: '#a9a9a9',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: "'Oswald', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  navItemActive: {
    color: '#f36100',
    fontWeight: '600',
    borderBottom: '2px solid #f36100',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'transparent',
    border: '1px solid #f36100',
    borderRadius: '0',
    color: '#f36100',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  mainContent: {
    minHeight: 'calc(100vh - 70px)',
  },
};

export default ClientLayout;
