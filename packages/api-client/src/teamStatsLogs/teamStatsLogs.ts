import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiTeamStatsLogToEntity, TeamStatsLogEntity } from './dataMappers';
import { ApiTeamStatsLogsResponse } from './apiTypes';

// One log per team per game: the totals row under each half of the box score.
export const getTeamStatsLogsByGame = async (
  gameId: string
): Promise<TeamStatsLogEntity[]> => {
  const url = new URL('v1/team-stats-logs', getApiHost());
  url.searchParams.set('where[game_id]', gameId);

  const { data } = await httpClient.get<ApiTeamStatsLogsResponse>(
    url.toString()
  );
  return data.map(mapApiTeamStatsLogToEntity);
};
