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
  getTeamStatsLogsByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  phase: PhaseEntity;
  tournament: TournamentEntity;
}

const withPlayerStatsLogsForGame = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithPlayerStatsLogsForGame: React.FC<T &
    WithPlayerStatsLogsProps> = props => {
    const {
      getGame,
      getPlayerStatsLogsByFilter,
      getTeamStatsLogsByFilter,
      phase,
      tournament
    } = props;
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
        getTeamStatsLogsByFilter({
          game_id: gameId,
          phase_id: phase.id,
          tournament_id: tournament.id
        });
      }

      return () => undefined;
    }, [
      gameId,
      getGame,
      getPlayerStatsLogsByFilter,
      getTeamStatsLogsByFilter,
      phase,
      tournament
    ]);

    return <WrappedComponent {...props} />;
  };

  return WithPlayerStatsLogsForGame;
};

export default withPlayerStatsLogsForGame;
