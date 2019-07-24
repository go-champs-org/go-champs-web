export interface TournamentStatEntity {
  id: string;
  title: string;
}

export interface TournamentStatState {
  isLoadingDeleteTournamentStat: boolean;
  isLoadingPatchTournamentStat: boolean;
  isLoadingPostTournamentStat: boolean;
  isLoadingRequestTournament: boolean;
  tournamentStats: { [key: string]: TournamentStatEntity };
}

export const initialState: TournamentStatState = {
  isLoadingDeleteTournamentStat: false,
  isLoadingPatchTournamentStat: false,
  isLoadingPostTournamentStat: false,
  isLoadingRequestTournament: false,
  tournamentStats: {}
};
