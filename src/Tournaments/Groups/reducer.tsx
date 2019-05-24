import { createReducer, entityById, mapEntities, mapEntitiesByKey, returnProperty } from "../../Shared/store/helpers";
import { HttpAction } from "../../Shared/store/interfaces";
import { REQUEST_TOURNAMENT, REQUEST_TOURNAMENT_FAILURE, REQUEST_TOURNAMENT_SUCCESS } from "../actions";
import { ActionTypes, DELETE_TOURNAMENT_GROUP, DELETE_TOURNAMENT_GROUP_FAILURE, DELETE_TOURNAMENT_GROUP_SUCCESS, PATCH_TOURNAMENT_GROUP, PATCH_TOURNAMENT_GROUP_FAILURE, PATCH_TOURNAMENT_GROUP_SUCCESS, POST_TOURNAMENT_GROUP, POST_TOURNAMENT_GROUP_FAILURE, POST_TOURNAMENT_GROUP_SUCCESS } from "./actions";
import { initialState, TournamentGroupState } from "./state";

const mapTournamentGroup = (apiData: any) => ({
	id: apiData.id,
	name: apiData.name,
});

const tournamentGroupMapEntities = mapEntities(returnProperty('id'), mapTournamentGroup);

export const deleteTournamentGroup = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteTournamentGroup: true,
});

export const deleteTournamentGroupFailure = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteTournamentGroup: false,
});

export const deleteTournamentGroupSuccess = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => {
	const tournamentGroups = Object.keys(state.tournamentGroups)
		.filter(entityById(state.tournamentGroups, action.payload))
		.reduce(mapEntitiesByKey(state.tournamentGroups), {});
	return {
		...state,
		tournamentGroups,
		isLoadingDeleteTournamentGroup: false,
	}
};

export const patchTournamentGroup = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPatchTournamentGroup: true,
});

export const patchTournamentGroupFailure = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPatchTournamentGroup: false,
});

export const patchTournamentGroupSuccess = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPatchTournamentGroup: false,
	tournamentGroups: [action.payload.data].reduce(tournamentGroupMapEntities, state.tournamentGroups),
});

export const postTournamentGroup = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentGroup: true,
});

export const postTournamentGroupFailure = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentGroup: false,
});

export const postTournamentGroupSuccess = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentGroup: false,
	tournamentGroups: [action.payload.data].reduce(tournamentGroupMapEntities, state.tournamentGroups),
});

export const requestTournament = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournament: true,
});

export const requestTournamentFailure = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournament: false,
});

export const requestTournamentSuccess = (state: TournamentGroupState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestTournament: false,
	tournamentGroups: action.payload.data.groups.reduce(tournamentGroupMapEntities, {}),
});

export default createReducer(initialState, {
	[DELETE_TOURNAMENT_GROUP]: deleteTournamentGroup,
	[DELETE_TOURNAMENT_GROUP_FAILURE]: deleteTournamentGroupFailure,
	[DELETE_TOURNAMENT_GROUP_SUCCESS]: deleteTournamentGroupSuccess,
	[PATCH_TOURNAMENT_GROUP]: patchTournamentGroup,
	[PATCH_TOURNAMENT_GROUP_FAILURE]: patchTournamentGroupFailure,
	[PATCH_TOURNAMENT_GROUP_SUCCESS]: patchTournamentGroupSuccess,
	[POST_TOURNAMENT_GROUP]: postTournamentGroup,
	[POST_TOURNAMENT_GROUP_FAILURE]: postTournamentGroupFailure,
	[POST_TOURNAMENT_GROUP_SUCCESS]: postTournamentGroupSuccess,
	[REQUEST_TOURNAMENT]: requestTournament,
	[REQUEST_TOURNAMENT_FAILURE]: requestTournamentFailure,
	[REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess,
});