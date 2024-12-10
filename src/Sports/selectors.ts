import { DEFAULT_SPORT, SportState } from './state';

export const sports = (state: SportState) =>
  Object.keys(state.sports).map((key: string) => state.sports[key]);

export const sportsLoading = (state: SportState) =>
  state.isLoadingRequestSports;

export const selectPlayerStatisticsByType = (
  state: SportState,
  sportSlug: string,
  type: string
) => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.playerStatistics.filter(stat => stat.type === type);
};
