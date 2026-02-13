import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Dumbbell, UserCheck, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/admin/members', label: 'Members', icon: Users },
    { path: '/admin/exercises', label: 'Exercises', icon: Dumbbell },
    { path: '/admin/trainers', label: 'Trainers', icon: UserCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div style={styles.layout}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        .admin-nav-item {
          transition: all 0.3s ease;
        }
        .admin-nav-item:hover {
          background: rgba(255, 107, 53, 0.15) !important;
          transform: translateX(4px);
        }
      `}</style>

      <nav style={styles.topNav}>
        <div style={styles.navBrand} onClick={() => navigate('/admin/members')}>
          <LayoutDashboard size={28} color="#FF6B35" />
          <span style={styles.brandText}>GYM ADMIN</span>
        </div>

        <div style={styles.navLinks}>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.path}
                className="admin-nav-item"
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
    gap: '8px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    color: '#8892b0',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
  },
  navItemActive: {
    background: 'rgba(255, 107, 53, 0.2)',
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
    transition: 'all 0.3s ease',
  },
  mainContent: {
    minHeight: 'calc(100vh - 70px)',
  },
};

export default AdminLayout;
