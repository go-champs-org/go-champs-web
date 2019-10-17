import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import gameHttpClient, { RequestFilter } from './gameHttpClient';
import { GameEntity } from './state';

export const DELETE_TOURNAMENT_GAME = 'API_DELETE_TOURNAMENT_GAME';
export const DELETE_TOURNAMENT_GAME_SUCCESS =
  'API_DELETE_TOURNAMENT_GAME_SUCCESS';
export const DELETE_TOURNAMENT_GAME_FAILURE =
  'API_DELETE_TOURNAMENT_GAME_FAILURE';
export const REQUEST_TOURNAMENT_GAME = 'API_REQUEST_TOURNAMENT_GAME';
export const REQUEST_TOURNAMENT_GAME_SUCCESS =
  'API_REQUEST_TOURNAMENT_GAME_SUCCESS';
export const REQUEST_TOURNAMENT_GAME_FAILURE =
  'API_REQUEST_TOURNAMENT_GAME_FAILURE';
export const REQUEST_TOURNAMENT_GAMES_BY_FILTER =
  'API_REQUEST_TOURNAMENT_GAMES_BY_FILTER';
export const REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS =
  'API_REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS';
export const REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE =
  'API_REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE';
export const PATCH_TOURNAMENT_GAME = 'API_PATCH_TOURNAMENT_GAME';
export const PATCH_TOURNAMENT_GAME_SUCCESS =
  'API_PATCH_TOURNAMENT_GAME_SUCCESS';
export const PATCH_TOURNAMENT_GAME_FAILURE =
  'API_PATCH_TOURNAMENT_GAME_FAILURE';
export const POST_TOURNAMENT_GAME = 'API_POST_TOURNAMENT_GAME';
export const POST_TOURNAMENT_GAME_SUCCESS = 'API_POST_TOURNAMENT_GAME_SUCCESS';
export const POST_TOURNAMENT_GAME_FAILURE = 'API_POST_TOURNAMENT_GAME_FAILURE';

export const deleteGame = (phaseId: string) => (
  tournamentGame: GameEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.delete(phaseId, tournamentGame.id);

    dispatch(deleteGameSuccess(response));
    displayToast(`Game deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteGameFailure(err));
  }
};

export const deleteGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const deleteGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GAME_FAILURE,
  payload
});

export const patchGame = (phaseId: string) => (
  tournamentGame: GameEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.patch(phaseId, tournamentGame);

    dispatch(patchGameSuccess(response));
    displayToast(`Game updated!`, 'is-success');
  } catch (err) {
    dispatch(patchGameFailure(err));
  }
};

export const patchGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const patchGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GAME_FAILURE,
  payload
});

export const postGame = (phaseId: string) => (
  tournamentGame: GameEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.post(phaseId, tournamentGame);

    dispatch(postGameSuccess(response));
    displayToast(`Game created!`, 'is-success');
  } catch (err) {
    dispatch(postGameFailure(err));
  }
};

export const postGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const postGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GAME_FAILURE,
  payload
});

export const requestGame = (
  phaseId: string,
  tournamentGameId: string
) => async (dispatch: any) => {
  dispatch({ type: REQUEST_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.get(phaseId, tournamentGameId);

    dispatch(requestGameSuccess(response));
  } catch (err) {
    dispatch(requestGameFailure(err));
  }
};

export const requestGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const requestGameFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAME_FAILURE,
  payload
});

export const requestGamesByFilter = (where: RequestFilter) => async (
  dispatch: any
) => {
  dispatch({ type: REQUEST_TOURNAMENT_GAMES_BY_FILTER });

  try {
    const response = await gameHttpClient.getByFilter(where);

    dispatch(requestGamesByFilterSuccess(response));
  } catch (err) {
    dispatch(requestGamesByFilterFailure(err));
  }
};

export const requestGamesByFilterSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS,
  payload
});

export const requestGamesByFilterFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE,
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
  | typeof REQUEST_TOURNAMENT_GAME
  | typeof REQUEST_TOURNAMENT_GAME_FAILURE
  | typeof REQUEST_TOURNAMENT_GAME_SUCCESS
  | typeof REQUEST_TOURNAMENT_GAMES_BY_FILTER
  | typeof REQUEST_TOURNAMENT_GAMES_BY_FILTER_FAILURE
  | typeof REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
