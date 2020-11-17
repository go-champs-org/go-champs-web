import { ApiAggregatedPlayerStatsLogsResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  RequestFilter,
  mapRequestFilterToQueryString
} from '../Shared/httpClient/requestFilter';
import { AggregatedPlayerStatsLogEntity } from './state';

const AGGREGATED_PLAYER_STATS_LOGS_API = `${process.env.REACT_APP_API_HOST}v1/aggregated-player-stats-by-tournament`;

const getByFilter = async (
  where: RequestFilter
): Promise<AggregatedPlayerStatsLogEntity[]> => {
  const url = `${AGGREGATED_PLAYER_STATS_LOGS_API}?${mapRequestFilterToQueryString(
    where
  )}`;

  const { data } = await httpClient.get<ApiAggregatedPlayerStatsLogsResponse>(
    url
  );
  return mapApiPlayerStatsLogsToPlayerStatsLogs(data);
};

export default {
  getByFilter
};
