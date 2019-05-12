import { createReducer } from "../redux_helpers";
import { HttpAction, REQUEST_TOURNAMENTS, REQUEST_TOURNAMENTS_FAILURE, REQUEST_TOURNAMENTS_SUCCESS } from "./actions";
import { initialState, TournamentEntity, TournamentState } from "./state";

const mapEntities = (entitiesMap: { [key: string]: TournamentEntity }, apiData: any) => {
    return {
        ...entitiesMap,
        [apiData.id]: {
            id: apiData.id,
            name: apiData.name,
            slug: apiData.slug,
        },
    };
};

export const requestTournaments = (state: TournamentState, action: HttpAction) => ({
    ...state,
    isLoadingRequestTournaments: true,
});

export const requestTournamentsFailure = (state: TournamentState, action: HttpAction) => ({
    ...state,
    isLoadingRequestTournaments: false,
});

export const requestTournamentsSuccess = (state: TournamentState, action: HttpAction) => ({
    ...state,
    isLoadingRequestTournaments: false,
    tournaments: action.payload.data.reduce(mapEntities, {}),
});

export default createReducer(initialState, {
    [REQUEST_TOURNAMENTS]: requestTournaments,
    [REQUEST_TOURNAMENTS_FAILURE]: requestTournamentsFailure,
    [REQUEST_TOURNAMENTS_SUCCESS]: requestTournamentsSuccess,
});
