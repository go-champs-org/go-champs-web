import { HttpAction } from '../Shared/store/interfaces';
import { DrawEntity } from './state';

export const DELETE_DRAW = 'API_DELETE_DRAW';
export const DELETE_DRAW_SUCCESS = 'API_DELETE_DRAW_SUCCESS';
export const DELETE_DRAW_FAILURE = 'API_DELETE_DRAW_FAILURE';
export const PATCH_DRAW = 'API_PATCH_DRAW';
export const PATCH_DRAW_SUCCESS = 'API_PATCH_DRAW_SUCCESS';
export const PATCH_DRAW_FAILURE = 'API_PATCH_DRAW_FAILURE';
export const POST_DRAW = 'API_POST_DRAW';
export const POST_DRAW_SUCCESS = 'API_POST_DRAW_SUCCESS';
export const POST_DRAW_FAILURE = 'API_POST_DRAW_FAILURE';

export const deleteDrawStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_DRAW
});

export const deleteDrawSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_DRAW_SUCCESS,
  payload
});

export const deleteDrawFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_DRAW_FAILURE,
  payload
});

export const patchDrawStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_DRAW
});

export const patchDrawSuccess = (
  payload: DrawEntity
): HttpAction<ActionTypes, DrawEntity> => ({
  type: PATCH_DRAW_SUCCESS,
  payload
});

export const patchDrawFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_DRAW_FAILURE,
  payload
});

export const postDrawStart = (): HttpAction<ActionTypes> => ({
  type: POST_DRAW
});

export const postDrawSuccess = (
  payload: DrawEntity
): HttpAction<ActionTypes, DrawEntity> => ({
  type: POST_DRAW_SUCCESS,
  payload
});

export const postDrawFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_DRAW_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_DRAW
  | typeof DELETE_DRAW_SUCCESS
  | typeof DELETE_DRAW_FAILURE
  | typeof PATCH_DRAW
  | typeof PATCH_DRAW_SUCCESS
  | typeof PATCH_DRAW_FAILURE
  | typeof POST_DRAW
  | typeof POST_DRAW_SUCCESS
  | typeof POST_DRAW_FAILURE;
export type Actions = HttpAction<ActionTypes>;
