import { HttpAction } from "../../Shared/store/interfaces";
import { REQUEST_TOURNAMENT_SUCCESS } from "../actions";
import { ActionTypes, POST_TOURNAMENT_TEAM, POST_TOURNAMENT_TEAM_FAILURE, POST_TOURNAMENT_TEAM_SUCCESS } from "./actions";
import { postTournamentTeam, postTournamentTeamFailure, postTournamentTeamSuccess, requestTournamentSuccess } from "./reducer";
import { initialState, TournamentTeamState } from "./state";

describe('postTournamentTeam', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_TOURNAMENT_TEAM,
	};

	it('sets isLoadingPostTournamentTeam to true', () => {
		expect(postTournamentTeam(initialState, action).isLoadingPostTournamentTeam).toBe(true);
	});
});

describe('postTournamentTeamFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_TOURNAMENT_TEAM_FAILURE,
	};

	it('sets isLoadingPostTournamentTeam to false', () => {
		expect(postTournamentTeamFailure(initialState, action).isLoadingPostTournamentTeam).toBe(false);
	});
});

describe('postTournamentTeamSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_TOURNAMENT_TEAM_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				name: 'first-name',
			}
		}
	};

	it('sets isLoadingPostTournamentTeam to false', () => {
		expect(postTournamentTeamSuccess(initialState, action).isLoadingPostTournamentTeam).toBe(false);
	});

	it('set entity', () => {
		const newState = (postTournamentTeamSuccess(initialState, action));

		expect(newState.tournamentTeams['first-id']).toEqual({
			id: 'first-id',
			name: 'first-name',
		});
	});

	it('keeps others entities in other', () => {
		const someState: TournamentTeamState = {
			...initialState,
			tournamentTeams: {
				['some-id']: {
					id: 'some-id',
					name: 'some-name',
				},
			}
		}

		const newState = (postTournamentTeamSuccess(someState, action));

		expect(newState.tournamentTeams['some-id']).toEqual({
			id: 'some-id',
			name: 'some-name',
		});
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
				teams: [{
					id: 'first-team-id',
					name: 'first team name',
				}, {
					id: 'second-team-id',
					name: 'second team name',
				}]
			},
		}
	};

	it('sets entities', () => {
		const newState = (requestTournamentSuccess(initialState, action));

		expect(newState.tournamentTeams['first-team-id']).toEqual({
			id: 'first-team-id',
			name: 'first team name',
		});
		expect(newState.tournamentTeams['second-team-id']).toEqual({
			id: 'second-team-id',
			name: 'second team name',
		});
	});
});
