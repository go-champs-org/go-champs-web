import React, { Fragment, ReactNode } from 'react';

interface ComponentLoaderProps {
  canRender: boolean;
  children: ReactNode;
  loader: ReactNode;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({
  canRender,
  children,
  loader
}) => {
  if (canRender) {
    return <Fragment>{children}</Fragment>;
  }

  return <Fragment>{loader}</Fragment>;
};

export default ComponentLoader;
