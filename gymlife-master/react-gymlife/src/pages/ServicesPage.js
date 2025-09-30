import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ServicesSection from '../components/ServicesSection';
import ServiceBannerSection from '../components/ServiceBannerSection';
import PricingSection from '../components/PricingSection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const ServicesPage = () => {
  return (
    <>
      <Preloader />
      <Header activePage="services" />
      <Breadcrumb title="Services" currentPage="Services" />
      <ServicesSection />
      <ServiceBannerSection />
      <PricingSection />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default ServicesPage;