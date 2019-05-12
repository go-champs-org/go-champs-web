import { HttpAction, REQUEST_TOURNAMENTS, REQUEST_TOURNAMENTS_FAILURE, REQUEST_TOURNAMENTS_SUCCESS } from './actions';
import { requestTournaments, requestTournamentsFailure, requestTournamentsSuccess } from './reducer';
import { initialState } from './state';

describe('requestTournaments', () => {
    const action: HttpAction = {
        type: REQUEST_TOURNAMENTS,
    };

    it('sets isLoadingRequestTournaments to true', () => {
        expect(requestTournaments(initialState, action).isLoadingRequestTournaments).toBe(true);
    });
});

describe('requestTournamentsFailure', () => {
    const action: HttpAction = {
        type: REQUEST_TOURNAMENTS_FAILURE,
    };

    it('sets isLoadingRequestTournaments to false', () => {
        expect(requestTournamentsFailure(initialState, action).isLoadingRequestTournaments).toBe(false);
    });
});

describe('requestTournamentsSuccess', () => {
    const action: HttpAction = {
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