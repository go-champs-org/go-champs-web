import {
  ApiFixedPlayerStatsTableResponse,
  ApiFixedPlayerStatsTableRequest,
  ApiFixedPlayerStatsTablesResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity,
  mapFixedPlayerStatsTableEntityToApiFixedPlayerStatsTableRequest
} from './dataMappers';
import { FixedPlayerStatsTableEntity } from './state';
import {
  mapRequestFilterToQueryString,
  RequestFilter
} from '../Shared/httpClient/requestFilter';

const FIXED_PLAYER_STATS_TABLE_API = `${process.env.REACT_APP_API_HOST}v1/fixed-player-stats-tables`;

const deleteRequest = (fixedPlayerStatsTableId: string): Promise<string> => {
  const url = `${FIXED_PLAYER_STATS_TABLE_API}/${fixedPlayerStatsTableId}`;

  return httpClient.delete(url);
};

const patch = async (
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity,
  tournamentId: string
): Promise<FixedPlayerStatsTableEntity> => {
  const url = `${FIXED_PLAYER_STATS_TABLE_API}/${fixedPlayerStatsTable.id}`;
  const body = mapFixedPlayerStatsTableEntityToApiFixedPlayerStatsTableRequest(
    fixedPlayerStatsTable,
    tournamentId
  );

  const { data } = await httpClient.patch<
    ApiFixedPlayerStatsTableRequest,
    ApiFixedPlayerStatsTableResponse
  >(url, body);
  return mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity(data);
};

const post = async (
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity,
  tournamentId: string
): Promise<FixedPlayerStatsTableEntity> => {
  const url = `${FIXED_PLAYER_STATS_TABLE_API}`;
  const body = mapFixedPlayerStatsTableEntityToApiFixedPlayerStatsTableRequest(
    fixedPlayerStatsTable,
    tournamentId
  );
  const { data } = await httpClient.post<
    ApiFixedPlayerStatsTableRequest,
    ApiFixedPlayerStatsTableResponse
  >(url, body);
  return mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity(data);
};

const getByFilter = async (
  where: RequestFilter
): Promise<FixedPlayerStatsTableEntity[]> => {
  const url = `${FIXED_PLAYER_STATS_TABLE_API}?${mapRequestFilterToQueryString(
    where
  )}`;

  const { data } = await httpClient.get<ApiFixedPlayerStatsTablesResponse>(url);
  return data.map(mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity);
};

export default {
  delete: deleteRequest,
  getByFilter,
  patch,
  post
};
