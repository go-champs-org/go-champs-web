import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiPlayerStatsLogToEntity, PlayerStatsLogEntity } from './dataMappers';
import { ApiPlayerStatsLogsResponse } from './apiTypes';

// One log per player per game: the box score of a single game is this list,
// split by team.
export const getPlayerStatsLogsByGame = async (
  gameId: string
): Promise<PlayerStatsLogEntity[]> => {
  const url = new URL('v1/player-stats-logs', getApiHost());
  url.searchParams.set('where[game_id]', gameId);

  const { data } = await httpClient.get<ApiPlayerStatsLogsResponse>(
    url.toString()
  );
  return data.map(mapApiPlayerStatsLogToEntity);
};
