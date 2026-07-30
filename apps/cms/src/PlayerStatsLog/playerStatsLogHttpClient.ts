import {
  ApiPlayerStatsLogRequest,
  ApiPlayerStatsLogPatchPostResponse,
  ApiPlayerStatsLogsResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapPlayerStatsLogsEntityToApiPlayerStatsLogsRequest,
  mapApiPlayerStatsLogPatchPostResponseToPlayerStatsLogs,
  mapApiPlayerStatsLogsToPlayerStatsLogs
} from './dataMappers';
import { PlayerStatsLogEntity } from './state';
import {
  RequestFilter,
  mapRequestFilterToQueryString
} from '../Shared/httpClient/requestFilter';
import { REACT_APP_API_HOST } from '../Shared/env';

const PLAYER_STATS_LOGS_API = `${REACT_APP_API_HOST}v1/player-stats-logs`;

const deleteRequest = (playerStatsLogId: string): Promise<string> => {
  const url = `${PLAYER_STATS_LOGS_API}/${playerStatsLogId}`;

  return httpClient.delete(url);
};

const getByFilter = async (
  where: RequestFilter
): Promise<PlayerStatsLogEntity[]> => {
  const url = `${PLAYER_STATS_LOGS_API}?${mapRequestFilterToQueryString(
    where
  )}`;

  const { data } = await httpClient.get<ApiPlayerStatsLogsResponse>(url);
  return mapApiPlayerStatsLogsToPlayerStatsLogs(data);
};

const patch = async (
  playerStatsLogs: PlayerStatsLogEntity[]
): Promise<PlayerStatsLogEntity[]> => {
  const url = PLAYER_STATS_LOGS_API;
  const body = mapPlayerStatsLogsEntityToApiPlayerStatsLogsRequest(
    playerStatsLogs
  );

  const { data } = await httpClient.patch<
    ApiPlayerStatsLogRequest,
    ApiPlayerStatsLogPatchPostResponse
  >(url, body);
  return mapApiPlayerStatsLogPatchPostResponseToPlayerStatsLogs(data);
};

const post = async (
  playerStatsLogs: PlayerStatsLogEntity[]
): Promise<PlayerStatsLogEntity[]> => {
  const url = PLAYER_STATS_LOGS_API;
  const body = mapPlayerStatsLogsEntityToApiPlayerStatsLogsRequest(
    playerStatsLogs
  );

  const { data } = await httpClient.post<
    ApiPlayerStatsLogRequest,
    ApiPlayerStatsLogPatchPostResponse
  >(url, body);
  return mapApiPlayerStatsLogPatchPostResponseToPlayerStatsLogs(data);
};

export default {
  delete: deleteRequest,
  getByFilter,
  patch,
  post
};
