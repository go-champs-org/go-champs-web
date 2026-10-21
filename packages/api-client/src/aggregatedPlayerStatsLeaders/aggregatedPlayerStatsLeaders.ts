import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiStatLeadersToEntity, StatLeadersEntity } from './dataMappers';
import { ApiStatLeadersResponse } from './apiTypes';

export interface StatLeadersFilter {
  tournamentId: string;
  // Stat keys to rank, one group each, in this order. Left out, the API ranks
  // every player stat of the tournament.
  stats?: string[];
  // Ranks a single phase instead of the whole tournament.
  phaseId?: string;
}

// One request for every stat's top 10, rather than one ranking per stat
// through getAggregatedPlayerStatsByFilter.
export const getAggregatedPlayerStatsLeaders = async ({
  tournamentId,
  stats,
  phaseId
}: StatLeadersFilter): Promise<StatLeadersEntity[]> => {
  const url = new URL('v1/aggregated-player-stats-leaders', getApiHost());
  url.searchParams.set('where[tournament_id]', tournamentId);
  if (phaseId) {
    url.searchParams.set('where[phase_id]', phaseId);
  }
  (stats || []).forEach(stat => {
    url.searchParams.append('stats[]', stat);
  });

  const { data } = await httpClient.get<ApiStatLeadersResponse>(url.toString());
  return data.map(mapApiStatLeadersToEntity);
};
