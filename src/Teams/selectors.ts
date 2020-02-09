import { TeamEntity, TeamState, DEFAULT_TEAM } from './state';

export const teamsLoading = (state: TeamState) =>
  state.isLoadingRequestTournament;

export const teamById = (state: TeamState, slug?: string): TeamEntity => {
  if (!slug || !state.teams[slug]) {
    return DEFAULT_TEAM;
  }
  return state.teams[slug];
};

export const teams = (state: TeamState) =>
  Object.keys(state.teams).map((key: string) => state.teams[key]);
