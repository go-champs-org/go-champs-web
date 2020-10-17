import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { PhaseEntity } from '../../Phases/state';
import { TournamentEntity } from '../../Tournaments/state';

interface WithPlayerStatsLogsProps {
  getGame: (gameId: string) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  getPlayerStatsLogsByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  phase: PhaseEntity;
  tournament: TournamentEntity;
}

const withPlayerStatsLogs = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithPlayerStatsLogs: React.FC<T & WithPlayerStatsLogsProps> = props => {
    const { getGame, getPlayerStatsLogsByFilter, phase, tournament } = props;
    const {
      params: { gameId }
    } = useRouteMatch();

    useEffect(() => {
      if (phase.id && tournament.id && gameId) {
        getGame(gameId);
        getPlayerStatsLogsByFilter({
          game_id: gameId,
          phase_id: phase.id,
          tournament_id: tournament.id
        });
      }

      return () => undefined;
    }, [gameId, getPlayerStatsLogsByFilter, phase, tournament]);

    return <WrappedComponent {...props} />;
  };

  return WithPlayerStatsLogs;
};

export default withPlayerStatsLogs;
