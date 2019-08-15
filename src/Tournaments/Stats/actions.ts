import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  PATCH_TOURNAMENT,
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import httpClient from './httpClient';
import { TournamentStatEntity } from './state';

export const DELETE_TOURNAMENT_STAT = 'API_DELETE_TOURNAMENT_STAT';
export const DELETE_TOURNAMENT_STAT_SUCCESS =
  'API_DELETE_TOURNAMENT_STAT_SUCCESS';
export const DELETE_TOURNAMENT_STAT_FAILURE =
  'API_DELETE_TOURNAMENT_STAT_FAILURE';
export const PATCH_TOURNAMENT_STAT = 'API_PATCH_TOURNAMENT_STAT';
export const PATCH_TOURNAMENT_STAT_SUCCESS =
  'API_PATCH_TOURNAMENT_STAT_SUCCESS';
export const PATCH_TOURNAMENT_STAT_FAILURE =
  'API_PATCH_TOURNAMENT_STAT_FAILURE';
export const POST_TOURNAMENT_STAT = 'API_POST_TOURNAMENT_STAT';
export const POST_TOURNAMENT_STAT_SUCCESS = 'API_POST_TOURNAMENT_STAT_SUCCESS';
export const POST_TOURNAMENT_STAT_FAILURE = 'API_POST_TOURNAMENT_STAT_FAILURE';

export const deleteTournamentStat = (tournamentId: string) => (
  tournamentStat: TournamentStatEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_STAT });

  try {
    const response = await httpClient.delete(tournamentId, tournamentStat.id);

    dispatch(deleteTournamentStatSuccess(response));
    displayToast(`${tournamentStat.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentStatFailure(err));
  }
};

export const deleteTournamentStatSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_STAT_SUCCESS,
  payload
});

export const deleteTournamentStatFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_STAT_FAILURE,
  payload
});

export const patchTournamentStat = (tournamentId: string) => (
  tournamentStat: TournamentStatEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT });

  try {
    const response = await httpClient.patch(tournamentId, tournamentStat);

    dispatch(patchTournamentStatSuccess(response));
    displayToast(`${tournamentStat.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentStatFailure(err));
  }
};

export const patchTournamentStatSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_STAT_SUCCESS,
  payload
});

export const patchTournamentStatFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_STAT_FAILURE,
  payload
});

export const postTournamentStat = (tournamentId: string) => (
  tournamentStat: TournamentStatEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_STAT });

  try {
    const response = await httpClient.post(tournamentId, tournamentStat);

    dispatch(postTournamentStatSuccess(response));
    displayToast(`${tournamentStat.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentStatFailure(err));
  }
};

export const postTournamentStatSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_STAT_SUCCESS,
  payload
});

export const postTournamentStatFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_STAT_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT_STAT
  | typeof DELETE_TOURNAMENT_STAT_SUCCESS
  | typeof DELETE_TOURNAMENT_STAT_FAILURE
  | typeof PATCH_TOURNAMENT_STAT
  | typeof PATCH_TOURNAMENT_STAT_SUCCESS
  | typeof PATCH_TOURNAMENT_STAT_FAILURE
  | typeof POST_TOURNAMENT_STAT
  | typeof POST_TOURNAMENT_STAT_SUCCESS
  | typeof POST_TOURNAMENT_STAT_FAILURE
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
