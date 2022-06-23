import { Layout } from 'components/layout';
import { SignInPage } from 'pages/sign-in-page';
import { SignUpPage } from 'pages/sign-up-page';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const ROUTES = {
  MAIN: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
};

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<Layout />} />
      <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
    </Routes>
  );
};

export default Router;
