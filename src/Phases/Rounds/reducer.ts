import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT_PHASE,
  REQUEST_TOURNAMENT_PHASE_FAILURE,
  REQUEST_TOURNAMENT_PHASE_SUCCESS
} from '../../Tournaments/Phases/actions';
import { TournamentPhaseEntity } from '../../Tournaments/Phases/state';
import {
  ActionTypes,
  DELETE_PHASE_ROUND,
  DELETE_PHASE_ROUND_FAILURE,
  DELETE_PHASE_ROUND_SUCCESS,
  PATCH_PHASE_ROUND,
  PATCH_PHASE_ROUND_FAILURE,
  PATCH_PHASE_ROUND_SUCCESS,
  POST_PHASE_ROUND,
  POST_PHASE_ROUND_FAILURE,
  POST_PHASE_ROUND_SUCCESS
} from './actions';
import { initialState, PhaseRoundEntity, PhaseRoundState } from './state';

const phaseRoundMapEntities = mapEntities<PhaseRoundEntity>(
  returnProperty('id')
);

export const deletePhaseRound = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePhaseRound: true
});

export const deletePhaseRoundFailure = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePhaseRound: false
});

export const deletePhaseRoundSuccess = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes, string>
) => {
  const rounds = Object.keys(state.rounds)
    .filter(entityById(state.rounds, action.payload!))
    .reduce(mapEntitiesByKey(state.rounds), {});
  return {
    ...state,
    rounds,
    isLoadingDeletePhaseRound: false
  };
};

export const patchPhaseRound = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchPhaseRound: true
});

export const patchPhaseRoundFailure = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchPhaseRound: false
});

export const patchPhaseRoundSuccess = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes, PhaseRoundEntity>
) => ({
  ...state,
  isLoadingPatchPhaseRound: false,
  rounds: [action.payload].reduce(phaseRoundMapEntities, state.rounds)
});

export const postPhaseRound = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPhaseRound: true
});

export const postPhaseRoundFailure = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPhaseRound: false
});

export const postPhaseRoundSuccess = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes, PhaseRoundEntity>
) => ({
  ...state,
  isLoadingPostPhaseRound: false,
  rounds: [action.payload].reduce(phaseRoundMapEntities, state.rounds)
});

export const requestTournamentPhase = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentPhaseFailure = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentPhaseSuccess = (
  state: PhaseRoundState,
  action: HttpAction<ActionTypes, TournamentPhaseEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  rounds: action.payload!.rounds.reduce(phaseRoundMapEntities, {})
});

export default createReducer<PhaseRoundState>(initialState, {
  [DELETE_PHASE_ROUND]: deletePhaseRound,
  [DELETE_PHASE_ROUND_FAILURE]: deletePhaseRoundFailure,
  [DELETE_PHASE_ROUND_SUCCESS]: deletePhaseRoundSuccess,
  [PATCH_PHASE_ROUND]: patchPhaseRound,
  [PATCH_PHASE_ROUND_FAILURE]: patchPhaseRoundFailure,
  [PATCH_PHASE_ROUND_SUCCESS]: patchPhaseRoundSuccess,
  [POST_PHASE_ROUND]: postPhaseRound,
  [POST_PHASE_ROUND_FAILURE]: postPhaseRoundFailure,
  [POST_PHASE_ROUND_SUCCESS]: postPhaseRoundSuccess,
  [REQUEST_TOURNAMENT_PHASE]: requestTournamentPhase,
  [REQUEST_TOURNAMENT_PHASE_FAILURE]: requestTournamentPhaseFailure,
  [REQUEST_TOURNAMENT_PHASE_SUCCESS]: requestTournamentPhaseSuccess
});
