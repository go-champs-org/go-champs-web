import { createReducer, mapEntities, returnProperty } from "../../Shared/store/helpers";
import { HttpAction } from "../../Shared/store/interfaces";
import { ActionTypes, POST_TOURNAMENT_TEAM, POST_TOURNAMENT_TEAM_FAILURE, POST_TOURNAMENT_TEAM_SUCCESS } from "./actions";
import { initialState, TournamentTeamState } from "./state";

const tournamentTeamMapEntities = mapEntities(returnProperty('id'));

export const postTournamentTeam = (state: TournamentTeamState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentTeam: true,
});

export const postTournamentTeamFailure = (state: TournamentTeamState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentTeam: false,
});

export const postTournamentTeamSuccess = (state: TournamentTeamState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostTournamentTeam: false,
	tournamentTeams: [action.payload.data].reduce(tournamentTeamMapEntities, state.tournamentTeams),
});

export default createReducer(initialState, {
	[POST_TOURNAMENT_TEAM]: postTournamentTeam,
	[POST_TOURNAMENT_TEAM_FAILURE]: postTournamentTeamFailure,
	[POST_TOURNAMENT_TEAM_SUCCESS]: postTournamentTeamSuccess,
});