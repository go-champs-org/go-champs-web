import { ApiPlayerStatistic, ApiSport } from './apiTypes';

// The level a statistic belongs to: 'game' are the ones a box score shows,
// 'tournament' aggregate across the whole competition. The entity keeps the
// raw API strings — a level the API adds later must not be forced into this
// union — but callers filtering by level are held to the known ones.
export type StatisticLevel = 'game' | 'tournament';

export const GAME_STATISTIC_LEVEL: StatisticLevel = 'game';

export interface PlayerStatisticEntity {
  slug: string;
  name: string;
  level: string;
  scope: string;
  valueType: string;
}

export interface SportEntity {
  slug: string;
  name: string;
  playerStatistics: PlayerStatisticEntity[];
}

export const mapApiPlayerStatisticToEntity = (
  apiStatistic: ApiPlayerStatistic
): PlayerStatisticEntity => ({
  slug: apiStatistic.slug,
  name: apiStatistic.name,
  level: apiStatistic.level,
  scope: apiStatistic.scope,
  valueType: apiStatistic.value_type
});

export const mapApiSportToEntity = (apiSport: ApiSport): SportEntity => ({
  slug: apiSport.slug,
  name: apiSport.name,
  playerStatistics: (apiSport.player_statistics || []).map(
    mapApiPlayerStatisticToEntity
  )
});

export const playerStatisticsByLevel = (
  sport: SportEntity,
  level: StatisticLevel
): PlayerStatisticEntity[] =>
  sport.playerStatistics.filter(statistic => statistic.level === level);
