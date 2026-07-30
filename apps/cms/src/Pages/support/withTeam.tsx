import React, { useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import {
  ExtendedRequestFilter,
  RequestFilter
} from '../../Shared/httpClient/requestFilter';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { TournamentEntity } from '../../Tournaments/state';
import { RouteProps } from './routerInterfaces';

interface WithTeamProps {
  getGamesByFilter: (
    where: RequestFilter | ExtendedRequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  getAggregatedPlayerStatsLogsByFilter: (
    where: RequestFilter,
    sort?: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  tournament: TournamentEntity;
}

const SORT_URL_QUERY_PARAM = 'sort';

const withTeam = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithTeam: React.FC<T & WithTeamProps> = props => {
    const {
      getGamesByFilter,
      getAggregatedPlayerStatsLogsByFilter,
      tournament
    } = props;
    const {
      params: { teamId }
    } = useRouteMatch<RouteProps>();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const sortKey = urlSearch.get(SORT_URL_QUERY_PARAM);

    useEffect(() => {
      if (teamId) {
        getGamesByFilter({
          or: [{ home_team_id: teamId }, { away_team_id: teamId }]
        });
      }

      return () => undefined;
    }, [getGamesByFilter, teamId]);

    useEffect(() => {
      if (teamId && tournament.id) {
        getAggregatedPlayerStatsLogsByFilter(
          {
            team_id: teamId,
            tournament_id: tournament.id
          },
          sortKey || undefined
        );
      }

      return () => undefined;
    }, [getAggregatedPlayerStatsLogsByFilter, sortKey, teamId, tournament]);

    return <WrappedComponent {...props} />;
  };

  return WithTeam;
};

export default withTeam;
