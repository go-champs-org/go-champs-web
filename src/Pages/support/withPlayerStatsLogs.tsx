import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { PhaseEntity } from '../../Phases/state';
import { TournamentEntity } from '../../Tournaments/state';

interface WithPlayerStatsLogsProps {
  getPlayerStatsLogs: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  phase: PhaseEntity;
  tournament: TournamentEntity;
}

const withPlayerStatsLogs = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithPlayerStatsLogs: React.FC<T & WithPlayerStatsLogsProps> = props => {
    const { getPlayerStatsLogs, phase, tournament } = props;
    const {
      params: { gameId }
    } = useRouteMatch();

    useEffect(() => {
      if (phase && tournament && gameId) {
        getPlayerStatsLogs({
          game_id: gameId,
          phase_id: phase.id,
          tournament_id: tournament.id
        });
      }

      return () => undefined;
    }, [getPlayerStatsLogs]);

    return <WrappedComponent {...props} />;
  };

  return WithPlayerStatsLogs;
};

export default withPlayerStatsLogs;
