export interface TournamentPhaseEntity {
  id: string;
  title: string;
  type: 'standings' | 'bracket';
}

export interface TournamentPhaseState {
  isLoadingDeleteTournamentPhase: boolean;
  isLoadingPatchTournamentPhase: boolean;
  isLoadingPostTournamentPhase: boolean;
  isLoadingRequestTournament: boolean;
  tournamentPhases: { [key: string]: TournamentPhaseEntity };
}

export const initialState: TournamentPhaseState = {
  isLoadingDeleteTournamentPhase: false,
  isLoadingPatchTournamentPhase: false,
  isLoadingPostTournamentPhase: false,
  isLoadingRequestTournament: false,
  tournamentPhases: {}
};
