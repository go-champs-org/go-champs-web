import React, { useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';

interface WithOrganizationsProps {
  getOrganizations: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withOrganizations = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithOrganizations: React.FC<T & WithOrganizationsProps> = props => {
    const { getOrganizations } = props;

    useEffect(() => {
      getOrganizations();
      return () => undefined;
    }, [getOrganizations]);

    return <WrappedComponent {...props} />;
  };

  return WithOrganizations;
};

export default withOrganizations;
