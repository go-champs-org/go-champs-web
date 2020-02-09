import { TeamEntity, TeamState, DEFAULT_TEAM } from './state';

export const teamsLoading = (state: TeamState) =>
  state.isLoadingRequestTournament;

export const teamById = (state: TeamState, teamId?: string): TeamEntity => {
  if (!teamId || !state.teams[teamId]) {
    return DEFAULT_TEAM;
  }
  return state.teams[teamId];
};

export const teams = (state: TeamState) =>
  Object.keys(state.teams).map((key: string) => state.teams[key]);
