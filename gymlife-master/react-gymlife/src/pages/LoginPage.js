import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const LoginPage = () => {
  return (
    <>
      <Header activePage="login" />
      <Breadcrumb title="Login" currentPage="Login" />
      <LoginForm />
      <Footer />
    </>
  );
};

export default LoginPage;