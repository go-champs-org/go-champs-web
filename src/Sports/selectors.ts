import { SportState } from './state';

export const sports = (state: SportState) =>
  Object.keys(state.sports).map((key: string) => state.sports[key]);

export const sportsLoading = (state: SportState) =>
  state.isLoadingRequestSports;
