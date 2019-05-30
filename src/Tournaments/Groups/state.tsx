export interface TournamentGroupEntity {
  id: string;
  name: string;
}

export interface TournamentGroupState {
  isLoadingDeleteTournamentGroup: boolean;
  isLoadingPatchTournamentGroup: boolean;
  isLoadingPostTournamentGroup: boolean;
  isLoadingRequestTournament: boolean;
  tournamentGroups: { [key: string]: TournamentGroupEntity };
}

export const initialState: TournamentGroupState = {
  isLoadingDeleteTournamentGroup: false,
  isLoadingPatchTournamentGroup: false,
  isLoadingPostTournamentGroup: false,
  isLoadingRequestTournament: false,
  tournamentGroups: {}
};
