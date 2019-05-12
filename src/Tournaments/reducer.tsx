import { createReducer } from "../redux_helpers";
import { mapEntities } from "../Shared/store/helpers";
import { HttpAction } from "../Shared/store/interfaces";
import { ActionTypes, REQUEST_TOURNAMENTS, REQUEST_TOURNAMENTS_FAILURE, REQUEST_TOURNAMENTS_SUCCESS } from "./actions";
import { initialState, TournamentState } from "./state";

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
    [REQUEST_TOURNAMENTS]: requestTournaments,
    [REQUEST_TOURNAMENTS_FAILURE]: requestTournamentsFailure,
    [REQUEST_TOURNAMENTS_SUCCESS]: requestTournamentsSuccess,
});
