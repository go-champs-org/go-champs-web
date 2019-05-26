import { HttpAction } from "../Shared/store/interfaces";
import { REQUEST_TOURNAMENT_GAMES, REQUEST_TOURNAMENT_GAMES_FAILURE, REQUEST_TOURNAMENT_GAMES_SUCCESS } from "../Tournaments/Games/actions";
import { GameEntity } from "./state";

export const DELETE_GAME = 'API_DELETE_GAME';
export const DELETE_GAME_SUCCESS = 'API_DELETE_GAME_SUCCESS';
export const DELETE_GAME_FAILURE = 'API_DELETE_GAME_FAILURE';
export const POST_GAME = 'API_POST_GAME';
export const POST_GAME_SUCCESS = 'API_POST_GAME_SUCCESS';
export const POST_GAME_FAILURE = 'API_POST_GAME_FAILURE';

const GAME_API = 'https://yochamps-api.herokuapp.com/api/games';

export const deleteGame = (game: GameEntity): HttpAction<ActionTypes> => ({
	type: DELETE_GAME, payload: {
		url: `${GAME_API}/${game.id}`, requestConfig: {
			method: 'DELETE',
		}
	}
});

export const deleteGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: DELETE_GAME_SUCCESS,
	payload,
});

export const deleteGameFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: DELETE_GAME_FAILURE,
	payload,
});

export const postGame = (game: GameEntity): HttpAction<ActionTypes> => ({
	type: POST_GAME, payload: {
		url: GAME_API, requestConfig: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				game: {
					away_score: game.awayScore,
					away_team_name: game.awayTeamName,
					datetime: game.datetime,
					home_score: game.homeScore,
					home_team_name: game.homeTeamName,
					location: game.location,
				}
			})
		}
	}
});

export const postGameSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_GAME_SUCCESS,
	payload,
});

export const postGameFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_GAME_FAILURE,
	payload,
});

export type ActionTypes =
	typeof DELETE_GAME |
	typeof DELETE_GAME_FAILURE |
	typeof DELETE_GAME_SUCCESS |
	typeof POST_GAME |
	typeof POST_GAME_FAILURE |
	typeof POST_GAME_SUCCESS |
	typeof REQUEST_TOURNAMENT_GAMES |
	typeof REQUEST_TOURNAMENT_GAMES_FAILURE |
	typeof REQUEST_TOURNAMENT_GAMES_SUCCESS;
export type Actions = HttpAction<ActionTypes>; 	