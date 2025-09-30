import React from 'react';

const ClassDetailsSection = () => {
  return (
    <section className="class-details-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="class-details-text">
              <div className="cd-pic">
                <img src="/img/classes/class-details/class-detailsl.jpg" alt="" />
              </div>
              <div className="cd-text">
                <div className="cd-single-item">
                  <h3>Kettlebell Power</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 sidebar-option">
            <div className="so-categories">
              <h3 className="title">Categories</h3>
              <ul>
                <li><a href="#">Personal trainer <span>(20)</span></a></li>
                <li><a href="#">Fitness <span>(20)</span></a></li>
                <li><a href="#">Event <span>(9)</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassDetailsSection;