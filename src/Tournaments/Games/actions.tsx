import { HttpAction } from "../../Shared/store/interfaces";
import { TournamentGameEntity } from "./state";

export const DELETE_TOURNAMENT_GAME = 'API_DELETE_TOURNAMENT_GAME';
export const DELETE_TOURNAMENT_GAME_SUCCESS = 'API_DELETE_TOURNAMENT_GAME_SUCCESS';
export const DELETE_TOURNAMENT_GAME_FAILURE = 'API_DELETE_TOURNAMENT_GAME_FAILURE';
export const REQUEST_TOURNAMENT_GAME = 'API_REQUEST_TOURNAMENT_GAME';
export const REQUEST_TOURNAMENT_GAME_SUCCESS = 'API_REQUEST_TOURNAMENT_GAME_SUCCESS';
export const REQUEST_TOURNAMENT_GAME_FAILURE = 'API_REQUEST_TOURNAMENT_GAME_FAILURE';
export const REQUEST_TOURNAMENT_GAMES = 'API_REQUEST_TOURNAMENT_GAMES';
export const REQUEST_TOURNAMENT_GAMES_SUCCESS = 'API_REQUEST_TOURNAMENT_GAMES_SUCCESS';
export const REQUEST_TOURNAMENT_GAMES_FAILURE = 'API_REQUEST_TOURNAMENT_GAMES_FAILURE';
export const POST_TOURNAMENT_GAME = 'API_POST_TOURNAMENT_GAME';
export const POST_TOURNAMENT_GAME_SUCCESS = 'API_POST_TOURNAMENT_GAME_SUCCESS';
export const POST_TOURNAMENT_GAME_FAILURE = 'API_POST_TOURNAMENT_GAME_FAILURE';

const TOURNAMENTS_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentGamesAPI = (tournamentId: string) => (
	`${TOURNAMENTS_API}/${tournamentId}/games`
);

export const deleteTournamentGame = (tournamentId: string) => (tournamentGame: TournamentGameEntity): HttpAction<ActionTypes> => ({
	type: DELETE_TOURNAMENT_GAME, payload: {
		url: `${tournamentGamesAPI(tournamentId)}/${tournamentGame.id}`, requestConfig: {
			method: 'DELETE',
		}
	}
});

export const deleteTournamentGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: DELETE_TOURNAMENT_GAME_SUCCESS,
	payload,
});

export const deleteTournamentGameFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: DELETE_TOURNAMENT_GAME_FAILURE,
	payload,
});

export const postTournamentGame = (tournamentId: string) => (tournamentGame: TournamentGameEntity): HttpAction<ActionTypes> => ({
	type: POST_TOURNAMENT_GAME, payload: {
		url: `${tournamentGamesAPI(tournamentId)}`, requestConfig: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				tournament_game: {
					game: {
						away_score: tournamentGame.game.awayScore,
						away_team_name: tournamentGame.game.awayTeamName,
						datetime: tournamentGame.game.datetime,
						home_score: tournamentGame.game.homeScore,
						home_team_name: tournamentGame.game.homeTeamName,
						location: tournamentGame.game.location,
					},
				}
			})
		}
	}
});

export const postTournamentGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_TOURNAMENT_GAME_SUCCESS,
	payload,
});

export const postTournamentGameFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_TOURNAMENT_GAME_FAILURE,
	payload,
});

export const requestTournamentGame = (tournamentId: string) => (id: string): HttpAction<ActionTypes> => ({ type: REQUEST_TOURNAMENT_GAMES, payload: { url: `${tournamentGamesAPI(tournamentId)}/${id}` } });

export const requestTournamentGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: REQUEST_TOURNAMENT_GAMES_SUCCESS,
	payload,
});

export const requestTournamentGameFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: REQUEST_TOURNAMENT_GAMES_FAILURE,
	payload,
});

export const requestTournamentGames = (tournamentId: string) => (): HttpAction<ActionTypes> => ({ type: REQUEST_TOURNAMENT_GAMES, payload: { url: `${tournamentGamesAPI(tournamentId)}` } });

export const requestTournamentGamesSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: REQUEST_TOURNAMENT_GAMES_SUCCESS,
	payload,
});

export const requestTournamentGamesFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: REQUEST_TOURNAMENT_GAMES_FAILURE,
	payload,
});

export type ActionTypes =
	typeof DELETE_TOURNAMENT_GAME |
	typeof DELETE_TOURNAMENT_GAME_FAILURE |
	typeof DELETE_TOURNAMENT_GAME_SUCCESS |
	typeof POST_TOURNAMENT_GAME |
	typeof POST_TOURNAMENT_GAME_FAILURE |
	typeof POST_TOURNAMENT_GAME_SUCCESS |
	typeof REQUEST_TOURNAMENT_GAME |
	typeof REQUEST_TOURNAMENT_GAME_FAILURE |
	typeof REQUEST_TOURNAMENT_GAME_SUCCESS |
	typeof REQUEST_TOURNAMENT_GAMES |
	typeof REQUEST_TOURNAMENT_GAMES_FAILURE |
	typeof REQUEST_TOURNAMENT_GAMES_SUCCESS;
export type Actions = HttpAction<ActionTypes>; 	