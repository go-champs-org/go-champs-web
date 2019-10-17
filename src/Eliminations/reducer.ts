import {
  GET_PHASE,
  GET_PHASE_FAILURE,
  GET_PHASE_SUCCESS
} from '../Phases/actions';
import { ApiElimination, ApiPhase } from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntities,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_PHASE_STANDINGS,
  DELETE_PHASE_STANDINGS_FAILURE,
  DELETE_PHASE_STANDINGS_SUCCESS,
  PATCH_PHASE_STANDINGS,
  PATCH_PHASE_STANDINGS_FAILURE,
  PATCH_PHASE_STANDINGS_SUCCESS,
  POST_PHASE_STANDINGS,
  POST_PHASE_STANDINGS_FAILURE,
  POST_PHASE_STANDINGS_SUCCESS
} from './actions';
import { mapApiEliminationToEliminationEntity } from './dataMappers';
import { EliminationEntity, EliminationState, initialState } from './state';

const eliminationMapEntities = mapEntities<EliminationEntity>(
  returnProperty('id')
);

const apiEliminationToEntities = apiDataToEntities<
  ApiElimination,
  EliminationEntity
>(mapApiEliminationToEliminationEntity, returnProperty('id'));

export const deleteElimination = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteElimination: true
});

export const deleteEliminationFailure = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteElimination: false
});

export const deleteEliminationSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, string>
) => {
  const eliminations = Object.keys(state.eliminations)
    .filter(entityById(state.eliminations, action.payload!))
    .reduce(mapEntitiesByKey(state.eliminations), {});
  return {
    ...state,
    eliminations,
    isLoadingDeleteElimination: false
  };
};

export const patchElimination = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchElimination: true
});

export const patchEliminationFailure = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchElimination: false
});

export const patchEliminationSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, EliminationEntity>
) => ({
  ...state,
  isLoadingPatchElimination: false,
  eliminations: [action.payload].reduce(
    eliminationMapEntities,
    state.eliminations
  )
});

export const postElimination = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostElimination: true
});

export const postEliminationFailure = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostElimination: false
});

export const postEliminationSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, EliminationEntity>
) => ({
  ...state,
  isLoadingPostElimination: false,
  eliminations: [action.payload].reduce(
    eliminationMapEntities,
    state.eliminations
  )
});

export const getPhase = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const getPhaseFailure = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const getPhaseSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, ApiPhase>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  eliminations: action.payload!.eliminations
    ? action.payload!.eliminations.reduce(apiEliminationToEntities, {})
    : {}
});

export default createReducer<EliminationState>(initialState, {
  [DELETE_PHASE_STANDINGS]: deleteElimination,
  [DELETE_PHASE_STANDINGS_FAILURE]: deleteEliminationFailure,
  [DELETE_PHASE_STANDINGS_SUCCESS]: deleteEliminationSuccess,
  [PATCH_PHASE_STANDINGS]: patchElimination,
  [PATCH_PHASE_STANDINGS_FAILURE]: patchEliminationFailure,
  [PATCH_PHASE_STANDINGS_SUCCESS]: patchEliminationSuccess,
  [POST_PHASE_STANDINGS]: postElimination,
  [POST_PHASE_STANDINGS_FAILURE]: postEliminationFailure,
  [POST_PHASE_STANDINGS_SUCCESS]: postEliminationSuccess,
  [GET_PHASE]: getPhase,
  [GET_PHASE_FAILURE]: getPhaseFailure,
  [GET_PHASE_SUCCESS]: getPhaseSuccess
});
