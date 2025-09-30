import React from 'react';

const AboutUsSection = () => {
  return (
    <section className="aboutus-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 p-0">
            <div className="about-video set-bg" style={{ backgroundImage: 'url(/img/about-us.jpg)' }}>
              <a href="https://www.youtube.com/watch?v=EzKkl64rRbM" className="play-btn video-popup">
                <i className="fa fa-caret-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-6 p-0">
            <div className="about-text">
              <div className="section-title">
                <span>About Us</span>
                <h2>What we have done</h2>
              </div>
              <div className="at-desc">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                  viverra maecenas accumsan lacus vel facilisis. aliquip ex ea commodo consequat sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor.</p>
              </div>
              <div className="about-bar">
                <div className="ab-item">
                  <p>Body building</p>
                  <div className="barfiller">
                    <span className="fill" data-percentage="80"></span>
                    <div className="tipWrap">
                      <span className="tip">80%</span>
                    </div>
                  </div>
                </div>
                <div className="ab-item">
                  <p>Training</p>
                  <div className="barfiller">
                    <span className="fill" data-percentage="85"></span>
                    <div className="tipWrap">
                      <span className="tip">85%</span>
                    </div>
                  </div>
                </div>
                <div className="ab-item">
                  <p>Fitness</p>
                  <div className="barfiller">
                    <span className="fill" data-percentage="75"></span>
                    <div className="tipWrap">
                      <span className="tip">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;