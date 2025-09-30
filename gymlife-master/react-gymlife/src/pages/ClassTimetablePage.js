import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ClassTimetableSection from '../components/ClassTimetableSection';
import GetInTouch from '../components/GetInTouch';
import Footer from '../components/Footer';

const ClassTimetablePage = () => {
  return (
    <>
      <Preloader />
      <Header />
      <Breadcrumb title="Classes Timetable" currentPage="Classes timetable" />
      <ClassTimetableSection />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default ClassTimetablePage;