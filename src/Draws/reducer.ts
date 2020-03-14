import {
  GET_PHASE,
  GET_PHASE_FAILURE,
  GET_PHASE_SUCCESS
} from '../Phases/actions';
import { ApiDraw, ApiPhase } from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntitiesOverride,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_DRAW,
  DELETE_DRAW_FAILURE,
  DELETE_DRAW_SUCCESS,
  PATCH_DRAW,
  PATCH_DRAW_FAILURE,
  PATCH_DRAW_SUCCESS,
  POST_DRAW,
  POST_DRAW_FAILURE,
  POST_DRAW_SUCCESS
} from './actions';
import { mapApiDrawToDrawEntity } from './dataMappers';
import { DrawEntity, DrawState, initialState } from './state';

const drawMapEntities = mapEntities<DrawEntity>(returnProperty('id'));

const apiDrawToEntities = apiDataToEntitiesOverride<ApiDraw, DrawEntity>(
  mapApiDrawToDrawEntity,
  returnProperty('id')
);

const deleteDraw = (state: DrawState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingDeleteDraw: true
});

const deleteDrawFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteDraw: false
});

const deleteDrawSuccess = (
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

const patchDraw = (state: DrawState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingPatchDraw: true
});

const patchDrawFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchDraw: false
});

const patchDrawSuccess = (
  state: DrawState,
  action: HttpAction<ActionTypes, DrawEntity>
) => ({
  ...state,
  isLoadingPatchDraw: false,
  draws: [action.payload].reduce(drawMapEntities, state.draws)
});

const postDraw = (state: DrawState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingPostDraw: true
});

const postDrawFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostDraw: false
});

const postDrawSuccess = (
  state: DrawState,
  action: HttpAction<ActionTypes, DrawEntity>
) => ({
  ...state,
  isLoadingPostDraw: false,
  draws: [action.payload].reduce(drawMapEntities, state.draws)
});

const getPhase = (state: DrawState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingRequestTournament: true
});

const getPhaseFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

const getPhaseSuccess = (
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
  [DELETE_DRAW]: deleteDraw,
  [DELETE_DRAW_FAILURE]: deleteDrawFailure,
  [DELETE_DRAW_SUCCESS]: deleteDrawSuccess,
  [PATCH_DRAW]: patchDraw,
  [PATCH_DRAW_FAILURE]: patchDrawFailure,
  [PATCH_DRAW_SUCCESS]: patchDrawSuccess,
  [POST_DRAW]: postDraw,
  [POST_DRAW_FAILURE]: postDrawFailure,
  [POST_DRAW_SUCCESS]: postDrawSuccess,
  [GET_PHASE]: getPhase,
  [GET_PHASE_FAILURE]: getPhaseFailure,
  [GET_PHASE_SUCCESS]: getPhaseSuccess
});
