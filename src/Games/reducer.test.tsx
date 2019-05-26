import { HttpAction } from '../Shared/store/interfaces';
import { REQUEST_TOURNAMENT_GAME, REQUEST_TOURNAMENT_GAMES, REQUEST_TOURNAMENT_GAMES_FAILURE, REQUEST_TOURNAMENT_GAMES_SUCCESS, REQUEST_TOURNAMENT_GAME_FAILURE, REQUEST_TOURNAMENT_GAME_SUCCESS } from '../Tournaments/Games/actions';
import { ActionTypes, DELETE_GAME, DELETE_GAME_FAILURE, DELETE_GAME_SUCCESS, PATCH_GAME, PATCH_GAME_FAILURE, PATCH_GAME_SUCCESS, POST_GAME, POST_GAME_FAILURE, POST_GAME_SUCCESS } from './actions';
import { deleteGame, deleteGameFailure, deleteGameSuccess, patchGame, patchGameFailure, patchGameSuccess, postGame, postGameFailure, postGameSuccess, requestTournamentGame, requestTournamentGameFailure, requestTournamentGames, requestTournamentGamesFailure, requestTournamentGamesSuccess, requestTournamentGameSuccess } from './reducer';
import { GameState, initialState } from './state';

describe('deleteGame', () => {
	const action: HttpAction<ActionTypes> = {
		type: DELETE_GAME,
		payload: {
			id: 'first-id',
		}
	};

	it('sets isLoadingDeleteGame to true', () => {
		expect(deleteGame(initialState, action).isLoadingDeleteGame).toBe(true);
	});
});

describe('deleteGameFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: DELETE_GAME_FAILURE,
		payload: {
			id: 'first-id',
		}
	};

	it('sets isLoadingDeleteGame to false', () => {
		expect(deleteGameFailure(initialState, action).isLoadingDeleteGame).toBe(false);
	});
});

describe('deleteGameSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: DELETE_GAME_SUCCESS,
		payload: 'first-id',
	};

	const deleteState = {
		...initialState,
		games: {
			['first-id']: {
				id: 'first-id',
			}
		}
	}

	it('sets isLoadingDeleteGame to false', () => {
		expect(deleteGameSuccess(deleteState, action).isLoadingDeleteGame).toBe(false);
	});

	it('remove entity', () => {
		const newState = deleteGameSuccess(deleteState, action);

		expect(newState.games['first-id']).toBeUndefined()
	});

	it('keeps others entities in other', () => {
		const someState: GameState = {
			...initialState,
			games: {
				['some-id']: {
					id: 'some-id',
					name: 'some-name',
					slug: 'some-id',
				},
				...deleteState.games,
			}
		}

		const newState = deleteGameSuccess(someState, action);

		expect(newState.games['some-id']).toEqual({
			id: 'some-id',
			name: 'some-name',
			slug: 'some-id',
		});
	});
});

describe('patchGame', () => {
	const action: HttpAction<ActionTypes> = {
		type: PATCH_GAME,
	};

	it('sets isLoadingPatchGame to true', () => {
		expect(patchGame(initialState, action).isLoadingPatchGame).toBe(true);
	});
});

describe('patchGameFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: PATCH_GAME_FAILURE,
	};

	it('sets isLoadingPatchGame to false', () => {
		expect(patchGameFailure(initialState, action).isLoadingPatchGame).toBe(false);
	});
});

describe('patchGameSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: PATCH_GAME_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				away_score: 30,
				away_team_name: 'updated away team name',
				datetime: '2019-06-22T03:21:21.248Z',
				home_score: 40,
				home_team_name: 'updated home team name',
				location: 'updated location',
			}
		}
	};

	const updateState: GameState = {
		...initialState,
		games: {
			['first-id']: {
				awayScore: 10,
				awayTeamName: 'first away team name',
				datetime: '2019-05-22T03:21:21.248Z',
				homeScore: 20,
				homeTeamName: 'first home team name',
				location: 'first location',
			},
		}
	};

	it('sets isLoadingPatchGame to false', () => {
		expect(patchGameSuccess(updateState, action).isLoadingPatchGame).toBe(false);
	});

	it('set entity', () => {
		const newState = (patchGameSuccess(updateState, action));

		expect(newState.games['first-id']).toEqual({
			id: 'first-id',
			awayScore: 30,
			awayTeamName: 'updated away team name',
			datetime: '2019-06-22T03:21:21.248Z',
			homeScore: 40,
			homeTeamName: 'updated home team name',
			location: 'updated location',
		});
	});

	it('keeps others entities in other', () => {
		const someState: GameState = {
			...updateState,
			games: {
				['some-id']: {
					awayScore: 1,
					awayTeamName: 'some away team name',
					datetime: '2019-05-22T03:21:21.248Z',
					homeScore: 5,
					homeTeamName: 'some home team name',
					location: 'some location',
				},
			}
		}

		const newState = (patchGameSuccess(someState, action));

		expect(newState.games['some-id']).toEqual({
			awayScore: 1,
			awayTeamName: 'some away team name',
			datetime: '2019-05-22T03:21:21.248Z',
			homeScore: 5,
			homeTeamName: 'some home team name',
			location: 'some location',
		});
	});
});

describe('postGame', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_GAME,
	};

	it('sets isLoadingPostGame to true', () => {
		expect(postGame(initialState, action).isLoadingPostGame).toBe(true);
	});
});

