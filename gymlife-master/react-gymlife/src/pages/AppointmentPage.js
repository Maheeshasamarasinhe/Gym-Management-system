import React from 'react';
import Header from '../components/Header';
import AppointmentOptions from '../components/AppointmentOptions';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const AppointmentPage = () => {
  return (
    <>
      <Header activePage="appointment" />
      <Breadcrumb title="Appointment" currentPage="Book Appointment" />
      <AppointmentOptions />
      <Footer />
    </>
  );
};

export default AppointmentPage;