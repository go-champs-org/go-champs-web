import {
  GET_PHASE,
  GET_PHASE_FAILURE,
  GET_PHASE_SUCCESS
} from '../Phases/actions';
import { ApiDraw, ApiPhase } from '../Shared/httpClient/apiTypes';
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
import { mapApiDrawToDrawEntity } from './dataMappers';
import { DrawEntity, DrawState, initialState } from './state';

const drawMapEntities = mapEntities<DrawEntity>(returnProperty('id'));

const apiDrawToEntities = apiDataToEntities<ApiDraw, DrawEntity>(
  mapApiDrawToDrawEntity,
  returnProperty('id')
);

export const deleteDraw = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteDraw: true
});

export const deleteDrawFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteDraw: false
});

export const deleteDrawSuccess = (
  state: DrawState,
  action: HttpAction<ActionTypes, string>
) => {
  const draws = Object.keys(state.draws)
    .filter(entityById(state.draws, action.payload!))
    .reduce(mapEntitiesByKey(state.draws), {});
  return {
    ...state,
    draws,
    isLoadingDeleteDraw: false
  };
};

export const patchDraw = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchDraw: true
});

export const patchDrawFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchDraw: false
});

export const patchDrawSuccess = (
  state: DrawState,
  action: HttpAction<ActionTypes, DrawEntity>
) => ({
  ...state,
  isLoadingPatchDraw: false,
  draws: [action.payload].reduce(drawMapEntities, state.draws)
});

export const postDraw = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostDraw: true
});

export const postDrawFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostDraw: false
});

export const postDrawSuccess = (
  state: DrawState,
  action: HttpAction<ActionTypes, DrawEntity>
) => ({
  ...state,
  isLoadingPostDraw: false,
  draws: [action.payload].reduce(drawMapEntities, state.draws)
});

export const getPhase = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const getPhaseFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const getPhaseSuccess = (
  state: DrawState,
  action: HttpAction<ActionTypes, ApiPhase>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  draws: action.payload!.draws
    ? action.payload!.draws.reduce(apiDrawToEntities, {})
    : {}
});

export default createReducer<DrawState>(initialState, {
  [DELETE_PHASE_ROUND]: deleteDraw,
  [DELETE_PHASE_ROUND_FAILURE]: deleteDrawFailure,
  [DELETE_PHASE_ROUND_SUCCESS]: deleteDrawSuccess,
  [PATCH_PHASE_ROUND]: patchDraw,
  [PATCH_PHASE_ROUND_FAILURE]: patchDrawFailure,
  [PATCH_PHASE_ROUND_SUCCESS]: patchDrawSuccess,
  [POST_PHASE_ROUND]: postDraw,
  [POST_PHASE_ROUND_FAILURE]: postDrawFailure,
  [POST_PHASE_ROUND_SUCCESS]: postDrawSuccess,
  [GET_PHASE]: getPhase,
  [GET_PHASE_FAILURE]: getPhaseFailure,
  [GET_PHASE_SUCCESS]: getPhaseSuccess
});
