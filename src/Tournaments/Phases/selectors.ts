import { StoreState } from '../../store';
import { TournamentPhaseEntity } from './state';

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
      type: 'bracket'
    };
  }
  return state.tournamentPhases.tournamentPhases[defaultPhaseId];
};
