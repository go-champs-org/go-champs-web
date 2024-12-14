import { DEFAULT_SPORT, Level, Scope, SportState } from './state';

export const sports = (state: SportState) =>
  Object.keys(state.sports).map((key: string) => state.sports[key]);

export const sportsLoading = (state: SportState) =>
  state.isLoadingRequestSports;

export const selectSport = (state: SportState, sportSlug: string) =>
  state.sports[sportSlug] || DEFAULT_SPORT;

export const selectPlayerStatisticsByLevel = (
  state: SportState,
  sportSlug: string,
  level: Level
) => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.playerStatistics.filter(stat => stat.level === level);
};

export const selectPlayerStatisticsByScope = (
  state: SportState,
  sportSlug: string,
  scope: Scope
) => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.playerStatistics.filter(stat => stat.scope === scope);
};
