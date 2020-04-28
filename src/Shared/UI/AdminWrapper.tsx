import React, { Fragment, ReactNode } from 'react';

export const NotAdminWrapper: React.FC<{ children: ReactNode }> = ({
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

const AdminWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (
    process.env.REACT_APP_APP_MODE === 'adm' &&
    localStorage.getItem('token')
  ) {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export default AdminWrapper;
