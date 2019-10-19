import { ApiPhase } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import {
  GET_TOURNAMENT,
  GET_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';

export const DELETE_PHASE = 'API_DELETE_PHASE';
export const DELETE_PHASE_SUCCESS = 'API_DELETE_PHASE_SUCCESS';
export const DELETE_PHASE_FAILURE = 'API_DELETE_PHASE_FAILURE';
export const PATCH_PHASE = 'API_PATCH_PHASE';
export const PATCH_PHASE_SUCCESS = 'API_PATCH_PHASE_SUCCESS';
export const PATCH_PHASE_FAILURE = 'API_PATCH_PHASE_FAILURE';
export const POST_PHASE = 'API_POST_PHASE';
export const POST_PHASE_SUCCESS = 'API_POST_PHASE_SUCCESS';
export const POST_PHASE_FAILURE = 'API_POST_PHASE_FAILURE';
export const GET_PHASE = 'API_GET_PHASE';
export const GET_PHASE_SUCCESS = 'API_GET_PHASE_SUCCESS';
export const GET_PHASE_FAILURE = 'API_GET_PHASE_FAILURE';

export const deletePhaseStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_PHASE
});

export const deletePhaseSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PHASE_SUCCESS,
  payload
});

export const deletePhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_PHASE_FAILURE,
  payload
});

export const patchPhaseStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_PHASE
});

export const patchPhaseSuccess = (
  payload: ApiPhase
): HttpAction<ActionTypes, ApiPhase> => ({
  type: PATCH_PHASE_SUCCESS,
  payload
});

export const patchPhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_PHASE_FAILURE,
  payload
});

export const postPhaseStart = (): HttpAction<ActionTypes> => ({
  type: POST_PHASE
});

export const postPhaseSuccess = (
  payload: ApiPhase
): HttpAction<ActionTypes, ApiPhase> => ({
  type: POST_PHASE_SUCCESS,
  payload
});

export const postPhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_PHASE_FAILURE,
  payload
});

export const getPhaseStart = (): HttpAction<ActionTypes> => ({
  type: GET_PHASE
});

export const getPhaseSuccess = (
  payload: ApiPhase
): HttpAction<ActionTypes, ApiPhase> => ({
  type: GET_PHASE_SUCCESS,
  payload
});

export const getPhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: GET_PHASE_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_PHASE
  | typeof DELETE_PHASE_SUCCESS
  | typeof DELETE_PHASE_FAILURE
  | typeof PATCH_PHASE
  | typeof PATCH_PHASE_SUCCESS
  | typeof PATCH_PHASE_FAILURE
  | typeof POST_PHASE
  | typeof POST_PHASE_SUCCESS
  | typeof POST_PHASE_FAILURE
  | typeof GET_TOURNAMENT
  | typeof GET_TOURNAMENT_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS
  | typeof GET_PHASE
  | typeof GET_PHASE_FAILURE
  | typeof GET_PHASE_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
