import { HttpAction } from "../../Shared/store/interfaces";
import { TournamentTeamEntity } from "./state";

export const POST_TOURNAMENT_TEAM = 'API_POST_TOURNAMENT_TEAM';
export const POST_TOURNAMENT_TEAM_SUCCESS = 'API_POST_TOURNAMENT_TEAM_SUCCESS';
export const POST_TOURNAMENT_TEAM_FAILURE = 'API_POST_TOURNAMENT_TEAM_FAILURE';

const TOURNAMENTS_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentTeamsAPI = (tournamentId: string) => (
	`${TOURNAMENTS_API}/${tournamentId}/teams`
)

export const postTournamentTeam = (tournamentId: string) => (tournamentTeam: TournamentTeamEntity): HttpAction<ActionTypes> => ({
	type: POST_TOURNAMENT_TEAM, payload: {
		url: tournamentTeamsAPI(tournamentId), requestConfig: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ tournament_team: tournamentTeam })
		}
	}
});

export const postTournamentTeamSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_TOURNAMENT_TEAM_SUCCESS,
	payload,
});

export const postTournamentTeamFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_TOURNAMENT_TEAM_FAILURE,
	payload,
});

export type ActionTypes =
	typeof POST_TOURNAMENT_TEAM |
	typeof POST_TOURNAMENT_TEAM_SUCCESS |
	typeof POST_TOURNAMENT_TEAM_FAILURE;
export type Actions = HttpAction<ActionTypes>;