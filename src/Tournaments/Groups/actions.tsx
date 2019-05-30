import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
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

const TOURNAMENTS_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentGroupsAPI = (tournamentId: string) =>
  `${TOURNAMENTS_API}/${tournamentId}/groups`;

export const deleteTournamentGroup = (tournamentId: string) => (
  tournamentGroup: TournamentGroupEntity
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_GROUP,
  payload: {
    url: `${tournamentGroupsAPI(tournamentId)}/${tournamentGroup.id}`,
    requestConfig: {
      method: 'DELETE'
    }
  }
});

export const deleteTournamentGroupSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
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
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_GROUP,
  payload: {
    url: `${tournamentGroupsAPI(tournamentId)}/${tournamentGroup.id}`,
    requestConfig: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tournament_group: tournamentGroup })
    }
  }
});

export const patchTournamentGroupSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
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
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_GROUP,
  payload: {
    url: tournamentGroupsAPI(tournamentId),
    requestConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tournament_group: tournamentGroup })
    }
  }
});

export const postTournamentGroupSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
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
