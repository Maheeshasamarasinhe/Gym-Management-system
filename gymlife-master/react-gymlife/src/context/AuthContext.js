import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user session from localStorage
    const savedUser = localStorage.getItem('gymUser');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      // Clear stale data
      localStorage.removeItem('gymUser');
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  const login = (authResponse) => {
    // authResponse = { token, email, role, userId }
    const userData = {
      id: authResponse.userId,
      email: authResponse.email,
      role: authResponse.role,  // ADMIN | TRAINER | CLIENT
    };
    setUser(userData);
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('gymUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gymUser');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin: user?.role === 'ADMIN',
    isTrainer: user?.role === 'TRAINER',
    isClient: user?.role === 'CLIENT',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};