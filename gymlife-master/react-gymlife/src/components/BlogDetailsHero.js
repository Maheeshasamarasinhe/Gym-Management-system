import React from 'react';

const BlogDetailsHero = () => {
  return (
    <section className="blog-details-hero set-bg" style={{ backgroundImage: 'url(/img/blog/details/details-hero.jpg)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="bh-text">
              <h3>Fitness: The best exercise to lose belly fat and tone up...</h3>
              <ul>
                <li>Feb 15, 2019</li>
                <li>20 Comment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHero;