import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  PATCH_TOURNAMENT,
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import httpClient from './httpClient';
import { TournamentTeamEntity } from './state';

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

export const deleteTournamentTeam = (tournamentId: string) => (
  tournamentTeam: TournamentTeamEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_TEAM });

  try {
    const response = await httpClient.delete(tournamentId, tournamentTeam.id);

    dispatch(deleteTournamentTeamSuccess(response));
    displayToast(`${tournamentTeam.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentTeamFailure(err));
  }
};

export const deleteTournamentTeamSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const deleteTournamentTeamFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const patchTournamentTeam = (tournamentId: string) => (
  tournamentTeam: TournamentTeamEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT });

  try {
    const response = await httpClient.patch(tournamentId, tournamentTeam);

    dispatch(patchTournamentTeamSuccess(response));
    displayToast(`${tournamentTeam.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentTeamFailure(err));
  }
};

export const patchTournamentTeamSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const patchTournamentTeamFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const postTournamentTeam = (tournamentId: string) => (
  tournamentTeam: TournamentTeamEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_TEAM });

  try {
    const response = await httpClient.post(tournamentId, tournamentTeam);

    dispatch(postTournamentTeamSuccess(response));
    displayToast(`${tournamentTeam.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentTeamFailure(err));
  }
};

export const postTournamentTeamSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const postTournamentTeamFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_TEAM_FAILURE,
  payload
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
  | typeof REQUEST_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
