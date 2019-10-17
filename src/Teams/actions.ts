import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import {
  PATCH_TOURNAMENT,
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import { TeamEntity } from './state';
import teamHttpClient from './teamHttpClient';

export const DELETE_TOURNAMENT_TEAM = 'API_DELETE_TOURNAMENT_TEAM';
export const DELETE_TOURNAMENT_TEAM_SUCCESS =
  'API_DELETE_TOURNAMENT_TEAM_SUCCESS';
export const DELETE_TOURNAMENT_TEAM_FAILURE =
  'API_DELETE_TOURNAMENT_TEAM_FAILURE';
export const PATCH_TOURNAMENT_TEAM = 'API_PATCH_TOURNAMENT_TEAM';
export const PATCH_TOURNAMENT_TEAM_SUCCESS =
  'API_PATCH_TOURNAMENT_TEAM_SUCCESS';
export const PATCH_TOURNAMENT_TEAM_FAILURE =
  'API_PATCH_TOURNAMENT_TEAM_FAILURE';
export const POST_TOURNAMENT_TEAM = 'API_POST_TOURNAMENT_TEAM';
export const POST_TOURNAMENT_TEAM_SUCCESS = 'API_POST_TOURNAMENT_TEAM_SUCCESS';
export const POST_TOURNAMENT_TEAM_FAILURE = 'API_POST_TOURNAMENT_TEAM_FAILURE';
export const UPDATE_TOURNAMENT_TEAM_BY_GROUP =
  'UPDATE_TOURNAMENT_TEAM_BY_GROUP';

export const deleteTeam = (tournamentId: string) => (
  tournamentTeam: TeamEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_TEAM });

  try {
    const response = await teamHttpClient.delete(
      tournamentId,
      tournamentTeam.id
    );

    dispatch(deleteTeamSuccess(response));
    dispatch(updateTeamByGroup());
    displayToast(`${tournamentTeam.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTeamFailure(err));
  }
};

export const deleteTeamSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const deleteTeamFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const patchTeam = (tournamentId: string) => (
  tournamentTeam: TeamEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT });

  try {
    const response = await teamHttpClient.patch(tournamentId, tournamentTeam);

    dispatch(patchTeamSuccess(response));
    dispatch(updateTeamByGroup());
    displayToast(`${tournamentTeam.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTeamFailure(err));
  }
};

export const patchTeamSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const patchTeamFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const postTeam = (tournamentId: string) => (
  tournamentTeam: TeamEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_TEAM });

  try {
    const response = await teamHttpClient.post(tournamentId, tournamentTeam);

    dispatch(postTeamSuccess(response));
    dispatch(updateTeamByGroup());
    displayToast(`${tournamentTeam.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTeamFailure(err));
  }
};

export const postTeamSuccess = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const postTeamFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const updateTeamByGroup = (): HttpAction<ActionTypes> => ({
  type: UPDATE_TOURNAMENT_TEAM_BY_GROUP
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT_TEAM
  | typeof DELETE_TOURNAMENT_TEAM_SUCCESS
  | typeof DELETE_TOURNAMENT_TEAM_FAILURE
  | typeof PATCH_TOURNAMENT_TEAM
  | typeof PATCH_TOURNAMENT_TEAM_SUCCESS
  | typeof PATCH_TOURNAMENT_TEAM_FAILURE
  | typeof POST_TOURNAMENT_TEAM
  | typeof POST_TOURNAMENT_TEAM_SUCCESS
  | typeof POST_TOURNAMENT_TEAM_FAILURE
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS
  | typeof UPDATE_TOURNAMENT_TEAM_BY_GROUP;
export type Actions = HttpAction<ActionTypes>;
