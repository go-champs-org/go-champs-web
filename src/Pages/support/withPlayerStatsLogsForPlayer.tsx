import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { TournamentEntity } from '../../Tournaments/state';

interface WithPlayerStatsLogsProps {
  getPlayerStatsLogsByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  tournament: TournamentEntity;
}

const withPlayerStatsLogsForPlayer = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithPlayerStatsLogsForPlayer: React.FC<T &
    WithPlayerStatsLogsProps> = props => {
    const { getPlayerStatsLogsByFilter, tournament } = props;
    const {
      params: { playerId }
    } = useRouteMatch();

    useEffect(() => {
      if (tournament.id && playerId) {
        getPlayerStatsLogsByFilter({
          player_id: playerId,
          tournament_id: tournament.id
        });
      }

      return () => undefined;
    }, [getPlayerStatsLogsByFilter, playerId, tournament]);

    return <WrappedComponent {...props} />;
  };

  return WithPlayerStatsLogsForPlayer;
};

export default withPlayerStatsLogsForPlayer;
