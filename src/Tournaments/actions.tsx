export const REQUEST_TOURNAMENTS = 'API_REQUEST_TOURNAMENTS';
export const REQUEST_TOURNAMENTS_SUCCESS = 'API_REQUEST_TOURNAMENTS_SUCCESS';
export const REQUEST_TOURNAMENTS_FAILURE = 'API_REQUEST_TOURNAMENTS_FAILURE';

export interface HttpAction {
    type: ActionTypes,
    payload?: any,
};

export const requestTournaments = (): HttpAction => ({ type: REQUEST_TOURNAMENTS, payload: { url: 'http://yochamps-api.herokuapp.com/api/tournaments' } });

export const requestTournamentsSuccess = (payload: any): HttpAction => ({
    type: REQUEST_TOURNAMENTS_SUCCESS,
    payload,
});

export const requestTournamentsFailure = (payload: any): HttpAction => ({
    type: REQUEST_TOURNAMENTS_FAILURE,
    payload,
});

export type ActionTypes = typeof REQUEST_TOURNAMENTS | typeof REQUEST_TOURNAMENTS_FAILURE | typeof REQUEST_TOURNAMENTS_SUCCESS;
export type Actions = HttpAction;