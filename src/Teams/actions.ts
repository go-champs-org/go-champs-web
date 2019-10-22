import { ApiTeam } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';

export const DELETE_TEAM = 'API_DELETE_TEAM';
export const DELETE_TEAM_SUCCESS = 'API_DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAILURE = 'API_DELETE_TEAM_FAILURE';
export const PATCH_TEAM = 'API_PATCH_TEAM';
export const PATCH_TEAM_SUCCESS = 'API_PATCH_TEAM_SUCCESS';
export const PATCH_TEAM_FAILURE = 'API_PATCH_TEAM_FAILURE';
export const POST_TEAM = 'API_POST_TEAM';
export const POST_TEAM_SUCCESS = 'API_POST_TEAM_SUCCESS';
export const POST_TEAM_FAILURE = 'API_POST_TEAM_FAILURE';

export const deleteTeamStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_TEAM
});

export const deleteTeamSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_TEAM_SUCCESS,
  payload
});

export const deleteTeamFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TEAM_FAILURE,
  payload
});

export const patchTeamStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_TEAM
});

export const patchTeamSuccess = (
  payload: ApiTeam
): HttpAction<ActionTypes, ApiTeam> => ({
  type: PATCH_TEAM_SUCCESS,
  payload
});

export const patchTeamFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_TEAM_FAILURE,
  payload
});

export const postTeamStart = (): HttpAction<ActionTypes> => ({
  type: POST_TEAM
});

export const postTeamSuccess = (
  payload: ApiTeam
): HttpAction<ActionTypes, ApiTeam> => ({
  type: POST_TEAM_SUCCESS,
  payload
});

export const postTeamFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TEAM_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TEAM
  | typeof DELETE_TEAM_SUCCESS
  | typeof DELETE_TEAM_FAILURE
  | typeof PATCH_TEAM
  | typeof PATCH_TEAM_SUCCESS
  | typeof PATCH_TEAM_FAILURE
  | typeof POST_TEAM
  | typeof POST_TEAM_SUCCESS
  | typeof POST_TEAM_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
