import { HttpAction } from "../../Shared/store/interfaces";
import { REQUEST_TOURNAMENT, REQUEST_TOURNAMENT_FAILURE, REQUEST_TOURNAMENT_SUCCESS } from "../actions";
import { ActionTypes, DELETE_TOURNAMENT_GROUP, DELETE_TOURNAMENT_GROUP_FAILURE, DELETE_TOURNAMENT_GROUP_SUCCESS, PATCH_TOURNAMENT_GROUP, PATCH_TOURNAMENT_GROUP_FAILURE, PATCH_TOURNAMENT_GROUP_SUCCESS, POST_TOURNAMENT_GROUP, POST_TOURNAMENT_GROUP_FAILURE, POST_TOURNAMENT_GROUP_SUCCESS } from "./actions";
import { deleteTournamentGroup, deleteTournamentGroupFailure, deleteTournamentGroupSuccess, patchTournamentGroup, patchTournamentGroupFailure, patchTournamentGroupSuccess, postTournamentGroup, postTournamentGroupFailure, postTournamentGroupSuccess, requestTournament, requestTournamentFailure, requestTournamentSuccess } from "./reducer";
import { initialState, TournamentGroupState } from "./state";

describe('deleteTournamentGroup', () => {
	const action: HttpAction<ActionTypes> = {
		type: DELETE_TOURNAMENT_GROUP,
		payload: {
			id: 'first-id',
		}
	};

	it('sets isLoadingDeleteTournamentGroup to true', () => {
		expect(deleteTournamentGroup(initialState, action).isLoadingDeleteTournamentGroup).toBe(true);
	});
});

describe('deleteTournamentGroupFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: DELETE_TOURNAMENT_GROUP_FAILURE,
		payload: {
			id: 'first-id',
		}
	};

	it('sets isLoadingDeleteTournamentGroup to false', () => {
		expect(deleteTournamentGroupFailure(initialState, action).isLoadingDeleteTournamentGroup).toBe(false);
	});
});

describe('deleteTournamentGroupSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: DELETE_TOURNAMENT_GROUP_SUCCESS,
		payload: 'first-id',
	};

	const deleteState = {
		...initialState,
		tournamentGroups: {
			['first-id']: {
				id: 'first-id',
				name: 'first-name',
			}
		}
	}

	it('sets isLoadingDeleteTournamentGroup to false', () => {
		expect(deleteTournamentGroupSuccess(deleteState, action).isLoadingDeleteTournamentGroup).toBe(false);
	});

	it('remove entity', () => {
		const newState = deleteTournamentGroupSuccess(deleteState, action);

		expect(newState.tournamentGroups['first-id']).toBeUndefined()
	});

	it('keeps others entities in other', () => {
		const someState: TournamentGroupState = {
			...initialState,
			tournamentGroups: {
				['some-id']: {
					id: 'some-id',
					name: 'some-name',
				},
				...deleteState.tournamentGroups,
			}
		}

		const newState = deleteTournamentGroupSuccess(someState, action);

		expect(newState.tournamentGroups['some-id']).toEqual({
			id: 'some-id',
			name: 'some-name',
		});
	});
});

describe('patchTournamentGroup', () => {
	const action: HttpAction<ActionTypes> = {
		type: PATCH_TOURNAMENT_GROUP,
	};

	it('sets isLoadingPatchTournamentGroup to true', () => {
		expect(patchTournamentGroup(initialState, action).isLoadingPatchTournamentGroup).toBe(true);
	});
});

describe('patchTournamentGroupFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: PATCH_TOURNAMENT_GROUP_FAILURE,
	};

	it('sets isLoadingPatchTournamentGroup to false', () => {
		expect(patchTournamentGroupFailure(initialState, action).isLoadingPatchTournamentGroup).toBe(false);
	});
});

describe('patchTournamentGroupSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: PATCH_TOURNAMENT_GROUP_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				name: 'some-first-name',
			}
		}
	};

	const updateState: TournamentGroupState = {
		...initialState,
		tournamentGroups: {
			['first-id']: {
				id: 'first-id',
				name: 'first-name',
			},
		}
	};

	it('sets isLoadingPatchTournamentGroup to false', () => {
		expect(patchTournamentGroupSuccess(updateState, action).isLoadingPatchTournamentGroup).toBe(false);
	});

	it('set entity', () => {
		const newState = (patchTournamentGroupSuccess(updateState, action));

		expect(newState.tournamentGroups['first-id']).toEqual({
			id: 'first-id',
			name: 'some-first-name',
		});
	});

	it('keeps others entities in other', () => {
		const someState: TournamentGroupState = {
			...updateState,
			tournamentGroups: {
				['some-id']: {
					id: 'some-id',
					name: 'some-name',
				},
			}
		}

		const newState = (patchTournamentGroupSuccess(someState, action));

		expect(newState.tournamentGroups['some-id']).toEqual({
			id: 'some-id',
			name: 'some-name',
		});
	});
});

describe('postTournamentGroup', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_TOURNAMENT_GROUP,
	};

	it('sets isLoadingPostTournamentGroup to true', () => {
		expect(postTournamentGroup(initialState, action).isLoadingPostTournamentGroup).toBe(true);
	});
});

describe('postTournamentGroupFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_TOURNAMENT_GROUP_FAILURE,
	};

	it('sets isLoadingPostTournamentGroup to false', () => {
		expect(postTournamentGroupFailure(initialState, action).isLoadingPostTournamentGroup).toBe(false);
	});
});

describe('postTournamentGroupSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_TOURNAMENT_GROUP_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				name: 'first-name',
			}
		}
	};

	it('sets isLoadingPostTournamentGroup to false', () => {
		expect(postTournamentGroupSuccess(initialState, action).isLoadingPostTournamentGroup).toBe(false);
	});

	it('set entity', () => {
		const newState = (postTournamentGroupSuccess(initialState, action));

		expect(newState.tournamentGroups['first-id']).toEqual({
			id: 'first-id',
			name: 'first-name',
		});
	});

	it('keeps others entities in other', () => {
		const someState: TournamentGroupState = {
			...initialState,
			tournamentGroups: {
				['some-id']: {
					id: 'some-id',
					name: 'some-name',
				},
			}
		}

		const newState = (postTournamentGroupSuccess(someState, action));

		expect(newState.tournamentGroups['some-id']).toEqual({
			id: 'some-id',
			name: 'some-name',
		});
	});
});

describe('requestTournament', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT,
	};

	it('sets isLoadingRequestTournament to true', () => {
		expect(requestTournament(initialState, action).isLoadingRequestTournament).toBe(true);
	});
});

describe('requestTournamentFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_FAILURE,
	};

	it('sets isLoadingRequestTournament to false', () => {
		expect(requestTournamentFailure(initialState, action).isLoadingRequestTournament).toBe(false);
	});
});

describe('requestTournamentSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_TOURNAMENT_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				name: 'first-name',
				slug: 'first-slug',
				groups: [{
					id: 'first-team-id',
					name: 'first team name',
				}, {
					id: 'second-team-id',
					name: 'second team name',
				}]
			},
		}
	};

	it('sets isLoadingRequestTournament to false', () => {
		expect(requestTournamentSuccess(initialState, action).isLoadingRequestTournament).toBe(false);
	});

	it('sets entities', () => {
		const newState = (requestTournamentSuccess(initialState, action));

		expect(newState.tournamentGroups['first-team-id']).toEqual({
			id: 'first-team-id',
			name: 'first team name',
		});
		expect(newState.tournamentGroups['second-team-id']).toEqual({
			id: 'second-team-id',
			name: 'second team name',
		});
	});
});
