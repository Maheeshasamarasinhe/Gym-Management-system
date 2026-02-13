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
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');
        
        .admin-nav-item {
          transition: all 0.3s ease;
        }
        .admin-nav-item:hover {
          background: #252525 !important;
          color: #f36100 !important;
        }
      `}</style>

      <nav style={styles.topNav}>
        <div style={styles.navBrand} onClick={() => navigate('/admin/members')}>
          <LayoutDashboard size={28} color="#f36100" />
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
    padding: '10px 20px',
    borderRadius: '0',
    color: '#a9a9a9',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    fontFamily: "'Oswald', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  navItemActive: {
    background: '#252525',
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
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  mainContent: {
    minHeight: 'calc(100vh - 70px)',
  },
};

export default AdminLayout;
