import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';

interface WithRegistrationProps {
  getRegistration: (
    registrationId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  getTournamentBySlug: (
    organizationSlug: string,
    tournamentSlug: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withRegistration = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithRegistration: React.FC<T & WithRegistrationProps> = props => {
    const { getRegistration, getTournamentBySlug } = props;
    const {
      params: { registrationId, organizationSlug, tournamentSlug }
    } = useRouteMatch();
    useEffect(() => {
      if (organizationSlug && tournamentSlug && registrationId) {
        getTournamentBySlug(organizationSlug, tournamentSlug);
        getRegistration(registrationId);
      }

      return () => undefined;
    }, [
      organizationSlug,
      tournamentSlug,
      registrationId,
      getRegistration,
      getTournamentBySlug
    ]);

    return <WrappedComponent {...props} />;
  };

  return WithRegistration;
};

export default withRegistration;
