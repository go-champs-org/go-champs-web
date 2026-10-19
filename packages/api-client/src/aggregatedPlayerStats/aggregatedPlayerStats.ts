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
  // Reads the stats aggregated for one phase instead of the whole tournament.
  phaseId?: string;
  // Keeps only players with at least this much of each stat, keyed by stat
  // slug — `{ game_played: 3 }` leaves out anyone with fewer than 3 games.
  minStats?: Record<string, number>;
  // A stat-sorted ranking is a different request than the default one, not
  // a client-side reorder of it — same as the CMS's aggregated-stats fetch.
  sort?: string;
}

export const getAggregatedPlayerStatsByFilter = async ({
  tournamentId,
  teamId,
  playerId,
  phaseId,
  minStats = {},
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
  if (phaseId) {
    url.searchParams.set('where[phase_id]', phaseId);
  }
  Object.entries(minStats).forEach(([slug, minimum]) => {
    url.searchParams.set(`where[${slug}][gte]`, String(minimum));
  });
  if (sort) {
    url.searchParams.set('sort', sort);
  }

  const { data } = await httpClient.get<ApiAggregatedPlayerStatsLogsResponse>(
    url.toString()
  );
  return data.map(mapApiAggregatedPlayerStatsLogToEntity);
};
