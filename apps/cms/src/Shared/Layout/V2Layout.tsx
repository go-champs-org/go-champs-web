import React from 'react';

interface V2LayoutProps {
  children: React.ReactNode;
}

/**
 * V2Layout is a minimal passthrough component.
 * V2 pages are self-contained with their own ThemeV2Provider, NavBar, and Footer.
 */
const V2Layout: React.FC<V2LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default V2Layout;
