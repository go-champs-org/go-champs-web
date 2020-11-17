import { AggregatedPlayerStatsLogEntity } from './state';
import { ApiAggregatedPlayerStatsLog } from '../Shared/httpClient/apiTypes';

export const mapApiAggregatedPlayerStatsLogToAggregatedPlayerStatsLog = (
  apiAggregatedPlayerStatsLog: ApiAggregatedPlayerStatsLog
): AggregatedPlayerStatsLogEntity => ({
  id: apiAggregatedPlayerStatsLog.id,
  playerId: apiAggregatedPlayerStatsLog.player_id,
  stats: apiAggregatedPlayerStatsLog.stats
});

export const mapApiAggregatedPlayerStatsLogPatchPostResponseToAggregatedPlayerStatsLogs = (apiAggregatedPlayerStatsLogs: {
  [id: string]: ApiAggregatedPlayerStatsLog;
}): AggregatedPlayerStatsLogEntity[] =>
  Object.keys(apiAggregatedPlayerStatsLogs).map((key: string) =>
    mapApiAggregatedPlayerStatsLogToAggregatedPlayerStatsLog(
      apiAggregatedPlayerStatsLogs[key]
    )
  );

export const mapApiAggregatedPlayerStatsLogsToAggregatedPlayerStatsLogs = (
  apiAggregatedPlayerStatsLogs: ApiAggregatedPlayerStatsLog[]
): AggregatedPlayerStatsLogEntity[] =>
  apiAggregatedPlayerStatsLogs.map(
    mapApiAggregatedPlayerStatsLogToAggregatedPlayerStatsLog
  );
