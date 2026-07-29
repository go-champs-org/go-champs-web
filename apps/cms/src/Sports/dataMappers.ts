import {
  ApiCoachType,
  ApiOfficialType,
  ApiSport,
  ApiStatistic
} from '../Shared/httpClient/apiTypes';
import { Level, Scope, SportEntity, Statistic, ValueType } from './state';

const mapApiOfficialTypeToOfficialTypeEntity = (
  apiOfficialType: ApiOfficialType
) => ({
  name: apiOfficialType.name,
  role: apiOfficialType.role
});

const mapApiCoachTypeToCoachTypeEntity = (apiCoachType: ApiCoachType) => ({
  type: apiCoachType.type
});

const mapApiStatisticTypeToStatisticType = (
  apiStatisticType: string
): ValueType => (apiStatisticType === 'manual' ? 'manual' : 'calculated');

const mapApiStatisticLevelToStatisticLevel = (
  apiStatisticLevel: string
): Level => (apiStatisticLevel === 'game' ? 'game' : 'tournament');

const mapApiStatisticScopeToStatisticScope = (
  apiStatisticScope: string
): Scope => (apiStatisticScope === 'aggregate' ? 'aggregate' : 'per_game');

const mapApiStatisticToStatisticEntity = (
  apiStatistic: ApiStatistic
): Statistic => ({
  name: apiStatistic.name,
  slug: apiStatistic.slug,
  valueType: mapApiStatisticTypeToStatisticType(apiStatistic.value_type),
  level: mapApiStatisticLevelToStatisticLevel(apiStatistic.level),
  scope: mapApiStatisticScopeToStatisticScope(apiStatistic.scope)
});

export const mapApiSportToSportEntity = (apiSport: ApiSport): SportEntity => ({
  name: apiSport.name,
  slug: apiSport.slug,
  playerStatistics: apiSport.player_statistics
    ? apiSport.player_statistics.map(mapApiStatisticToStatisticEntity)
    : [],
  coachTypes: apiSport.coach_types
    ? apiSport.coach_types.map(mapApiCoachTypeToCoachTypeEntity)
    : [],
  officialTypes: apiSport.official_types
    ? apiSport.official_types.map(mapApiOfficialTypeToOfficialTypeEntity)
    : []
});
