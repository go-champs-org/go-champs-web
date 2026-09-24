import { getApiHost } from '../env';
import httpClient from '../httpClient';
import {
  mapApiAggregatedPlayerStatsLogToEntity,
  AggregatedPlayerStatsLogEntity
} from './dataMappers';
import { ApiAggregatedPlayerStatsLogsResponse } from './apiTypes';

// The tournament is the only filter the endpoint requires; the others narrow
// it down to one team's roster or to a single player. Named rather than
// positional because a third optional argument is where a call site starts
// passing `undefined` to reach the one it wants.
export interface AggregatedPlayerStatsFilter {
  tournamentId: string;
  teamId?: string;
  playerId?: string;
  // A stat-sorted ranking is a different request than the default one, not
  // a client-side reorder of it — same as the CMS's aggregated-stats fetch.
  sort?: string;
}

export const getAggregatedPlayerStatsByFilter = async ({
  tournamentId,
  teamId,
  playerId,
  sort
}: AggregatedPlayerStatsFilter): Promise<AggregatedPlayerStatsLogEntity[]> => {
  const url = new URL('v1/aggregated-player-stats-by-tournament', getApiHost());
  url.searchParams.set('where[tournament_id]', tournamentId);
  if (teamId) {
    url.searchParams.set('where[team_id]', teamId);
  }
  if (playerId) {
    url.searchParams.set('where[player_id]', playerId);
  }
  if (sort) {
    url.searchParams.set('sort', sort);
  }

  const { data } = await httpClient.get<ApiAggregatedPlayerStatsLogsResponse>(
    url.toString()
  );
  return data.map(mapApiAggregatedPlayerStatsLogToEntity);
};
