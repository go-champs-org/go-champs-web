import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
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

const TOURNAMENTS_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentTeamsAPI = (tournamentId: string) =>
  `${TOURNAMENTS_API}/${tournamentId}/teams`;

export const deleteTournamentTeam = (tournamentId: string) => (
  tournamentTeam: TournamentTeamEntity
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_TEAM,
  payload: {
    url: `${tournamentTeamsAPI(tournamentId)}/${tournamentTeam.id}`,
    requestConfig: {
      method: 'DELETE'
    }
  }
});

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
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_TEAM,
  payload: {
    url: `${tournamentTeamsAPI(tournamentId)}/${tournamentTeam.id}`,
    requestConfig: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tournament_team: tournamentTeam })
    }
  }
});

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
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_TEAM,
  payload: {
    url: tournamentTeamsAPI(tournamentId),
    requestConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tournament_team: tournamentTeam })
    }
  }
});

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
