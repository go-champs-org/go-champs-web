import React, { ReactNode } from 'react';
import screenLoader from '../../assets/screen-loader.gif';
import './PageLoader.scss';

interface PageLoaderProps {
  canRender: boolean;
  children: ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ canRender, children }) => {
  if (canRender) {
    return <div>{children}</div>;
  }

  return (
    <div className="page-loader">
      <img src={screenLoader} alt="Loading tournament" />
    </div>
  );
};

export default PageLoader;
