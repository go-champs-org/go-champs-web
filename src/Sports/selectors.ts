import { DEFAULT_SPORT, Level, SportState } from './state';

export const sports = (state: SportState) =>
  Object.keys(state.sports).map((key: string) => state.sports[key]);

export const sportsLoading = (state: SportState) =>
  state.isLoadingRequestSports;

export const selectPlayerStatisticsByLevel = (
  state: SportState,
  sportSlug: string,
  level: Level
) => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.playerStatistics.filter(stat => stat.level === level);
};
