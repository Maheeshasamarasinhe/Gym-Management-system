import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const BlogPage = () => {
  return (
    <>
      <Preloader />
      <Header activePage="blog" />
      <Breadcrumb title="Our Blog" currentPage="Blog" />
      <BlogSection />
      <Footer />
    </>
  );
};

export default BlogPage;