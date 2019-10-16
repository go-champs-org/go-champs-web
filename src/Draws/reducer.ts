import {
  REQUEST_TOURNAMENT_PHASE,
  REQUEST_TOURNAMENT_PHASE_FAILURE,
  REQUEST_TOURNAMENT_PHASE_SUCCESS
} from '../Phases/actions';
import { TournamentPhaseEntity } from '../Phases/state';
import {
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
import { DrawEntity, DrawState, initialState } from './state';

const drawMapEntities = mapEntities<DrawEntity>(returnProperty('id'));

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

export const requestTournamentPhase = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentPhaseFailure = (
  state: DrawState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentPhaseSuccess = (
  state: DrawState,
  action: HttpAction<ActionTypes, TournamentPhaseEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  draws: action.payload!.draws.reduce(drawMapEntities, {})
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
  [REQUEST_TOURNAMENT_PHASE]: requestTournamentPhase,
  [REQUEST_TOURNAMENT_PHASE_FAILURE]: requestTournamentPhaseFailure,
  [REQUEST_TOURNAMENT_PHASE_SUCCESS]: requestTournamentPhaseSuccess
});
