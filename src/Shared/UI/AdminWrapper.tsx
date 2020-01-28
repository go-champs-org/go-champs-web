import React, { Fragment, ReactNode } from 'react';

const AdminWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (process.env.REACT_APP_APP_MODE === 'adm') {
    return <Fragment>{children}</Fragment>;
  }

  return <div></div>;
};

export default AdminWrapper;
