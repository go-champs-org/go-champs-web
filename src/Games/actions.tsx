import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import { REQUEST_TOURNAMENT_GAME, REQUEST_TOURNAMENT_GAMES, REQUEST_TOURNAMENT_GAMES_FAILURE, REQUEST_TOURNAMENT_GAMES_SUCCESS, REQUEST_TOURNAMENT_GAME_FAILURE, REQUEST_TOURNAMENT_GAME_SUCCESS } from '../Tournaments/Games/actions';
import httpClient from './httpClient';
import { GameEntity } from './state';

export const DELETE_GAME = 'API_DELETE_GAME';
export const DELETE_GAME_SUCCESS = 'API_DELETE_GAME_SUCCESS';
export const DELETE_GAME_FAILURE = 'API_DELETE_GAME_FAILURE';
export const PATCH_GAME = 'API_PATCH_GAME';
export const PATCH_GAME_SUCCESS = 'API_PATCH_GAME_SUCCESS';
export const PATCH_GAME_FAILURE = 'API_PATCH_GAME_FAILURE';
export const POST_GAME = 'API_POST_GAME';
export const POST_GAME_SUCCESS = 'API_POST_GAME_SUCCESS';
export const POST_GAME_FAILURE = 'API_POST_GAME_FAILURE';

export const deleteGame = (game: GameEntity) => async (
  dispatch: any
) => {
  dispatch({ type: DELETE_GAME });

  try {
    const response = await httpClient.delete(game.id);

    dispatch(deleteGameSuccess(response));
    displayToast(`Game deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteGameFailure(err));
  }
};

export const deleteGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_GAME_SUCCESS,
  payload
});

export const deleteGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_GAME_FAILURE,
  payload
});

export const patchGame = (game: GameEntity) => async (
  dispatch: any
) => {
  dispatch({ type: PATCH_GAME });

  try {
    const response = await httpClient.patch(game);

    dispatch(patchGameSuccess(response));
    displayToast(`Game updated!`, 'is-success');
  } catch (err) {
    dispatch(patchGameFailure(err));
  }
};

export const patchGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_GAME_SUCCESS,
  payload
});

export const patchGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_GAME_FAILURE,
  payload
});

export const postGame = (game: GameEntity) => async (
  dispatch: any
) => {
  dispatch({ type: POST_GAME });

  try {
    const response = await httpClient.post(game);

    dispatch(postGameSuccess(response));
    displayToast(`Game created!`, 'is-success');
  } catch (err) {
    dispatch(postGameFailure(err));
  }
};

export const postGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_GAME_SUCCESS,
  payload
});

export const postGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_GAME_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_GAME
  | typeof DELETE_GAME_FAILURE
  | typeof DELETE_GAME_SUCCESS
  | typeof PATCH_GAME
  | typeof PATCH_GAME_FAILURE
  | typeof PATCH_GAME_SUCCESS
  | typeof POST_GAME
  | typeof POST_GAME_FAILURE
  | typeof POST_GAME_SUCCESS
  | typeof REQUEST_TOURNAMENT_GAME
  | typeof REQUEST_TOURNAMENT_GAME_FAILURE
  | typeof REQUEST_TOURNAMENT_GAME_SUCCESS
  | typeof REQUEST_TOURNAMENT_GAMES
  | typeof REQUEST_TOURNAMENT_GAMES_FAILURE
  | typeof REQUEST_TOURNAMENT_GAMES_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
