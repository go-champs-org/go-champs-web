import { TournamentStatEntity } from '../Tournaments/Stats/state';

export enum PhaseTypes {
  elimination = 'elimination',
  draw = 'draw'
}

export interface TournamentPhaseEntity {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
  isInProgress: boolean;
  stats: TournamentStatEntity[];
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