describe('postGameFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_GAME_FAILURE,
	};

	it('sets isLoadingPostGame to false', () => {
		expect(postGameFailure(initialState, action).isLoadingPostGame).toBe(false);
	});
});

describe('postGameSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_GAME_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				away_score: 10,
				away_team_name: 'away team name',
				datetime: '2019-05-22T03:21:21.248Z',
				home_score: 20,
				home_team_name: 'home team name',
				location: 'location',
			}
		}
	};

	it('sets isLoadingPostGame to false', () => {
		expect(postGameSuccess(initialState, action).isLoadingPostGame).toBe(false);
	});

	it('set entity', () => {
		const newState = (postGameSuccess(initialState, action));

		expect(newState.games['first-id']).toEqual({
			id: 'first-id',
			awayScore: 10,
			awayTeamName: 'away team name',
			datetime: '2019-05-22T03:21:21.248Z',
			homeScore: 20,
			homeTeamName: 'home team name',
			location: 'location',
		});
	});

	it('keeps others entities in other', () => {
		const someState: GameState = {
			...initialState,
			games: {
				['some-id']: {
					id: 'some-id',
					awayScore: 30,
					awayTeamName: 'some away team name',
					datetime: '2019-05-22T03:21:21.248Z',
					homeScore: 40,
					homeTeamName: 'some home team name',
					location: 'some location',
				},
			}
		}

		const newState = (postGameSuccess(someState, action));

		expect(newState.games['some-id']).toEqual({
			id: 'some-id',
			awayScore: 30,
			awayTeamName: 'some away team name',
			datetime: '2019-05-22T03:21:21.248Z',
			homeScore: 40,
			homeTeamName: 'some home team name',
			location: 'some location',
		});
	});
});

describe('requestTournamentGame', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_GAME,
	};

	it('sets isLoadingRequestTournamentGame to true', () => {
		expect(requestTournamentGame(initialState, action).isLoadingRequestTournamentGame).toBe(true);
	});
});

describe('requestTournamentGameFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_GAME_FAILURE,
	};

	it('sets isLoadingRequestTournamentGame to false', () => {
		expect(requestTournamentGameFailure(initialState, action).isLoadingRequestTournamentGame).toBe(false);
	});
});

describe('requestTournamentGameSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_GAME_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				game: {
					id: 'first-game-id',
					away_score: 10,
					away_team_name: 'first away team name',
					datetime: '2019-05-22T03:21:21.248Z',
					home_score: 20,
					home_team_name: 'first home team name',
					location: 'first location',
				},
			},
		},
	};

	it('sets isLoadingRequestTournamentGame to false', () => {
		expect(requestTournamentGameSuccess(initialState, action).isLoadingRequestTournamentGame).toBe(false);
	});

	it('sets entities', () => {
		const newState = (requestTournamentGameSuccess(initialState, action));

		expect(newState.games['first-game-id']).toEqual({
			id: 'first-game-id',
			awayScore: 10,
			awayTeamName: 'first away team name',
			datetime: '2019-05-22T03:21:21.248Z',
			homeScore: 20,
			homeTeamName: 'first home team name',
			location: 'first location',
		});
	});
});

describe('requestTournamentGames', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_GAMES,
	};

	it('sets isLoadingRequestTournamentGames to true', () => {
		expect(requestTournamentGames(initialState, action).isLoadingRequestTournamentGames).toBe(true);
	});
});

describe('requestTournamentGamesFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_GAMES_FAILURE,
	};

	it('sets isLoadingRequestTournamentGames to false', () => {
		expect(requestTournamentGamesFailure(initialState, action).isLoadingRequestTournamentGames).toBe(false);
	});
});

describe('requestTournamentGamesSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_GAMES_SUCCESS,
		payload: {
			data:
				[
					{
						id: 'first-id',
						game: {
							id: 'first-game-id',
							away_score: 10,
							away_team_name: 'first away team name',
							datetime: '2019-05-22T03:21:21.248Z',
							home_score: 20,
							home_team_name: 'first home team name',
							location: 'first location',
						},
					},
					{
						id: 'second-id',
						game: {
							id: 'second-game-id',
							away_score: 30,
							away_team_name: 'second away team name',
							datetime: '2019-05-22T03:21:21.248Z',
							home_score: 40,
							home_team_name: 'second home team name',
							location: 'second location',
						},
					},
				],
		}
	};

	it('sets isLoadingRequestTournamentGames to false', () => {
		expect(requestTournamentGamesSuccess(initialState, action).isLoadingRequestTournamentGames).toBe(false);
	});

	it('sets entities', () => {
		const newState = (requestTournamentGamesSuccess(initialState, action));

		expect(newState.games['first-game-id']).toEqual({
			id: 'first-game-id',
			awayScore: 10,
			awayTeamName: 'first away team name',
			datetime: '2019-05-22T03:21:21.248Z',
			homeScore: 20,
			homeTeamName: 'first home team name',
			location: 'first location',
		});
		expect(newState.games['second-game-id']).toEqual({
			id: 'second-game-id',
			awayScore: 30,
			awayTeamName: 'second away team name',
			datetime: '2019-05-22T03:21:21.248Z',
			homeScore: 40,
			homeTeamName: 'second home team name',
			location: 'second location',
		});
	});
});