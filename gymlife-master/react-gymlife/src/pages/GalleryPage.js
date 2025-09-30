import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import GallerySection from '../components/GallerySection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const GalleryPage = () => {
  return (
    <>
      <Preloader />
      <Header />
      <Breadcrumb title="Gallery" currentPage="Gallery" />
      <div className="gallery-section gallery-page spad">
        <GallerySection />
      </div>
      <GetInTouch />
      <Footer />
    </>
  );
};

export default GalleryPage;