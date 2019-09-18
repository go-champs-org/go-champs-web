import { TournamentPhaseEntity, TournamentPhaseState } from './state';

export const phases = (state: TournamentPhaseState) =>
  Object.keys(state.tournamentPhases).map(
    (key: string) => state.tournamentPhases[key]
  );

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
