import { HttpAction } from '../Shared/store/interfaces';
import { ActionTypes, REQUEST_TOURNAMENT, REQUEST_TOURNAMENTS, REQUEST_TOURNAMENTS_FAILURE, REQUEST_TOURNAMENTS_SUCCESS, REQUEST_TOURNAMENT_FAILURE, REQUEST_TOURNAMENT_SUCCESS } from './actions';
import { requestTournament, requestTournamentFailure, requestTournaments, requestTournamentsFailure, requestTournamentsSuccess, requestTournamentSuccess } from './reducer';
import { initialState, TournamentState } from './state';

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
            },
        }
    };

    it('sets isLoadingRequestTournament to false', () => {
        expect(requestTournamentSuccess(initialState, action).isLoadingRequestTournament).toBe(false);
    });

    it('set entity', () => {
        const newState = (requestTournamentSuccess(initialState, action));

        expect(newState.tournaments['first-id']).toEqual({
            id: 'first-id',
            name: 'first-name',
            slug: 'first-slug',
        });
    });

    it('keeps others entities in other', () => {
        const someState: TournamentState = {
            ...initialState,
            tournaments: {
                ['some-id']: {
                    id: 'some-id',
                    name: 'some-name',
                    slug: 'some-slug',
                },
            }
        }

        const newState = (requestTournamentSuccess(someState, action));

        expect(newState.tournaments['some-id']).toEqual({
            id: 'some-id',
            name: 'some-name',
            slug: 'some-slug',
        });
    });
});

describe('requestTournaments', () => {
    const action: HttpAction<ActionTypes> = {
        type: REQUEST_TOURNAMENTS,
    };

    it('sets isLoadingRequestTournaments to true', () => {
        expect(requestTournaments(initialState, action).isLoadingRequestTournaments).toBe(true);
    });
});

describe('requestTournamentsFailure', () => {
    const action: HttpAction<ActionTypes> = {
        type: REQUEST_TOURNAMENTS_FAILURE,
    };

    it('sets isLoadingRequestTournaments to false', () => {
        expect(requestTournamentsFailure(initialState, action).isLoadingRequestTournaments).toBe(false);
    });
});

describe('requestTournamentsSuccess', () => {
    const action: HttpAction<ActionTypes> = {
        type: REQUEST_TOURNAMENTS_SUCCESS,
        payload: {
            data: [
                {
                    id: 'first-id',
                    name: 'first-name',
                    slug: 'first-slug',
                },
                {
                    id: 'second-id',
                    name: 'second-name',
                    slug: 'second-slug',
                },
            ]
        }
    };

    it('sets isLoadingRequestTournaments to false', () => {
        expect(requestTournamentsSuccess(initialState, action).isLoadingRequestTournaments).toBe(false);
    });

    it('sets entities', () => {
        const newState = (requestTournamentsSuccess(initialState, action));

        expect(newState.tournaments['first-id']).toEqual({
            id: 'first-id',
            name: 'first-name',
            slug: 'first-slug',
        });
        expect(newState.tournaments['second-id']).toEqual({
            id: 'second-id',
            name: 'second-name',
            slug: 'second-slug',
        });
    });
});