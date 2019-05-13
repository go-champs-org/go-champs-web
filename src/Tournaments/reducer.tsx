import { createReducer, mapEntities } from "../Shared/store/helpers";
import { HttpAction } from "../Shared/store/interfaces";
import { ActionTypes, REQUEST_FILTER_TOURNAMENTS, REQUEST_FILTER_TOURNAMENTS_FAILURE, REQUEST_FILTER_TOURNAMENTS_SUCCESS, REQUEST_TOURNAMENT, REQUEST_TOURNAMENTS, REQUEST_TOURNAMENTS_FAILURE, REQUEST_TOURNAMENTS_SUCCESS, REQUEST_TOURNAMENT_FAILURE, REQUEST_TOURNAMENT_SUCCESS } from "./actions";
import { initialState, TournamentState } from "./state";


export const requestFilterTournaments = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournaments: true,
});

export const requestFilterTournamentsFailure = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournaments: false,
});

export const requestFilterTournamentsSuccess = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournaments: false,
    tournaments: action.payload.data.reduce(mapEntities, {}),
});

export const requestTournament = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournament: true,
});

export const requestTournamentFailure = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournament: false,
});

export const requestTournamentSuccess = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournament: false,
    tournaments: [action.payload.data].reduce(mapEntities, state.tournaments),
});

export const requestTournaments = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournaments: true,
});

export const requestTournamentsFailure = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournaments: false,
});

export const requestTournamentsSuccess = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
    ...state,
    isLoadingRequestTournaments: false,
    tournaments: action.payload.data.reduce(mapEntities, {}),
});

export default createReducer(initialState, {
    [REQUEST_FILTER_TOURNAMENTS]: requestFilterTournaments,
    [REQUEST_FILTER_TOURNAMENTS_FAILURE]: requestFilterTournamentsFailure,
    [REQUEST_FILTER_TOURNAMENTS_SUCCESS]: requestFilterTournamentsSuccess,
    [REQUEST_TOURNAMENT]: requestTournament,
    [REQUEST_TOURNAMENT_FAILURE]: requestTournamentFailure,
    [REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess,
    [REQUEST_TOURNAMENTS]: requestTournaments,
    [REQUEST_TOURNAMENTS_FAILURE]: requestTournamentsFailure,
    [REQUEST_TOURNAMENTS_SUCCESS]: requestTournamentsSuccess,
});
