import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section" >
      <div className="hs-slider">
        <div className="hs-item set-bg" style={{ backgroundImage: 'url(/img/hero/hero-1.jpg)', height: '100vh' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div className="hi-text" style={{ position: 'relative', top: 0, opacity: 1, zIndex: 10 }}>
                  <span style={{ position: 'relative', top: 0, opacity: 1, color: '#fff', display: 'block' }}>Shape your body</span>
                  <h1 style={{ position: 'relative', top: 0, opacity: 1, color: '#fff' }}>Be <strong>strong</strong> training hard</h1>
                  <a href="#" className="primary-btn" style={{ position: 'relative', top: 0, opacity: 1 }}>Get Start</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;