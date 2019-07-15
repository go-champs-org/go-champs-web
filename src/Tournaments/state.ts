export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  teamStatsStructure: { [key: string]: string };
}

export interface TournamentState {
  isLoadingDeleteTournament: boolean;
  isLoadingPatchTournament: boolean;
  isLoadingPostTournament: boolean;
  isLoadingRequestTournament: boolean;
  isLoadingRequestTournaments: boolean;
  tournaments: { [key: string]: TournamentEntity };
}

export const initialState: TournamentState = {
  isLoadingDeleteTournament: false,
  isLoadingPatchTournament: false,
  isLoadingPostTournament: false,
  isLoadingRequestTournament: false,
  isLoadingRequestTournaments: false,
  tournaments: {}
};
