import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiAggregatedPlayerStatsLogToEntity,
  AggregatedPlayerStatsLogEntity
} from './dataMappers';
import { ApiAggregatedPlayerStatsLogsResponse } from './apiTypes';

export const getAggregatedPlayerStatsByFilter = async (
  tournamentId: string,
  playerId?: string
): Promise<AggregatedPlayerStatsLogEntity[]> => {
  const url = new URL('v1/aggregated-player-stats-by-tournament', getApiHost());
  url.searchParams.set('where[tournament_id]', tournamentId);
  if (playerId) {
    url.searchParams.set('where[player_id]', playerId);
  }

  const { data } = await httpClient.get<ApiAggregatedPlayerStatsLogsResponse>(
    url.toString()
  );
  return data.map(mapApiAggregatedPlayerStatsLogToEntity);
};
