import { Layout } from 'components/layout';
import { SignInPage } from 'pages/sign-in-page';
import { SignUpPage } from 'pages/sign-up-page';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { PrivateRoute } from 'components/routes/private-route';
import { PublicRoute } from 'components/routes/public-route';

const Router = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.MAIN}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.SIGN_IN}
        element={
          <PublicRoute restricted={true}>
            <SignInPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.SIGN_UP}
        element={
          <PublicRoute restricted={true}>
            <SignUpPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default Router;
