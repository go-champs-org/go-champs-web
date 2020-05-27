import React, { Fragment, ReactNode } from 'react';

export const NotAuthenticatedWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (
    process.env.REACT_APP_APP_MODE !== 'adm' ||
    !localStorage.getItem('token')
  ) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export const AdminWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (process.env.REACT_APP_APP_MODE === 'adm') {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

const AuthenticatedWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (localStorage.getItem('token')) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export default AuthenticatedWrapper;
