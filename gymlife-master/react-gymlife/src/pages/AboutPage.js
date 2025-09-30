import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ChoseUsSection from '../components/ChoseUsSection';
import AboutUsSection from '../components/AboutUsSection';
import TeamSection from '../components/TeamSection';
import BannerSection from '../components/BannerSection';
import TestimonialSection from '../components/TestimonialSection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <Preloader />
      <Header activePage="about" />
      <Breadcrumb title="About us" currentPage="About" />
      <ChoseUsSection />
      <AboutUsSection />
      <TeamSection />
      <BannerSection />
      <TestimonialSection />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default AboutPage;