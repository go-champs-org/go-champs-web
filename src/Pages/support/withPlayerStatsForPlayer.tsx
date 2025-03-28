import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { TournamentEntity } from '../../Tournaments/state';
import { RouteProps } from './routerInterfaces';

interface WithPlayerStatsProps {
  getPlayerStatsLogsByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  getAggregatedPlayerStatsLogsByFilter: (
    where: RequestFilter,
    sort?: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  tournament: TournamentEntity;
}

const withPlayerStatsForPlayer = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithPlayerStatsForPlayer: React.FC<T &
    WithPlayerStatsProps> = props => {
    const {
      getPlayerStatsLogsByFilter,
      getAggregatedPlayerStatsLogsByFilter,
      tournament
    } = props;
    const {
      params: { playerId }
    } = useRouteMatch<RouteProps>();

    useEffect(() => {
      if (tournament.id && playerId) {
        getPlayerStatsLogsByFilter({
          player_id: playerId,
          tournament_id: tournament.id
        });
        getAggregatedPlayerStatsLogsByFilter({
          player_id: playerId,
          tournament_id: tournament.id
        });
      }

      return () => undefined;
    }, [
      getPlayerStatsLogsByFilter,
      getAggregatedPlayerStatsLogsByFilter,
      playerId,
      tournament
    ]);

    return <WrappedComponent {...props} />;
  };

  return WithPlayerStatsForPlayer;
};

export default withPlayerStatsForPlayer;
