import React, { useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import {
  ExtendedRequestFilter,
  RequestFilter
} from '../../Shared/httpClient/requestFilter';
import { useRouteMatch } from 'react-router-dom';

interface WithTeamProps {
  getGamesByFilter: (
    where: RequestFilter | ExtendedRequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withTeam = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithTeam: React.FC<T & WithTeamProps> = props => {
    const { getGamesByFilter } = props;
    const {
      params: { teamId }
    } = useRouteMatch();

    useEffect(() => {
      if (teamId) {
        getGamesByFilter({
          or: [{ home_team_id: teamId }, { away_team_id: teamId }]
        });
      }

      return () => undefined;
    }, [getGamesByFilter, teamId]);

    return <WrappedComponent {...props} />;
  };

  return WithTeam;
};

export default withTeam;
