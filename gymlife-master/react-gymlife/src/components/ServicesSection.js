import React from 'react';

const ServicesSection = () => {
  return (
    <section className="services-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>What we do?</span>
              <h2>PUSH YOUR LIMITS FORWARD</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 order-lg-1 col-md-6 p-0">
            <div className="ss-pic">
              <img src="/img/services/services-1.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-3 order-lg-2 col-md-6 p-0">
            <div className="ss-text">
              <h4>Personal training</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore
                facilisis.</p>
              <a href="#">Explore</a>
            </div>
          </div>
          <div className="col-lg-3 order-lg-3 col-md-6 p-0">
            <div className="ss-pic">
              <img src="/img/services/services-2.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-3 order-lg-4 col-md-6 p-0">
            <div className="ss-text">
              <h4>Group fitness classes</h4>
              <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.</p>
              <a href="#">Explore</a>
            </div>
          </div>
          <div className="col-lg-3 order-lg-8 col-md-6 p-0">
            <div className="ss-pic">
              <img src="/img/services/services-4.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-3 order-lg-7 col-md-6 p-0">
            <div className="ss-text second-row">
              <h4>Body building</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore
                facilisis.</p>
              <a href="#">Explore</a>
            </div>
          </div>
          <div className="col-lg-3 order-lg-6 col-md-6 p-0">
            <div className="ss-pic">
              <img src="/img/services/services-3.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-3 order-lg-5 col-md-6 p-0">
            <div className="ss-text second-row">
              <h4>Strength training</h4>
              <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.</p>
              <a href="#">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;