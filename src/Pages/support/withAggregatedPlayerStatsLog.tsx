import React, { useEffect } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { TournamentEntity } from '../../Tournaments/state';
import { useLocation } from 'react-router-dom';

export const SORT_URL_QUERY_PARAM = 'sort';

interface WithAggregatedPlayerStatsLogsProps {
  getAggregatedPlayerStatsLogsByFilter: (
    where: RequestFilter,
    sort?: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  tournament: TournamentEntity;
}

const withAggregatedPlayerStatsLogs = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithAggregatedPlayerStatsLogs: React.FC<T &
    WithAggregatedPlayerStatsLogsProps> = props => {
    const { getAggregatedPlayerStatsLogsByFilter, tournament } = props;
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const sortKey = urlSearch.get(SORT_URL_QUERY_PARAM);

    useEffect(() => {
      if (tournament.id) {
        getAggregatedPlayerStatsLogsByFilter(
          {
            tournament_id: tournament.id
          },
          sortKey || undefined
        );
      }

      return () => undefined;
    }, [getAggregatedPlayerStatsLogsByFilter, sortKey, tournament]);

    return <WrappedComponent {...props} />;
  };

  return WithAggregatedPlayerStatsLogs;
};

export default withAggregatedPlayerStatsLogs;
