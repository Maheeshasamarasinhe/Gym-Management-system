import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CLIENT'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      let response;
      if (formData.role === 'ADMIN') {
        response = await authAPI.registerAdmin(registerData);
      } else if (formData.role === 'TRAINER') {
        response = await authAPI.registerTrainer(registerData);
      } else {
        response = await authAPI.registerClient(registerData);
      }

      const authData = response.data; // { token, email, role, userId }

      setSuccess('Registration successful! Redirecting...');

      // Auto-login after registration
      login(authData);

      setTimeout(() => {
        if (authData.role === 'ADMIN' || authData.role === 'TRAINER') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        // Handle validation errors (field-level)
        if (data.details) {
          const messages = Object.values(data.details).join('. ');
          setError(messages);
        } else {
          setError(data.message || data.error || 'Registration failed');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
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

  const inputStyle = {
    width: '100%',
    height: '50px',
    border: '1px solid #363636',
    background: 'transparent',
    color: '#c4c4c4',
    paddingLeft: '20px',
    marginBottom: '20px'
  };

  return (
    <section className="contact-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title">
              <span>Join Us</span>
              <h2>Create Your Account</h2>
            </div>
            <div className="contact-widget">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ color: '#f36100', marginBottom: '20px', textAlign: 'center', padding: '10px', border: '1px solid #f36100', borderRadius: '4px' }}>
                    {error}
                  </div>
                )}
                {success && (
                  <div style={{ color: '#4CAF50', marginBottom: '20px', textAlign: 'center', padding: '10px', border: '1px solid #4CAF50', borderRadius: '4px' }}>
                    {success}
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#ffffff', display: 'block', marginBottom: '8px' }}>
                    Register As:
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
                    <option value="CLIENT" style={{ background: '#151515' }}>Client</option>
                    <option value="ADMIN" style={{ background: '#151515' }}>Admin</option>
                    <option value="TRAINER" style={{ background: '#151515' }}>Trainer</option>
                  </select>
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  style={inputStyle}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  style={{ ...inputStyle, marginBottom: '30px' }}
                />

                <button
                  type="submit"
                  className="primary-btn"
                  style={{ width: '100%', opacity: isLoading ? 0.7 : 1 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Register Now'}
                </button>
              </form>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ color: '#c4c4c4' }}>
                  Already have an account?
                  <Link to="/login" style={{ color: '#f36100', marginLeft: '5px' }}>Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;