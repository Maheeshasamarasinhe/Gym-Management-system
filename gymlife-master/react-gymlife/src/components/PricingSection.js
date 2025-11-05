import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PricingSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [fromExpert, setFromExpert] = useState(false);

  useEffect(() => {
    const expert = localStorage.getItem('selectedExpert');
    if (expert) {
      setSelectedExpert(JSON.parse(expert));
    }
    setFromExpert(location.search.includes('from=expert'));
  }, [location]);

  const handleSelectPlan = (planName, price) => {
    const planData = { name: planName, price };
    localStorage.setItem('selectedPlan', JSON.stringify(planData));
    
    if (fromExpert) {
      navigate('/register?from=pricing');
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="pricing-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Our Plan</span>
              <h2>Choose your pricing plan</h2>
              {selectedExpert && (
                <p style={{ color: '#c4c4c4', marginTop: '10px' }}>
                  Selected Expert: <span style={{ color: '#f36100' }}>{selectedExpert.name}</span> - {selectedExpert.specialty}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>Class drop-in</h3>
              <div className="pi-price">
                <h2>$ 39.0</h2>
                <span>SINGLE CLASS</span>
              </div>
              <ul>
                <li>Free riding</li>
                <li>Unlimited equipments</li>
                <li>Personal trainer</li>
                <li>Weight losing classes</li>
                <li>Month to mouth</li>
                <li>No time restriction</li>
              </ul>
              <button 
                onClick={() => handleSelectPlan('Class drop-in', '$39.0')}
                className="primary-btn pricing-btn"
              >
                Select Plan
              </button>
              <a href="#" className="thumb-icon"><i className="fa fa-picture-o"></i></a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>12 Month unlimited</h3>
              <div className="pi-price">
                <h2>$ 99.0</h2>
                <span>SINGLE CLASS</span>
              </div>
              <ul>
                <li>Free riding</li>
                <li>Unlimited equipments</li>
                <li>Personal trainer</li>
                <li>Weight losing classes</li>
                <li>Month to mouth</li>
                <li>No time restriction</li>
              </ul>
              <button 
                onClick={() => handleSelectPlan('12 Month unlimited', '$99.0')}
                className="primary-btn pricing-btn"
              >
                Select Plan
              </button>
              <a href="#" className="thumb-icon"><i className="fa fa-picture-o"></i></a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>6 Month unlimited</h3>
              <div className="pi-price">
                <h2>$ 59.0</h2>
                <span>SINGLE CLASS</span>
              </div>
              <ul>
                <li>Free riding</li>
                <li>Unlimited equipments</li>
                <li>Personal trainer</li>
                <li>Weight losing classes</li>
                <li>Month to mouth</li>
                <li>No time restriction</li>
              </ul>
              <button 
                onClick={() => handleSelectPlan('6 Month unlimited', '$59.0')}
                className="primary-btn pricing-btn"
              >
                Select Plan
              </button>
              <a href="#" className="thumb-icon"><i className="fa fa-picture-o"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;