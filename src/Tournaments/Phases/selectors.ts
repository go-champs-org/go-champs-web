import { StoreState } from '../../store';
import {
  PhaseTypes,
  TournamentPhaseEntity,
  TournamentPhaseState
} from './state';

export const currentPhase = (
  state: StoreState,
  phaseId?: string
): TournamentPhaseEntity => {
  const defaultPhaseId = Object.keys(
    state.tournamentPhases.tournamentPhases
  )[0];
  // TODO (lairjr): Remove this shit
  if (!defaultPhaseId) {
    return {
      id: '',
      order: 1,
      title: '',
      type: PhaseTypes.bracket,
      groups: [],
      stats: []
    };
  }
  return state.tournamentPhases.tournamentPhases[defaultPhaseId];
};

export const phaseLoading = (state: TournamentPhaseState) =>
  state.isLoadingRequestTournament;
