import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import gameHttpClient, { RequestFilter } from './gameHttpClient';
import { TournamentGameEntity } from './state';

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

export const deleteTournamentGame = (phaseId: string) => (
  tournamentGame: TournamentGameEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.delete(phaseId, tournamentGame.id);

    dispatch(deleteTournamentGameSuccess(response));
    displayToast(`Game deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentGameFailure(err));
  }
};

export const deleteTournamentGameSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const deleteTournamentGameFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GAME_FAILURE,
  payload
});

export const patchTournamentGame = (phaseId: string) => (
  tournamentGame: TournamentGameEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.patch(phaseId, tournamentGame);

    dispatch(patchTournamentGameSuccess(response));
    displayToast(`Game updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentGameFailure(err));
  }
};

export const patchTournamentGameSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const patchTournamentGameFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GAME_FAILURE,
  payload
});

export const postTournamentGame = (phaseId: string) => (
  tournamentGame: TournamentGameEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.post(phaseId, tournamentGame);

    dispatch(postTournamentGameSuccess(response));
    displayToast(`Game created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentGameFailure(err));
  }
};

export const postTournamentGameSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const postTournamentGameFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GAME_FAILURE,
  payload
});

export const requestTournamentGame = (
  phaseId: string,
  tournamentGameId: string
) => async (dispatch: any) => {
  dispatch({ type: REQUEST_TOURNAMENT_GAME });

  try {
    const response = await gameHttpClient.get(phaseId, tournamentGameId);

    dispatch(requestTournamentGameSuccess(response));
  } catch (err) {
    dispatch(requestTournamentGameFailure(err));
  }
};

export const requestTournamentGameSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAME_SUCCESS,
  payload
});

export const requestTournamentGameFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAME_FAILURE,
  payload
});

export const requestTournamentGamesByFilter = (where: RequestFilter) => async (
  dispatch: any
) => {
  dispatch({ type: REQUEST_TOURNAMENT_GAMES_BY_FILTER });

  try {
    const response = await gameHttpClient.getByFilter(where);

    dispatch(requestTournamentGamesByFilterSuccess(response));
  } catch (err) {
    dispatch(requestTournamentGamesByFilterFailure(err));
  }
};

export const requestTournamentGamesByFilterSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAMES_BY_FILTER_SUCCESS,
  payload
});

export const requestTournamentGamesByFilterFailure = (
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
