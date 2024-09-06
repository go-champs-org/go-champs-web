import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_KEY } from './constants';

const AuthenticatedRoute: React.FC = ({ children }) => {
  const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (!isAuthenticated) {
    return <Redirect to="/SignIn" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthenticatedRoute;
