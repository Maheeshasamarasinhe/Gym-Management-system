import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import TeamSection from '../components/TeamSection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const TeamPage = () => {
  return (
    <>
      <Preloader />
      <Header />
      <Breadcrumb title="Our Team" currentPage="Our team" />
      <TeamSection />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default TeamPage;