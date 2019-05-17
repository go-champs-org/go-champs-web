import { createReducer, entityById, mapEntities, mapEntitiesByKey } from "../Shared/store/helpers";
import { HttpAction } from "../Shared/store/interfaces";
import { ActionTypes, DELETE_TOURNAMENT, DELETE_TOURNAMENT_FAILURE, DELETE_TOURNAMENT_SUCCESS, POST_TOURNAMENT, POST_TOURNAMENT_FAILURE, POST_TOURNAMENT_SUCCESS, REQUEST_FILTER_TOURNAMENTS, REQUEST_FILTER_TOURNAMENTS_FAILURE, REQUEST_FILTER_TOURNAMENTS_SUCCESS, REQUEST_TOURNAMENT, REQUEST_TOURNAMENTS, REQUEST_TOURNAMENTS_FAILURE, REQUEST_TOURNAMENTS_SUCCESS, REQUEST_TOURNAMENT_FAILURE, REQUEST_TOURNAMENT_SUCCESS } from "./actions";
import { initialState, TournamentState } from "./state";

export const deleteTournament = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteTournament: true,
});

export const deleteTournamentFailure = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteTournament: false,
});

export const deleteTournamentSuccess = (state: TournamentState, action: HttpAction<ActionTypes>) => {
	const tournaments = Object.keys(state.tournaments)
		.filter(entityById(state.tournaments, action.payload))
		.reduce(mapEntitiesByKey(state.tournaments), {});
	return {
		...state,
		isLoadingDeleteTournament: false,
		tournaments,
	}
};

export const postTournament = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournament: true,
});

export const postTournamentFailure = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournament: false,
});

export const postTournamentSuccess = (state: TournamentState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournament: false,
	tournaments: [action.payload.data].reduce(mapEntities, state.tournaments),
});

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
	[DELETE_TOURNAMENT]: deleteTournament,
	[DELETE_TOURNAMENT_FAILURE]: deleteTournamentFailure,
	[DELETE_TOURNAMENT_SUCCESS]: deleteTournamentSuccess,
	[POST_TOURNAMENT]: postTournament,
	[POST_TOURNAMENT_FAILURE]: postTournamentFailure,
	[POST_TOURNAMENT_SUCCESS]: postTournamentSuccess,
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