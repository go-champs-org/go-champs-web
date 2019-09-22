import React, { ReactNode } from 'react';

interface ComponentLoaderProps {
  canRender: boolean;
  children: ReactNode;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({
  canRender,
  children
}) => {
  if (canRender) {
    return <div>{children}</div>;
  }

  return <div>Loading...</div>;
};

export default ComponentLoader;
