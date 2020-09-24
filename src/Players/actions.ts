import { ApiPlayer } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';

export const DELETE_PLAYER = 'API_DELETE_PLAYER';
export const DELETE_PLAYER_SUCCESS = 'API_DELETE_PLAYER_SUCCESS';
export const DELETE_PLAYER_FAILURE = 'API_DELETE_PLAYER_FAILURE';
export const PATCH_PLAYER = 'API_PATCH_PLAYER';
export const PATCH_PLAYER_SUCCESS = 'API_PATCH_PLAYER_SUCCESS';
export const PATCH_PLAYER_FAILURE = 'API_PATCH_PLAYER_FAILURE';
export const POST_PLAYER = 'API_POST_PLAYER';
export const POST_PLAYER_SUCCESS = 'API_POST_PLAYER_SUCCESS';
export const POST_PLAYER_FAILURE = 'API_POST_PLAYER_FAILURE';

export const deletePlayerStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_PLAYER
});

export const deletePlayerSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PLAYER_SUCCESS,
  payload
});

export const deletePlayerFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_PLAYER_FAILURE,
  payload
});

export const patchPlayerStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_PLAYER
});

export const patchPlayerSuccess = (
  payload: ApiPlayer
): HttpAction<ActionTypes, ApiPlayer> => ({
  type: PATCH_PLAYER_SUCCESS,
  payload
});

export const patchPlayerFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_PLAYER_FAILURE,
  payload
});

export const postPlayerStart = (): HttpAction<ActionTypes> => ({
  type: POST_PLAYER
});

export const postPlayerSuccess = (
  payload: ApiPlayer
): HttpAction<ActionTypes, ApiPlayer> => ({
  type: POST_PLAYER_SUCCESS,
  payload
});

export const postPlayerFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_PLAYER_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_PLAYER
  | typeof DELETE_PLAYER_SUCCESS
  | typeof DELETE_PLAYER_FAILURE
  | typeof PATCH_PLAYER
  | typeof PATCH_PLAYER_SUCCESS
  | typeof PATCH_PLAYER_FAILURE
  | typeof POST_PLAYER
  | typeof POST_PLAYER_SUCCESS
  | typeof POST_PLAYER_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
