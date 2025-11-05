import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    weight: '',
    height: '',
    fitnessLevel: 'Beginner'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const expert = localStorage.getItem('selectedExpert');
    const plan = localStorage.getItem('selectedPlan');
    if (expert) setSelectedExpert(JSON.parse(expert));
    if (plan) setSelectedPlan(JSON.parse(plan));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Registration successful! You can now login.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
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
          <div className="col-lg-8 offset-lg-2">
            <div className="section-title">
              <span>Join Us</span>
              <h2>Start Your Fitness Journey</h2>
              {selectedExpert && (
                <p style={{ color: '#c4c4c4', marginTop: '10px' }}>
                  Expert: <span style={{ color: '#f36100' }}>{selectedExpert.name}</span> - {selectedExpert.specialty}
                </p>
              )}
              {selectedPlan && (
                <p style={{ color: '#c4c4c4', marginTop: '5px' }}>
                  Plan: <span style={{ color: '#f36100' }}>{selectedPlan.name}</span> - {selectedPlan.price}
                </p>
              )}
            </div>
            <div className="contact-widget">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ color: '#f36100', marginBottom: '20px', textAlign: 'center' }}>
                    {error}
                  </div>
                )}
                {success && (
                  <div style={{ color: '#4CAF50', marginBottom: '20px', textAlign: 'center' }}>
                    {success}
                  </div>
                )}

                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
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
                  </div>
                  <div className="col-lg-6">
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
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
                        marginBottom: '20px'
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <input
                      type="text"
                      name="weight"
                      placeholder="Weight (kg)"
                      value={formData.weight}
                      onChange={handleChange}
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
                  </div>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      name="height"
                      placeholder="Height (cm)"
                      value={formData.height}
                      onChange={handleChange}
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
                  </div>
                  <div className="col-lg-4">
                    <select
                      name="fitnessLevel"
                      value={formData.fitnessLevel}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        height: '50px',
                        border: '1px solid #363636',
                        background: 'transparent',
                        color: '#c4c4c4',
                        paddingLeft: '20px',
                        marginBottom: '20px'
                      }}
                    >
                      <option value="Beginner" style={{ background: '#151515' }}>Beginner</option>
                      <option value="Intermediate" style={{ background: '#151515' }}>Intermediate</option>
                      <option value="Advanced" style={{ background: '#151515' }}>Advanced</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                  Register Now
                </button>
              </form>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ color: '#c4c4c4' }}>
                  Already have an account? 
                  <a href="/login" style={{ color: '#f36100', marginLeft: '5px' }}>Login here</a>
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