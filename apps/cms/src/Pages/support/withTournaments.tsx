import React, { useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './routerInterfaces';

interface WithTournamentsProps extends RouteComponentProps<RouteProps> {
  getTournamentsByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withTournaments = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithTournaments: React.FC<T & WithTournamentsProps> = props => {
    const {
      getTournamentsByFilter,
      match: {
        params: { organizationSlug }
      }
    } = props;

    useEffect(() => {
      if (organizationSlug) {
        getTournamentsByFilter({ organization_slug: organizationSlug });
      }

      return () => undefined;
    }, [getTournamentsByFilter, organizationSlug]);

    return <WrappedComponent {...props} />;
  };

  return WithTournaments;
};

export default withTournaments;
