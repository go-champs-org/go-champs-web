import { DrawEntity } from '../../Draws/state';
import { EliminationEntity } from '../../Eliminations/state';
import { TournamentStatEntity } from '../Stats/state';

export enum PhaseTypes {
  eliminations = 'eliminations',
  bracket = 'bracket'
}

export interface TournamentPhaseEntity {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
  isInProgress: boolean;
  draws: DrawEntity[];
  stats: TournamentStatEntity[];
  eliminations: EliminationEntity[];
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
