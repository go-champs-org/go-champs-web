import { createReducer, mapEntities, returnProperty } from "../../Shared/store/helpers";
import { HttpAction } from "../../Shared/store/interfaces";
import { REQUEST_TOURNAMENT_SUCCESS } from "../actions";
import { ActionTypes, POST_TOURNAMENT_TEAM, POST_TOURNAMENT_TEAM_FAILURE, POST_TOURNAMENT_TEAM_SUCCESS } from "./actions";
import { initialState, TournamentTeamState } from "./state";

const mapTournamentTeam = (apiData: any) => ({
	id: apiData.id,
	name: apiData.name,
});

const tournamentTeamMapEntities = mapEntities(returnProperty('id'), mapTournamentTeam);

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
	tournamentTeams: [action.payload.data].reduce(tournamentTeamMapEntities, {}),
});

export const requestTournamentSuccess = (state: TournamentTeamState, action: HttpAction<ActionTypes>) => ({
	...state,
	tournamentTeams: action.payload.data.teams.reduce(tournamentTeamMapEntities, {}),
});

export default createReducer(initialState, {
	[POST_TOURNAMENT_TEAM]: postTournamentTeam,
	[POST_TOURNAMENT_TEAM_FAILURE]: postTournamentTeamFailure,
	[POST_TOURNAMENT_TEAM_SUCCESS]: postTournamentTeamSuccess,
	[REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess,
});