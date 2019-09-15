import { DEFAULT_GROUP_ENTITY, TournamentGroupEntity } from '../Groups/state';

export interface TournamentTeamEntity {
  id: string;
  name: string;
  stats: { [key: string]: any };
  group: TournamentGroupEntity;
}

export interface TournamentTeamState {
  isLoadingDeleteTournamentTeam: boolean;
  isLoadingPatchTournamentTeam: boolean;
  isLoadingPostTournamentTeam: boolean;
  isLoadingRequestTournament: boolean;
  tournamentTeams: { [key: string]: TournamentTeamEntity };
  tournamentTeamsByGroup: {
    [key: string]: { [key: string]: TournamentTeamEntity };
  };
}

export const initialState: TournamentTeamState = {
  isLoadingDeleteTournamentTeam: false,
  isLoadingPatchTournamentTeam: false,
  isLoadingPostTournamentTeam: false,
  isLoadingRequestTournament: false,
  tournamentTeams: {},
  tournamentTeamsByGroup: {}
};

export const DEFAULT_TEAM_ENTITY = {
  id: '',
  name: '',
  stats: {},
  group: DEFAULT_GROUP_ENTITY
};
