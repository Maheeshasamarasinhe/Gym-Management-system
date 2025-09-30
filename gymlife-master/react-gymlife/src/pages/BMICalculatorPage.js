import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import BMICalculatorSection from '../components/BMICalculatorSection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const BMICalculatorPage = () => {
  return (
    <>
      <Preloader />
      <Header />
      <Breadcrumb title="BMI Calculator" currentPage="Bmi calculate" />
      <BMICalculatorSection />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default BMICalculatorPage;