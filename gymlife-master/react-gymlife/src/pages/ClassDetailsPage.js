import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ClassDetailsSection from '../components/ClassDetailsSection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const ClassDetailsPage = () => {
  return (
    <>
      <Preloader />
      <Header />
      <Breadcrumb title="Classes" currentPage="Classes" />
      <ClassDetailsSection />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default ClassDetailsPage;