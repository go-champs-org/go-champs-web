import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

const AuthenticatedRoute: React.FC = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Redirect to="/SignIn" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthenticatedRoute;
