import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginType: 'CLIENT'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { getMemberByEmail } = useGymData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For demo: simulate login without backend
      // In production, replace with actual API calls
      if (!formData.email || !formData.password) {
        setError('Please enter email and password');
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // For CLIENT role, look up the member by email
      let userId = 'ADMIN001';
      if (formData.loginType === 'CLIENT') {
        const member = getMemberByEmail(formData.email);
        if (member) {
          userId = member.id;
        } else {
          // Default to M001 for demo if email not found
          userId = 'M001';
        }
      }

      // Simulate auth response
      const authData = {
        token: 'demo-token-' + Date.now(),
        email: formData.email,
        role: formData.loginType,
        userId: userId,
      };

      login(authData);

      if (formData.loginType === 'ADMIN') {
        navigate('/admin/members');
      } else {
        navigate('/client/home');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
                  <div style={{ color: '#f36100', marginBottom: '20px', textAlign: 'center', padding: '10px', border: '1px solid #f36100', borderRadius: '4px' }}>
                    {error}
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#ffffff', display: 'block', marginBottom: '8px' }}>
                    Login As:
                  </label>
                  <select
                    name="loginType"
                    value={formData.loginType}
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
                    <option value="CLIENT" style={{ background: '#151515' }}>Client</option>
                    <option value="TRAINER" style={{ background: '#151515' }}>Trainer</option>
                    <option value="ADMIN" style={{ background: '#151515' }}>Admin</option>
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
                  minLength={6}
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

                <button
                  type="submit"
                  className="primary-btn"
                  style={{ width: '100%', opacity: isLoading ? 0.7 : 1 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ color: '#c4c4c4' }}>
                  Don't have an account?
                  <Link to="/register" style={{ color: '#f36100', marginLeft: '5px' }}>Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;