import React from 'react';
import Header from '../components/Header';
import ExpertSelection from '../components/ExpertSelection';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const ExpertSelectionPage = () => {
  return (
    <>
      <Header activePage="experts" />
      <Breadcrumb title="Choose Expert" currentPage="Select Your Trainer" />
      <ExpertSelection />
      <Footer />
    </>
  );
};

export default ExpertSelectionPage;