import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity,
  FixedPlayerStatsTableEntity
} from './dataMappers';
import { ApiFixedPlayerStatsTablesResponse } from './apiTypes';

export interface FixedPlayerStatsTablesFilter {
  tournamentId: string;
}

export const getFixedPlayerStatsTablesByFilter = async ({
  tournamentId
}: FixedPlayerStatsTablesFilter): Promise<FixedPlayerStatsTableEntity[]> => {
  const url = new URL('v1/fixed-player-stats-tables', getApiHost());
  url.searchParams.set('where[tournament_id]', tournamentId);

  const { data } = await httpClient.get<ApiFixedPlayerStatsTablesResponse>(
    url.toString()
  );
  return data.map(mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity);
};
