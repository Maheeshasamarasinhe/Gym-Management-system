import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="testimonial-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Testimonial</span>
              <h2>Our client say</h2>
            </div>
          </div>
        </div>
        <div className="ts_slider">
          <div className="ts_item">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="ti_pic">
                  <img src="/img/testimonial/testimonial-1.jpg" alt="" />
                </div>
                <div className="ti_text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt<br /> ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                    gravida. Risus commodo<br /> viverra maecenas accumsan lacus vel facilisis.</p>
                  <h5>Marshmello Gomez</h5>
                  <div className="tt-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
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

export default TestimonialSection;