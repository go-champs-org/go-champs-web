import { PhaseRoundEntity } from '../../Phases/Rounds/state';
import { PhaseStandingsEntity } from '../../Phases/Standings/state';
import { TournamentStatEntity } from '../Stats/state';

export enum PhaseTypes {
  standings = 'standings',
  bracket = 'bracket'
}

export interface TournamentPhaseEntity {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
  isInProgress: boolean;
  rounds: PhaseRoundEntity[];
  stats: TournamentStatEntity[];
  standings: PhaseStandingsEntity[];
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
