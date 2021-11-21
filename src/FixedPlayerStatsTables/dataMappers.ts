import {
  ApiFixedPlayerStatsTable,
  ApiFixedPlayerStatsTableRequest,
  ApiFixedPlayerStatsTableRecord
} from '../Shared/httpClient/apiTypes';
import {
  FixedPlayerStatsTableEntity,
  FixedPlayerStatsRecordEntity
} from './state';

export const mapApiFixedPlayerStatsRecordToFixedPlayerStatsRecordEntity = (
  apiFixedPlayerStatsTable: ApiFixedPlayerStatsTableRecord
): FixedPlayerStatsRecordEntity => ({
  id: apiFixedPlayerStatsTable.id,
  playerId: apiFixedPlayerStatsTable.player_id,
  value: apiFixedPlayerStatsTable.value
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

export const mapFixedPlayerStatsEntityToApiFixedPlayerStatsRecord = (
  fixedPlayerStatsTableRecord: FixedPlayerStatsRecordEntity
): ApiFixedPlayerStatsTableRecord => ({
  id: fixedPlayerStatsTableRecord.id,
  player_id: fixedPlayerStatsTableRecord.playerId,
  value: fixedPlayerStatsTableRecord.value
});

export const mapFixedPlayerStatsTableEntityToApiFixedPlayerStatsTableRequest = (
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity,
  tournamentId: string
): ApiFixedPlayerStatsTableRequest => ({
  fixed_player_stats_table: {
    id: fixedPlayerStatsTable.id,
    player_stats: fixedPlayerStatsTable.playerStats.map(
      mapFixedPlayerStatsEntityToApiFixedPlayerStatsRecord
    ),
    stat_id: fixedPlayerStatsTable.statId,
    tournament_id: tournamentId
  }
});
