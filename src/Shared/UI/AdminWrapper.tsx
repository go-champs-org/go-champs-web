import React, { Fragment, ReactNode } from 'react';

export const NotAuthenticatedWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  if (!localStorage.getItem('token')) {
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
