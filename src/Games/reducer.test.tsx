import { HttpAction } from '../Shared/store/interfaces';
import { ActionTypes, DELETE_GAME, DELETE_GAME_FAILURE, DELETE_GAME_SUCCESS, POST_GAME, POST_GAME_FAILURE, POST_GAME_SUCCESS } from './actions';
import { deleteGame, deleteGameFailure, deleteGameSuccess, postGame, postGameFailure, postGameSuccess } from './reducer';
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