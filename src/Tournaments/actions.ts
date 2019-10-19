import { HttpAction } from '../Shared/store/interfaces';
import { TournamentEntity } from './state';

export const DELETE_TOURNAMENT = 'API_DELETE_TOURNAMENT';
export const DELETE_TOURNAMENT_SUCCESS = 'API_DELETE_TOURNAMENT_SUCCESS';
export const DELETE_TOURNAMENT_FAILURE = 'API_DELETE_TOURNAMENT_FAILURE';
export const PATCH_TOURNAMENT = 'API_PATCH_TOURNAMENT';
export const PATCH_TOURNAMENT_SUCCESS = 'API_PATCH_TOURNAMENT_SUCCESS';
export const PATCH_TOURNAMENT_FAILURE = 'API_PATCH_TOURNAMENT_FAILURE';
export const POST_TOURNAMENT = 'API_POST_TOURNAMENT';
export const POST_TOURNAMENT_SUCCESS = 'API_POST_TOURNAMENT_SUCCESS';
export const POST_TOURNAMENT_FAILURE = 'API_POST_TOURNAMENT_FAILURE';
export const GET_TOURNAMENTS_BY_FILTER = 'API_GET_TOURNAMENTS_BY_FILTER';
export const GET_TOURNAMENTS_BY_FILTER_SUCCESS =
  'API_GET_TOURNAMENTS_BY_FILTER_SUCCESS';
export const GET_TOURNAMENTS_BY_FILTER_FAILURE =
  'API_GET_TOURNAMENTS_BY_FILTER_FAILURE';
export const GET_TOURNAMENT = 'API_GET_TOURNAMENT';
export const GET_TOURNAMENT_SUCCESS = 'API_GET_TOURNAMENT_SUCCESS';
export const GET_TOURNAMENT_FAILURE = 'API_GET_TOURNAMENT_FAILURE';

export const deleteTournamentStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT
});

export const deleteTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_SUCCESS,
  payload
});

export const deleteTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_FAILURE,
  payload
});

export const patchTournamentStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT
});

export const patchTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_SUCCESS,
  payload
});

export const patchTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_FAILURE,
  payload
});

export const postTournamentStart = (): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT
});

export const postTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_SUCCESS,
  payload
});

export const postTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_FAILURE,
  payload
});

export const getTournamentsByFilterStart = (): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENTS_BY_FILTER
});

export const getTournamentsByFilterSuccess = (
  payload: any
): HttpAction<ActionTypes, TournamentEntity[]> => ({
  type: GET_TOURNAMENTS_BY_FILTER_SUCCESS,
  payload
});

export const getTournamentsByFilterFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENTS_BY_FILTER_FAILURE,
  payload
});

export const getTournamentStart = (): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT
});

export const getTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes, TournamentEntity> => ({
  type: GET_TOURNAMENT_SUCCESS,
  payload
});

export const getTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT
  | typeof DELETE_TOURNAMENT_FAILURE
  | typeof DELETE_TOURNAMENT_SUCCESS
  | typeof PATCH_TOURNAMENT
  | typeof PATCH_TOURNAMENT_FAILURE
  | typeof PATCH_TOURNAMENT_SUCCESS
  | typeof POST_TOURNAMENT
  | typeof POST_TOURNAMENT_FAILURE
  | typeof POST_TOURNAMENT_SUCCESS
  | typeof GET_TOURNAMENTS_BY_FILTER
  | typeof GET_TOURNAMENTS_BY_FILTER_FAILURE
  | typeof GET_TOURNAMENTS_BY_FILTER_SUCCESS
  | typeof GET_TOURNAMENT
  | typeof GET_TOURNAMENT_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
