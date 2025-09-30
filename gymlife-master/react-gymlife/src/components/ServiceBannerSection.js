import React from 'react';

const ServiceBannerSection = () => {
  return (
    <section className="banner-section set-bg" style={{ backgroundImage: 'url(/img/banner-bg.jpg)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="bs-text service-banner">
              <h2>Exercise until the body obeys.</h2>
              <div className="bt-tips">Where health, beauty and fitness meet.</div>
              <a href="https://www.youtube.com/watch?v=EzKkl64rRbM" className="play-btn video-popup">
                <i className="fa fa-caret-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBannerSection;