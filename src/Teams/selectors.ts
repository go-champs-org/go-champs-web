import { TeamEntity, TeamState, DEFAULT_TEAM } from './state';
import { SelectOptionType } from '../Shared/UI/Form/Select';

export const teamById = (state: TeamState, teamId?: string): TeamEntity => {
  if (!teamId || !state.teams[teamId]) {
    return DEFAULT_TEAM;
  }
  return state.teams[teamId];
};

export const teams = (state: TeamState): TeamEntity[] =>
  Object.keys(state.teams).map((key: string) => state.teams[key]);

export const teamsForSelectInput = (state: TeamState): SelectOptionType[] => {
  const allTeams = teams(state);
  return allTeams.map((team: TeamEntity) => ({
    value: team.id,
    label: team.name
  }));
};

export const teamsLoading = (state: TeamState) =>
  state.isLoadingRequestTournament;
export const patchingTeam = (state: TeamState): boolean =>
  state.isLoadingPatchTeam;
export const postingTeam = (state: TeamState): boolean =>
  state.isLoadingPostTeam;
export const deletingTeam = (state: TeamState): boolean =>
  state.isLoadingDeleteTeam;
