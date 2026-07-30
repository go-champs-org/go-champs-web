import React, { ReactNode } from 'react';
import './Shimmer.scss';

const Shimmer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="shimmer">{children}</div>
);

export default Shimmer;
