import { HttpAction } from "../Shared/store/interfaces";

export const REQUEST_TOURNAMENTS = 'API_REQUEST_TOURNAMENTS';
export const REQUEST_TOURNAMENTS_SUCCESS = 'API_REQUEST_TOURNAMENTS_SUCCESS';
export const REQUEST_TOURNAMENTS_FAILURE = 'API_REQUEST_TOURNAMENTS_FAILURE';
export const REQUEST_TOURNAMENT = 'API_REQUEST_TOURNAMENT';
export const REQUEST_TOURNAMENT_SUCCESS = 'API_REQUEST_TOURNAMENT_SUCCESS';
export const REQUEST_TOURNAMENT_FAILURE = 'API_REQUEST_TOURNAMENT_FAILURE';

const TOURNAMENTS_API = 'http://yochamps-api.herokuapp.com/api/tournaments';

export const requestTournament = (tournamentId: string): HttpAction<ActionTypes> => ({ type: REQUEST_TOURNAMENT, payload: { url: `${TOURNAMENTS_API}/${tournamentId}` } });

export const requestTournamentSuccess = (payload: any): HttpAction<ActionTypes> => ({
    type: REQUEST_TOURNAMENT_SUCCESS,
    payload,
});

export const requestTournamentFailure = (payload: any): HttpAction<ActionTypes> => ({
    type: REQUEST_TOURNAMENT_FAILURE,
    payload,
});

export const requestTournaments = (): HttpAction<ActionTypes> => ({ type: REQUEST_TOURNAMENTS, payload: { url: `${TOURNAMENTS_API}` } });

export const requestTournamentsSuccess = (payload: any): HttpAction<ActionTypes> => ({
    type: REQUEST_TOURNAMENTS_SUCCESS,
    payload,
});

export const requestTournamentsFailure = (payload: any): HttpAction<ActionTypes> => ({
    type: REQUEST_TOURNAMENTS_FAILURE,
    payload,
});

export type ActionTypes =
    typeof REQUEST_TOURNAMENT |
    typeof REQUEST_TOURNAMENT_FAILURE |
    typeof REQUEST_TOURNAMENT_SUCCESS |
    typeof REQUEST_TOURNAMENTS |
    typeof REQUEST_TOURNAMENTS_FAILURE |
    typeof REQUEST_TOURNAMENTS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;