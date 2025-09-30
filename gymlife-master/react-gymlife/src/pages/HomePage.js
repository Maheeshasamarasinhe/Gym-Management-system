import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ChoseUsSection from '../components/ChoseUsSection';
import ClassesSection from '../components/ClassesSection';
import BannerSection from '../components/BannerSection';
import PricingSection from '../components/PricingSection';
import GallerySection from '../components/GallerySection';
import TeamSection from '../components/TeamSection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Preloader />
      <Header activePage="home" />
      <HeroSection />
      <ChoseUsSection />
      <ClassesSection />
      <BannerSection />
      <PricingSection />
      <GallerySection />
      <TeamSection />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default HomePage;