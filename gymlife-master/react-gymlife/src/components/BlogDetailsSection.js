import React from 'react';

const BlogDetailsSection = () => {
  return (
    <section className="blog-details-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 p-0">
            <div className="blog-details-text">
              <div className="blog-details-title">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h5>Fitness: The best exercise to lose belly fat and tone up...</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className="blog-details-pic">
                <div className="blog-details-pic-item">
                  <img src="/img/blog/details/details-1.jpg" alt="" />
                </div>
                <div className="blog-details-pic-item">
                  <img src="/img/blog/details/details-2.jpg" alt="" />
                </div>
              </div>
              <div className="blog-details-desc">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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

export default BlogDetailsSection;