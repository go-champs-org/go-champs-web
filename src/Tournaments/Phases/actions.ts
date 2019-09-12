import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import httpClient from './httpClient';
import { TournamentPhaseEntity } from './state';

export const DELETE_TOURNAMENT_PHASE = 'API_DELETE_TOURNAMENT_PHASE';
export const DELETE_TOURNAMENT_PHASE_SUCCESS =
  'API_DELETE_TOURNAMENT_PHASE_SUCCESS';
export const DELETE_TOURNAMENT_PHASE_FAILURE =
  'API_DELETE_TOURNAMENT_PHASE_FAILURE';
export const PATCH_TOURNAMENT_PHASE = 'API_PATCH_TOURNAMENT_PHASE';
export const PATCH_TOURNAMENT_PHASE_SUCCESS =
  'API_PATCH_TOURNAMENT_PHASE_SUCCESS';
export const PATCH_TOURNAMENT_PHASE_FAILURE =
  'API_PATCH_TOURNAMENT_PHASE_FAILURE';
export const POST_TOURNAMENT_PHASE = 'API_POST_TOURNAMENT_PHASE';
export const POST_TOURNAMENT_PHASE_SUCCESS =
  'API_POST_TOURNAMENT_PHASE_SUCCESS';
export const POST_TOURNAMENT_PHASE_FAILURE =
  'API_POST_TOURNAMENT_PHASE_FAILURE';
export const REQUEST_TOURNAMENT_PHASE = 'API_REQUEST_TOURNAMENT_PHASE';
export const REQUEST_TOURNAMENT_PHASE_SUCCESS =
  'API_REQUEST_TOURNAMENT_PHASE_SUCCESS';
export const REQUEST_TOURNAMENT_PHASE_FAILURE =
  'API_REQUEST_TOURNAMENT_PHASE_FAILURE';

export const deleteTournamentPhase = (tournamentId: string) => (
  tournamentPhase: TournamentPhaseEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_PHASE });

  try {
    const response = await httpClient.delete(tournamentPhase.id);

    dispatch(deleteTournamentPhaseSuccess(response));
    displayToast(`${tournamentPhase.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentPhaseFailure(err));
  }
};

export const deleteTournamentPhaseSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_PHASE_SUCCESS,
  payload
});

export const deleteTournamentPhaseFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_PHASE_FAILURE,
  payload
});

export const patchTournamentPhase = (tournamentId: string) => (
  tournamentPhase: TournamentPhaseEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT_PHASE });

  try {
    const response = await httpClient.patch(tournamentPhase);

    dispatch(patchTournamentPhaseSuccess(response));
    displayToast(`${tournamentPhase.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentPhaseFailure(err));
  }
};

export const patchTournamentPhaseSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_PHASE_SUCCESS,
  payload
});

export const patchTournamentPhaseFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_PHASE_FAILURE,
  payload
});

export const postTournamentPhase = (tournamentId: string) => (
  tournamentPhase: TournamentPhaseEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_PHASE });

  try {
    const response = await httpClient.post(tournamentPhase);

    dispatch(postTournamentPhaseSuccess(response));
    displayToast(`${tournamentPhase.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentPhaseFailure(err));
  }
};

export const postTournamentPhaseSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_PHASE_SUCCESS,
  payload
});

export const postTournamentPhaseFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_PHASE_FAILURE,
  payload
});

export const requestTournamentPhase = (
  tournamentPhaseId: string
) => () => async (dispatch: any) => {
  dispatch({ type: REQUEST_TOURNAMENT_PHASE });

  try {
    const response = await httpClient.get(tournamentPhaseId);

    dispatch(requestTournamentPhaseSuccess(response));
  } catch (err) {
    dispatch(requestTournamentPhaseFailure(err));
  }
};

export const requestTournamentPhaseSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_PHASE_SUCCESS,
  payload
});

export const requestTournamentPhaseFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_PHASE_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT_PHASE
  | typeof DELETE_TOURNAMENT_PHASE_SUCCESS
  | typeof DELETE_TOURNAMENT_PHASE_FAILURE
  | typeof PATCH_TOURNAMENT_PHASE
  | typeof PATCH_TOURNAMENT_PHASE_SUCCESS
  | typeof PATCH_TOURNAMENT_PHASE_FAILURE
  | typeof POST_TOURNAMENT_PHASE
  | typeof POST_TOURNAMENT_PHASE_SUCCESS
  | typeof POST_TOURNAMENT_PHASE_FAILURE
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS
  | typeof REQUEST_TOURNAMENT_PHASE
  | typeof REQUEST_TOURNAMENT_PHASE_FAILURE
  | typeof REQUEST_TOURNAMENT_PHASE_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
