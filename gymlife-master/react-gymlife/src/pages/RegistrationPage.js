import React from 'react';
import Header from '../components/Header';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const RegistrationPage = () => {
  return (
    <>
      <Header activePage="register" />
      <Breadcrumb title="Register" currentPage="Registration" />
      <RegistrationForm />
      <Footer />
    </>
  );
};

export default RegistrationPage;