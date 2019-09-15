import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import groupHttpClient from './groupHttpClient';
import { TournamentGroupEntity } from './state';

export const DELETE_TOURNAMENT_GROUP = 'API_DELETE_TOURNAMENT_GROUP';
export const DELETE_TOURNAMENT_GROUP_SUCCESS =
  'API_DELETE_TOURNAMENT_GROUP_SUCCESS';
export const DELETE_TOURNAMENT_GROUP_FAILURE =
  'API_DELETE_TOURNAMENT_GROUP_FAILURE';
export const PATCH_TOURNAMENT_GROUP = 'API_PATCH_TOURNAMENT_GROUP';
export const PATCH_TOURNAMENT_GROUP_SUCCESS =
  'API_PATCH_TOURNAMENT_GROUP_SUCCESS';
export const PATCH_TOURNAMENT_GROUP_FAILURE =
  'API_PATCH_TOURNAMENT_GROUP_FAILURE';
export const POST_TOURNAMENT_GROUP = 'API_POST_TOURNAMENT_GROUP';
export const POST_TOURNAMENT_GROUP_SUCCESS =
  'API_POST_TOURNAMENT_GROUP_SUCCESS';
export const POST_TOURNAMENT_GROUP_FAILURE =
  'API_POST_TOURNAMENT_GROUP_FAILURE';

export const deleteTournamentGroup = (tournamentId: string) => (
  tournamentGroup: TournamentGroupEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_GROUP });

  try {
    const response = await groupHttpClient.delete(
      tournamentId,
      tournamentGroup.id
    );

    dispatch(deleteTournamentGroupSuccess(response));
    displayToast(`${tournamentGroup.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentGroupFailure(err));
  }
};

export const deleteTournamentGroupSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_TOURNAMENT_GROUP_SUCCESS,
  payload
});

export const deleteTournamentGroupFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GROUP_FAILURE,
  payload
});

export const patchTournamentGroup = (tournamentId: string) => (
  tournamentGroup: TournamentGroupEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT_GROUP });

  try {
    const response = await groupHttpClient.patch(tournamentId, tournamentGroup);

    dispatch(patchTournamentGroupSuccess(response));
    displayToast(`${tournamentGroup.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentGroupFailure(err));
  }
};

export const patchTournamentGroupSuccess = (
  payload: TournamentGroupEntity
): HttpAction<ActionTypes, TournamentGroupEntity> => ({
  type: PATCH_TOURNAMENT_GROUP_SUCCESS,
  payload
});

export const patchTournamentGroupFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GROUP_FAILURE,
  payload
});

export const postTournamentGroup = (tournamentId: string) => (
  tournamentGroup: TournamentGroupEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_GROUP });

  try {
    const response = await groupHttpClient.post(tournamentId, tournamentGroup);

    dispatch(postTournamentGroupSuccess(response));
    displayToast(`${tournamentGroup.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentGroupFailure(err));
  }
};

export const postTournamentGroupSuccess = (
  payload: TournamentGroupEntity
): HttpAction<ActionTypes, TournamentGroupEntity> => ({
  type: POST_TOURNAMENT_GROUP_SUCCESS,
  payload
});

export const postTournamentGroupFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GROUP_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT_GROUP
  | typeof DELETE_TOURNAMENT_GROUP_SUCCESS
  | typeof DELETE_TOURNAMENT_GROUP_FAILURE
  | typeof PATCH_TOURNAMENT_GROUP
  | typeof PATCH_TOURNAMENT_GROUP_SUCCESS
  | typeof PATCH_TOURNAMENT_GROUP_FAILURE
  | typeof POST_TOURNAMENT_GROUP
  | typeof POST_TOURNAMENT_GROUP_SUCCESS
  | typeof POST_TOURNAMENT_GROUP_FAILURE
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
