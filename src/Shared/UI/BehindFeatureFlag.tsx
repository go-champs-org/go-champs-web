import React, { Fragment, ReactNode } from 'react';

function BehindFeatureFlag({ children }: { children: ReactNode }) {
  if (process.env.REACT_APP_ENV === 'prod') {
    return <Fragment></Fragment>;
  }

  return <Fragment>{children}</Fragment>;
}

export default BehindFeatureFlag;
