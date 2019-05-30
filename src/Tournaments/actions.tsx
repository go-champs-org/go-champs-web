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
export const REQUEST_FILTER_TOURNAMENTS = 'API_REQUEST_FILTER_TOURNAMENTS';
export const REQUEST_FILTER_TOURNAMENTS_SUCCESS =
  'API_REQUEST_FILTER_TOURNAMENTS_SUCCESS';
export const REQUEST_FILTER_TOURNAMENTS_FAILURE =
  'API_REQUEST_FILTER_TOURNAMENTS_FAILURE';
export const REQUEST_TOURNAMENTS = 'API_REQUEST_TOURNAMENTS';
export const REQUEST_TOURNAMENTS_SUCCESS = 'API_REQUEST_TOURNAMENTS_SUCCESS';
export const REQUEST_TOURNAMENTS_FAILURE = 'API_REQUEST_TOURNAMENTS_FAILURE';
export const REQUEST_TOURNAMENT = 'API_REQUEST_TOURNAMENT';
export const REQUEST_TOURNAMENT_SUCCESS = 'API_REQUEST_TOURNAMENT_SUCCESS';
export const REQUEST_TOURNAMENT_FAILURE = 'API_REQUEST_TOURNAMENT_FAILURE';

const TOURNAMENTS_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

interface RequestFilter {
  [key: string]: string;
}

const mapRequestFilterToQueryString = (filter: RequestFilter) => {
  return Object.keys(filter)
    .map((key: string) => `where[${key}]=${filter[key]}`)
    .join('&');
};

export const deleteTournament = (
  tournament: TournamentEntity
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT,
  payload: {
    url: `${TOURNAMENTS_API}/${tournament.id}`,
    requestConfig: {
      method: 'DELETE'
    }
  }
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

export const patchTournament = (
  tournament: TournamentEntity
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT,
  payload: {
    url: `${TOURNAMENTS_API}/${tournament.id}`,
    requestConfig: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tournament })
    }
  }
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

export const postTournament = (
  tournament: TournamentEntity
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT,
  payload: {
    url: TOURNAMENTS_API,
    requestConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tournament })
    }
  }
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

export const requestFilterTournaments = (
  filter: RequestFilter
): HttpAction<ActionTypes> => ({
  type: REQUEST_FILTER_TOURNAMENTS,
  payload: {
    url: `${TOURNAMENTS_API}?${mapRequestFilterToQueryString(filter)}`
  }
});

export const requestFilterTournamentsSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_FILTER_TOURNAMENTS_SUCCESS,
  payload
});

export const requestFilterTournamentsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_FILTER_TOURNAMENTS_FAILURE,
  payload
});

export const requestTournament = (
  tournamentId: string
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT,
  payload: { url: `${TOURNAMENTS_API}/${tournamentId}` }
});

export const requestTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_SUCCESS,
  payload
});

export const requestTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_FAILURE,
  payload
});

export const requestTournaments = (): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENTS,
  payload: { url: `${TOURNAMENTS_API}` }
});

export const requestTournamentsSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENTS_SUCCESS,
  payload
});

export const requestTournamentsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENTS_FAILURE,
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
  | typeof REQUEST_FILTER_TOURNAMENTS
  | typeof REQUEST_FILTER_TOURNAMENTS_FAILURE
  | typeof REQUEST_FILTER_TOURNAMENTS_SUCCESS
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS
  | typeof REQUEST_TOURNAMENTS
  | typeof REQUEST_TOURNAMENTS_FAILURE
  | typeof REQUEST_TOURNAMENTS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
