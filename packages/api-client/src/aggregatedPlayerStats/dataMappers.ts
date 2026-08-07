import { ApiAggregatedPlayerStatsLog } from './apiTypes';

export interface AggregatedPlayerStatsLogEntity {
  id: string;
  playerId: string;
  stats: Record<string, string>;
}

export const mapApiAggregatedPlayerStatsLogToEntity = (
  apiLog: ApiAggregatedPlayerStatsLog
): AggregatedPlayerStatsLogEntity => ({
  id: apiLog.id,
  playerId: apiLog.player_id,
  stats: apiLog.stats
});
