export interface RoundMatchEntity {
  id: string;
  firstTeamId?: string;
  firstTeamParentMatchId?: string;
  firstTeamPlaceholder?: string;
  firstTeamScore?: string;
  secondTeamId?: string;
  secondTeamParentMatchId?: string;
  secondTeamPlaceholder?: string;
  secondTeamScore?: string;
}

export interface PhaseRoundEntity {
  id: string;
  title: string;
  matches: RoundMatchEntity[];
}

export interface PhaseRoundState {
  isLoadingDeletePhaseRound: boolean;
  isLoadingPatchPhaseRound: boolean;
  isLoadingPostPhaseRound: boolean;
  isLoadingRequestTournament: boolean;
  rounds: { [key: string]: PhaseRoundEntity };
}

export const initialState: PhaseRoundState = {
  isLoadingDeletePhaseRound: false,
  isLoadingPatchPhaseRound: false,
  isLoadingPostPhaseRound: false,
  isLoadingRequestTournament: false,
  rounds: {}
};
