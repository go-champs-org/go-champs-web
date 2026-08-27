import {
  ApiFixedPlayerStatsTable,
  ApiFixedPlayerStatsTableRecord
} from './apiTypes';

export interface FixedPlayerStatsRecordEntity {
  id: string;
  playerId: string;
  value: string;
}

export interface FixedPlayerStatsTableEntity {
  id: string;
  statId: string;
  playerStats: FixedPlayerStatsRecordEntity[];
}

export const mapApiFixedPlayerStatsRecordToFixedPlayerStatsRecordEntity = (
  apiFixedPlayerStatsTableRecord: ApiFixedPlayerStatsTableRecord
): FixedPlayerStatsRecordEntity => ({
  id: apiFixedPlayerStatsTableRecord.id,
  playerId: apiFixedPlayerStatsTableRecord.player_id,
  value: apiFixedPlayerStatsTableRecord.value
});

export const mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity = (
  apiFixedPlayerStatsTable: ApiFixedPlayerStatsTable
): FixedPlayerStatsTableEntity => ({
  id: apiFixedPlayerStatsTable.id,
  statId: apiFixedPlayerStatsTable.stat_id,
  playerStats: apiFixedPlayerStatsTable.player_stats.map(
    mapApiFixedPlayerStatsRecordToFixedPlayerStatsRecordEntity
  )
});
