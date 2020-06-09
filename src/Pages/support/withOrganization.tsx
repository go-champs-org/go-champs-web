import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';

interface WithOrganizationProps {
  getOrganizationBySlug: (
    organizationSlug: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withOrganization = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithOrganization: React.FC<T & WithOrganizationProps> = props => {
    const { getOrganizationBySlug } = props;
    const {
      params: { organizationSlug }
    } = useRouteMatch();
    useEffect(() => {
      if (organizationSlug) {
        getOrganizationBySlug(organizationSlug);
      }

      return () => undefined;
    }, [organizationSlug, getOrganizationBySlug]);

    return <WrappedComponent {...props} />;
  };

  return WithOrganization;
};

export default withOrganization;
