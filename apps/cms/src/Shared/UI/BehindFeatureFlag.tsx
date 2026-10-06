import React, { Fragment, ReactNode } from 'react';
import { REACT_APP_ENV } from '../env';

function BehindFeatureFlag({ children }: { children: ReactNode }) {
  if (REACT_APP_ENV === 'prod') {
    return <Fragment></Fragment>;
  }

  return <Fragment>{children}</Fragment>;
}

export default BehindFeatureFlag;
