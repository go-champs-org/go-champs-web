import { HttpAction } from "../Shared/store/interfaces";

export const REQUEST_TOURNAMENTS = 'API_REQUEST_TOURNAMENTS';
export const REQUEST_TOURNAMENTS_SUCCESS = 'API_REQUEST_TOURNAMENTS_SUCCESS';
export const REQUEST_TOURNAMENTS_FAILURE = 'API_REQUEST_TOURNAMENTS_FAILURE';

export const requestTournaments = (): HttpAction<ActionTypes> => ({ type: REQUEST_TOURNAMENTS, payload: { url: 'http://yochamps-api.herokuapp.com/api/tournaments' } });

export const requestTournamentsSuccess = (payload: any): HttpAction<ActionTypes> => ({
    type: REQUEST_TOURNAMENTS_SUCCESS,
    payload,
});

export const requestTournamentsFailure = (payload: any): HttpAction<ActionTypes> => ({
    type: REQUEST_TOURNAMENTS_FAILURE,
    payload,
});

export type ActionTypes = typeof REQUEST_TOURNAMENTS | typeof REQUEST_TOURNAMENTS_FAILURE | typeof REQUEST_TOURNAMENTS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;