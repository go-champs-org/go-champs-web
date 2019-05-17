import { mapEntities, returnProperty } from "../../Shared/store/helpers";
import { HttpAction } from "../../Shared/store/interfaces";
import { ActionTypes } from "./actions";
import { TournamentTeamState } from "./state";

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