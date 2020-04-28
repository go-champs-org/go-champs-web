import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';

interface WithTournamentProps {
  getTournamentBySlug: (
    organizationSlug: string,
    tournamentSlug: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withTournament = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithTournament: React.FC<T & WithTournamentProps> = props => {
    const { getTournamentBySlug } = props;
    const {
      params: { organizationSlug, tournamentSlug }
    } = useRouteMatch();
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
