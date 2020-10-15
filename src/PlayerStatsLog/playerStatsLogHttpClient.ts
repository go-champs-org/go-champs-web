import {
  ApiPlayerStatsLogRequest,
  ApiPlayerStatsLogPatchPostResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapPlayerStatsLogsEntityToApiPlayerStatsLogsRequest,
  mapApiPlayerStatsLogPatchPostResponseToPlayerStatsLogs
} from './dataMappers';
import { PlayerStatsLogEntity } from './state';

const PLAYER_STATS_LOGS_API = `${process.env.REACT_APP_API_HOST}v1/playerStatsLog-stats-log`;

const deleteRequest = (playerStatsLogId: string): Promise<string> => {
  const url = `${PLAYER_STATS_LOGS_API}/${playerStatsLogId}`;

  return httpClient.delete(url);
};

const patch = async (
  playerStatsLogs: PlayerStatsLogEntity[]
): Promise<PlayerStatsLogEntity[]> => {
  const url = PLAYER_STATS_LOGS_API;
  const body = mapPlayerStatsLogsEntityToApiPlayerStatsLogsRequest(
    playerStatsLogs
  );

  const response = await httpClient.patch<
    ApiPlayerStatsLogRequest,
    ApiPlayerStatsLogPatchPostResponse
  >(url, body);
  return mapApiPlayerStatsLogPatchPostResponseToPlayerStatsLogs(response);
};

const post = async (
  playerStatsLogs: PlayerStatsLogEntity[]
): Promise<PlayerStatsLogEntity[]> => {
  const url = PLAYER_STATS_LOGS_API;
  const body = mapPlayerStatsLogsEntityToApiPlayerStatsLogsRequest(
    playerStatsLogs
  );

  const response = await httpClient.post<
    ApiPlayerStatsLogRequest,
    ApiPlayerStatsLogPatchPostResponse
  >(url, body);
  return mapApiPlayerStatsLogPatchPostResponseToPlayerStatsLogs(response);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
