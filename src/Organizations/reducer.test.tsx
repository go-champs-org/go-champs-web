import { HttpAction, REQUEST_ORGANIZATIONS, REQUEST_ORGANIZATIONS_FAILURE, REQUEST_ORGANIZATIONS_SUCCESS } from './actions';
import { requestOrganizations, requestOrganizationsFailure, requestOrganizationsSuccess } from './reducer';
import { initialState } from './state';

describe('requestOrganizations', () => {
    const action: HttpAction = {
        type: REQUEST_ORGANIZATIONS,
    };

    it('sets isLoadingRequestOrganizations to true', () => {
        expect(requestOrganizations(initialState, action).isLoadingRequestOrganizations).toBe(true);
    });
});

describe('requestOrganizationsFailure', () => {
    const action: HttpAction = {
        type: REQUEST_ORGANIZATIONS_FAILURE,
    };

    it('sets isLoadingRequestOrganizations to false', () => {
        expect(requestOrganizationsFailure(initialState, action).isLoadingRequestOrganizations).toBe(false);
    });
});

describe('requestOrganizationsSuccess', () => {
    const action: HttpAction = {
        type: REQUEST_ORGANIZATIONS_SUCCESS,
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

    it('sets isLoadingRequestOrganizations to false', () => {
        expect(requestOrganizationsSuccess(initialState, action).isLoadingRequestOrganizations).toBe(false);
    });

    it('sets entities', () => {
        const newState = (requestOrganizationsSuccess(initialState, action));

        expect(newState.organizations['first-id']).toEqual({
            id: 'first-id',
            name: 'first-name',
            slug: 'first-slug',
        });
        expect(newState.organizations['second-id']).toEqual({
            id: 'second-id',
            name: 'second-name',
            slug: 'second-slug',
        });
    });
});