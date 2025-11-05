import React from 'react';
import Header from '../components/Header';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const PricingPage = () => {
  return (
    <>
      <Header activePage="pricing" />
      <Breadcrumb title="Pricing Plans" currentPage="Membership Plans" />
      <PricingSection />
      <Footer />
    </>
  );
};

export default PricingPage;