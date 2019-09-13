import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import httpClient from './httpClient';
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
export const REQUEST_TOURNAMENT_GAMES = 'API_REQUEST_TOURNAMENT_GAMES';
export const REQUEST_TOURNAMENT_GAMES_SUCCESS =
  'API_REQUEST_TOURNAMENT_GAMES_SUCCESS';
export const REQUEST_TOURNAMENT_GAMES_FAILURE =
  'API_REQUEST_TOURNAMENT_GAMES_FAILURE';
export const PATCH_TOURNAMENT_GAME = 'API_PATCH_TOURNAMENT_GAME';
export const PATCH_TOURNAMENT_GAME_SUCCESS =
  'API_PATCH_TOURNAMENT_GAME_SUCCESS';
export const PATCH_TOURNAMENT_GAME_FAILURE =
  'API_PATCH_TOURNAMENT_GAME_FAILURE';
export const POST_TOURNAMENT_GAME = 'API_POST_TOURNAMENT_GAME';
export const POST_TOURNAMENT_GAME_SUCCESS = 'API_POST_TOURNAMENT_GAME_SUCCESS';
export const POST_TOURNAMENT_GAME_FAILURE = 'API_POST_TOURNAMENT_GAME_FAILURE';

export const deleteTournamentGame = (tournamentId: string) => (
  tournamentGame: TournamentGameEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_GAME });

  try {
    const response = await httpClient.delete(tournamentId, tournamentGame.id);

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

export const patchTournamentGame = (tournamentId: string) => (
  tournamentGame: TournamentGameEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT_GAME });

  try {
    const response = await httpClient.patch(tournamentId, tournamentGame);

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

export const postTournamentGame = (tournamentId: string) => (
  tournamentGame: TournamentGameEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_GAME });

  try {
    const response = await httpClient.post(tournamentId, tournamentGame);

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
  tournamentId: string,
  tournamentGameId: string
) => async (dispatch: any) => {
  dispatch({ type: REQUEST_TOURNAMENT_GAME });

  try {
    const response = await httpClient.getOne(tournamentId, tournamentGameId);

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

export const requestTournamentGames = (phaseId: string) => async (
  dispatch: any
) => {
  dispatch({ type: REQUEST_TOURNAMENT_GAMES });

  try {
    const response = await httpClient.getAll(phaseId);

    dispatch(requestTournamentGamesSuccess(response));
  } catch (err) {
    dispatch(requestTournamentGamesFailure(err));
  }
};

export const requestTournamentGamesSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAMES_SUCCESS,
  payload
});

export const requestTournamentGamesFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_GAMES_FAILURE,
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
  | typeof REQUEST_TOURNAMENT_GAMES
  | typeof REQUEST_TOURNAMENT_GAMES_FAILURE
  | typeof REQUEST_TOURNAMENT_GAMES_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
