import React, { Fragment, ReactNode } from 'react';
import { REACT_APP_ENV } from '../env';

interface BehindFeatureFlagProps {
  children: ReactNode;
  // Rendered in prod instead of the flagged content, so a redesign can keep
  // the current UI live until the flag is removed.
  fallback?: ReactNode;
}

function BehindFeatureFlag({
  children,
  fallback = null
}: BehindFeatureFlagProps) {
  if (REACT_APP_ENV === 'prod') {
    return <Fragment>{fallback}</Fragment>;
  }

  return <Fragment>{children}</Fragment>;
}

export default BehindFeatureFlag;
