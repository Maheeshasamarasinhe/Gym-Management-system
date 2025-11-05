import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentOptions = () => {
  return (
    <section className="services-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Choose Your Path</span>
              <h2>Get Started Today</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Our Team Option */}
          <div className="col-lg-4 col-md-6">
            <div className="ss-pic">
              <img src="/img/services/services-1.jpg" alt="Our Team" />
            </div>
            <div className="ss-text">
              <h4>Our Team</h4>
              <p>TRAIN WITH EXPERTS</p>
              <p>Meet our professional trainers and get personalized guidance for your fitness journey.</p>
              <Link to="/experts">Choose Expert</Link>
            </div>
          </div>

          {/* Pricing Plan Option */}
          <div className="col-lg-4 col-md-6">
            <div className="ss-pic">
              <img src="/img/services/services-2.jpg" alt="Pricing Plans" />
            </div>
            <div className="ss-text">
              <h4>Choose Your Pricing Plan</h4>
              <p>FLEXIBLE MEMBERSHIP OPTIONS</p>
              <p>Select from our range of membership plans designed to fit your budget and fitness goals.</p>
              <Link to="/pricing">View Plans</Link>
            </div>
          </div>

          {/* Registration Option */}
          <div className="col-lg-4 col-md-6">
            <div className="ss-pic">
              <img src="/img/services/services-3.jpg" alt="Register Now" />
            </div>
            <div className="ss-text">
              <h4>Register Now</h4>
              <p>START YOUR FITNESS JOURNEY</p>
              <p>Create your account and join our gym community to begin your transformation today.</p>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentOptions;