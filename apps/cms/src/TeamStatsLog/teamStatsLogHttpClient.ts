import { ApiTeamStatsLogsResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import { mapApiTeamStatsLogsToTeamStatsLogs } from './dataMappers';
import { TeamStatsLogEntity } from './state';
import {
  RequestFilter,
  mapRequestFilterToQueryString
} from '../Shared/httpClient/requestFilter';
import { REACT_APP_API_HOST } from '../Shared/env';

const TEAM_STATS_LOGS_API = `${REACT_APP_API_HOST}v1/team-stats-logs`;

const getByFilter = async (
  where: RequestFilter
): Promise<TeamStatsLogEntity[]> => {
  const url = `${TEAM_STATS_LOGS_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiTeamStatsLogsResponse>(url);
  return mapApiTeamStatsLogsToTeamStatsLogs(data);
};

export default {
  getByFilter
};
