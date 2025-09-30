import React from 'react';

const BlogSection = () => {
  const blogPosts = [
    { id: 1, image: '/img/blog/blog-1.jpg', title: 'Fitness: The best exercise to lose belly fat and tone up...', date: 'Feb 15, 2019', comments: '20' },
    { id: 2, image: '/img/blog/blog-2.jpg', title: 'Physical fitness may help prevent depression, anxiety', date: 'Feb 15, 2019', comments: '20' },
    { id: 3, image: '/img/blog/blog-3.jpg', title: 'Fitness: The best exercise to lose belly fat and tone up...', date: 'Feb 15, 2019', comments: '20' }
  ];

  return (
    <section className="blog-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 p-0">
            {blogPosts.map(post => (
              <div key={post.id} className="blog-item">
                <div className="bi-pic">
                  <img src={post.image} alt="" />
                </div>
                <div className="bi-text">
                  <h5><a href="/blog-details">{post.title}</a></h5>
                  <ul>
                    <li><i className="fa fa-calendar"></i> {post.date}</li>
                    <li><i className="fa fa-comment-o"></i> {post.comments}</li>
                  </ul>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4 sidebar-option">
            <div className="so-categories">
              <h3 className="title">Categories</h3>
              <ul>
                <li><a href="#">Personal trainer <span>(20)</span></a></li>
                <li><a href="#">Fitness <span>(20)</span></a></li>
                <li><a href="#">Event <span>(9)</span></a></li>
                <li><a href="#">Gym <span>(44)</span></a></li>
                <li><a href="#">Sport nutrition <span>(14)</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;