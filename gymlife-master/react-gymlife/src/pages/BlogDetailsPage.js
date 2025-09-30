import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import BlogDetailsHero from '../components/BlogDetailsHero';
import BlogDetailsSection from '../components/BlogDetailsSection';
import Footer from '../components/Footer';

const BlogDetailsPage = () => {
  return (
    <>
      <Preloader />
      <Header />
      <BlogDetailsHero />
      <BlogDetailsSection />
      <Footer />
    </>
  );
};

export default BlogDetailsPage;