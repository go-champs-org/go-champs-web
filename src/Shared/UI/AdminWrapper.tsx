import React, { ReactNode } from 'react';

const AdminWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (process.env.REACT_APP_APP_MODE === 'adm') {
    return <div>{children}</div>;
  }

  return <div></div>;
};

export default AdminWrapper;
