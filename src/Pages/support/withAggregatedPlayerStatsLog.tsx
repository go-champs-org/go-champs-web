import React, { useEffect } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { TournamentEntity } from '../../Tournaments/state';

interface WithAggregatedPlayerStatsLogsProps {
  getAggregatedPlayerStatsLogsByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  tournament: TournamentEntity;
}

const withAggregatedPlayerStatsLogs = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithAggregatedPlayerStatsLogs: React.FC<T &
    WithAggregatedPlayerStatsLogsProps> = props => {
    const { getAggregatedPlayerStatsLogsByFilter, tournament } = props;

    useEffect(() => {
      if (tournament.id) {
        getAggregatedPlayerStatsLogsByFilter({
          tournament_id: tournament.id
        });
      }

      return () => undefined;
    }, [getAggregatedPlayerStatsLogsByFilter, tournament]);

    return <WrappedComponent {...props} />;
  };

  return WithAggregatedPlayerStatsLogs;
};

export default withAggregatedPlayerStatsLogs;
