import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <>
      <Preloader />
      <Header activePage="contact" />
      <Breadcrumb title="Contact" currentPage="Contact" />
      <ContactSection />
      <Footer />
    </>
  );
};

export default ContactPage;