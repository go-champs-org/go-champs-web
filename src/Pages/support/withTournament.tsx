import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { RouteProps } from './routerInterfaces';

interface WithTournamentProps extends RouteComponentProps<RouteProps> {
  getTournamentBySlug: (organizationSlug: string, tournamentSlug: string) => {};
}

const withTournament = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithTournament: React.FC<T & WithTournamentProps> = props => {
    const {
      getTournamentBySlug,
      match: {
        params: { organizationSlug, tournamentSlug }
      }
    } = props;

    useEffect(() => {
      if (organizationSlug && tournamentSlug) {
        getTournamentBySlug(organizationSlug, tournamentSlug);
      }

      return () => undefined;
    }, [organizationSlug, tournamentSlug, getTournamentBySlug]);

    return <WrappedComponent {...props} />;
  };

  return WithTournament;
};

export default withTournament;
