import { HttpAction } from '../Shared/store/interfaces';
import { GameEntity } from './state';

export const DELETE_TOURNAMENT_GAME = 'API_DELETE_TOURNAMENT_GAME';
export const DELETE_TOURNAMENT_GAME_SUCCESS =
  'API_DELETE_TOURNAMENT_GAME_SUCCESS';
export const DELETE_TOURNAMENT_GAME_FAILURE =
  'API_DELETE_TOURNAMENT_GAME_FAILURE';
export const GET_TOURNAMENT_GAME = 'API_GET_TOURNAMENT_GAME';
export const GET_TOURNAMENT_GAME_SUCCESS = 'API_GET_TOURNAMENT_GAME_SUCCESS';
export const GET_TOURNAMENT_GAME_FAILURE = 'API_GET_TOURNAMENT_GAME_FAILURE';
export const GET_TOURNAMENT_GAMES_BY_FILTER =
  'API_GET_TOURNAMENT_GAMES_BY_FILTER';
export const GET_TOURNAMENT_GAMES_BY_FILTER_SUCCESS =
  'API_GET_TOURNAMENT_GAMES_BY_FILTER_SUCCESS';
export const GET_TOURNAMENT_GAMES_BY_FILTER_FAILURE =
  'API_GET_TOURNAMENT_GAMES_BY_FILTER_FAILURE';
export const PATCH_TOURNAMENT_GAME = 'API_PATCH_TOURNAMENT_GAME';
export const PATCH_TOURNAMENT_GAME_SUCCESS =
  'API_PATCH_TOURNAMENT_GAME_SUCCESS';
export const PATCH_TOURNAMENT_GAME_FAILURE =
  'API_PATCH_TOURNAMENT_GAME_FAILURE';
export const POST_TOURNAMENT_GAME = 'API_POST_TOURNAMENT_GAME';
export const POST_TOURNAMENT_GAME_SUCCESS = 'API_POST_TOURNAMENT_GAME_SUCCESS';
export const POST_TOURNAMENT_GAME_FAILURE = 'API_POST_TOURNAMENT_GAME_FAILURE';

export const deleteGameStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GAME
});

export const deleteGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const deleteGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GAME_FAILURE,
  payload
});

export const patchGameStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GAME
});

export const patchGameSuccess = (
  payload: GameEntity
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const patchGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GAME_FAILURE,
  payload
});

export const postGameStart = (): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GAME
});

export const postGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const postGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GAME_FAILURE,
  payload
});

export const getGameStart = (): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_GAME
});

export const getGameSuccess = (
  payload: GameEntity
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const getGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_GAME_FAILURE,
  payload
});

export const getGamesByFilterStart = (): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_GAMES_BY_FILTER
});

export const getGamesByFilterSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_GAMES_BY_FILTER_SUCCESS,
  payload
});

export const getGamesByFilterFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_GAMES_BY_FILTER_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT_GAME
  | typeof DELETE_TOURNAMENT_GAME_FAILURE
  | typeof DELETE_TOURNAMENT_GAME_SUCCESS
  | typeof PATCH_TOURNAMENT_GAME
  | typeof PATCH_TOURNAMENT_GAME_FAILURE
  | typeof PATCH_TOURNAMENT_GAME_SUCCESS
  | typeof POST_TOURNAMENT_GAME
  | typeof POST_TOURNAMENT_GAME_FAILURE
  | typeof POST_TOURNAMENT_GAME_SUCCESS
  | typeof GET_TOURNAMENT_GAME
  | typeof GET_TOURNAMENT_GAME_FAILURE
  | typeof GET_TOURNAMENT_GAME_SUCCESS
  | typeof GET_TOURNAMENT_GAMES_BY_FILTER
  | typeof GET_TOURNAMENT_GAMES_BY_FILTER_FAILURE
  | typeof GET_TOURNAMENT_GAMES_BY_FILTER_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
