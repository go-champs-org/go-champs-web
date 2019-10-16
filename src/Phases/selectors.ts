import { byOrder } from './compareFunctions';
import { TournamentPhaseEntity, TournamentPhaseState } from './state';

export const phases = (state: TournamentPhaseState): TournamentPhaseEntity[] =>
  Object.keys(state.tournamentPhases).map(
    (key: string) => state.tournamentPhases[key]
  );

export const sortedPhases = (
  state: TournamentPhaseState
): TournamentPhaseEntity[] => phases(state).sort(byOrder);

export const isInProgressPhase = (
  state: TournamentPhaseState
): TournamentPhaseEntity | undefined => {
  return phases(state).find(
    (phase: TournamentPhaseEntity) => phase.isInProgress
  );
};

export const phaseById = (
  state: TournamentPhaseState,
  id: string
): TournamentPhaseEntity | undefined => state.tournamentPhases[id];

export const phaseLoading = (state: TournamentPhaseState) =>
  state.isLoadingRequestTournament;
