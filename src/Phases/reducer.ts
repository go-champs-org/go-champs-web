import { ApiPhase } from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntities,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { LOAD_DEFAULT_PHASE } from '../Shared/store/routerActions';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import { TournamentEntity } from '../Tournaments/state';
import {
  ActionTypes,
  DELETE_TOURNAMENT_PHASE,
  DELETE_TOURNAMENT_PHASE_FAILURE,
  DELETE_TOURNAMENT_PHASE_SUCCESS,
  GET_PHASE,
  GET_PHASE_FAILURE,
  GET_PHASE_SUCCESS,
  PATCH_TOURNAMENT_PHASE,
  PATCH_TOURNAMENT_PHASE_FAILURE,
  PATCH_TOURNAMENT_PHASE_SUCCESS,
  POST_TOURNAMENT_PHASE,
  POST_TOURNAMENT_PHASE_FAILURE,
  POST_TOURNAMENT_PHASE_SUCCESS
} from './actions';
import { mapApiPhaseToPhaseEntity } from './dataMappers';
import { initialState, PhaseEntity, PhaseState } from './state';

const tournamentPhaseMapEntities = mapEntities<PhaseEntity>(
  returnProperty('id')
);

const apiPhaseToEntities = apiDataToEntities<ApiPhase, PhaseEntity>(
  mapApiPhaseToPhaseEntity,
  returnProperty('id')
);

export const deletePhase = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePhase: true
});

export const deletePhaseFailure = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePhase: false
});

export const deletePhaseSuccess = (
  state: PhaseState,
  action: HttpAction<ActionTypes, string>
) => {
  const phases = Object.keys(state.phases)
    .filter(entityById(state.phases, action.payload!))
    .reduce(mapEntitiesByKey(state.phases), {});
  return {
    ...state,
    phases,
    isLoadingDeletePhase: false
  };
};

export const patchPhase = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchPhase: true
});

export const patchPhaseFailure = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchPhase: false
});

export const patchPhaseSuccess = (
  state: PhaseState,
  action: HttpAction<ActionTypes, PhaseEntity>
) => ({
  ...state,
  isLoadingPatchPhase: false,
  phases: [action.payload].reduce(tournamentPhaseMapEntities, state.phases)
});

export const postPhase = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPhase: true
});

export const postPhaseFailure = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPhase: false
});

export const postPhaseSuccess = (
  state: PhaseState,
  action: HttpAction<ActionTypes, PhaseEntity>
) => ({
  ...state,
  isLoadingPostPhase: false,
  phases: [action.payload].reduce(tournamentPhaseMapEntities, state.phases)
});

export const requestTournament = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentFailure = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentSuccess = (
  state: PhaseState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  phases: action.payload!.phases.reduce(tournamentPhaseMapEntities, {})
});

export const getPhase = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const getPhaseFailure = (
  state: PhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const getPhaseSuccess = (
  state: PhaseState,
  action: HttpAction<ActionTypes, ApiPhase>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  phases: [action.payload!].reduce(apiPhaseToEntities, {})
});

export const loadDefaultPhasePayload = (state: PhaseState) => ({
  ...state,
  isLoadingRequestTournament: true
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_PHASE]: deletePhase,
  [DELETE_TOURNAMENT_PHASE_FAILURE]: deletePhaseFailure,
  [DELETE_TOURNAMENT_PHASE_SUCCESS]: deletePhaseSuccess,
  [LOAD_DEFAULT_PHASE]: loadDefaultPhasePayload,
  [PATCH_TOURNAMENT_PHASE]: patchPhase,
  [PATCH_TOURNAMENT_PHASE_FAILURE]: patchPhaseFailure,
  [PATCH_TOURNAMENT_PHASE_SUCCESS]: patchPhaseSuccess,
  [POST_TOURNAMENT_PHASE]: postPhase,
  [POST_TOURNAMENT_PHASE_FAILURE]: postPhaseFailure,
  [POST_TOURNAMENT_PHASE_SUCCESS]: postPhaseSuccess,
  [REQUEST_TOURNAMENT]: requestTournament,
  [REQUEST_TOURNAMENT_FAILURE]: requestTournamentFailure,
  [REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess,
  [GET_PHASE]: getPhase,
  [GET_PHASE_FAILURE]: getPhaseFailure,
  [GET_PHASE_SUCCESS]: getPhaseSuccess
});
