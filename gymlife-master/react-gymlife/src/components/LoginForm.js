import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      login(user);
      
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setError('Invalid credentials or role selection');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title">
              <span>Login</span>
              <h2>Access Your Account</h2>
            </div>
            <div className="contact-widget">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ color: '#f36100', marginBottom: '20px', textAlign: 'center' }}>
                    {error}
                  </div>
                )}
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#ffffff', display: 'block', marginBottom: '8px' }}>
                    Login As:
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '50px',
                      border: '1px solid #363636',
                      background: 'transparent',
                      color: '#c4c4c4',
                      paddingLeft: '20px'
                    }}
                  >
                    <option value="user" style={{ background: '#151515' }}>User</option>
                    <option value="admin" style={{ background: '#151515' }}>Admin</option>
                  </select>
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    height: '50px',
                    border: '1px solid #363636',
                    background: 'transparent',
                    color: '#c4c4c4',
                    paddingLeft: '20px',
                    marginBottom: '20px'
                  }}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    height: '50px',
                    border: '1px solid #363636',
                    background: 'transparent',
                    color: '#c4c4c4',
                    paddingLeft: '20px',
                    marginBottom: '30px'
                  }}
                />

                <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                  Login
                </button>
              </form>

              <div style={{ marginTop: '30px', textAlign: 'center', color: '#c4c4c4' }}>
                <h5 style={{ color: '#ffffff', marginBottom: '15px' }}>Demo Accounts:</h5>
                <p>Admin: admin@gym.com / admin123</p>
                <p>User: user@gym.com / user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;