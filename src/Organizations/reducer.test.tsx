import { HttpAction } from '../Shared/store/interfaces';
import { ActionTypes, POST_ORGANIZATION, POST_ORGANIZATION_FAILURE, POST_ORGANIZATION_SUCCESS, REQUEST_ORGANIZATIONS, REQUEST_ORGANIZATIONS_FAILURE, REQUEST_ORGANIZATIONS_SUCCESS } from './actions';
import { postOrganization, postOrganizationFailure, postOrganizationSuccess, requestOrganizations, requestOrganizationsFailure, requestOrganizationsSuccess } from './reducer';
import { initialState, OrganizationState } from './state';

describe('postOrganization', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_ORGANIZATION,
	};

	it('sets isLoadingPostOrganization to true', () => {
		expect(postOrganization(initialState, action).isLoadingPostOrganization).toBe(true);
	});
});

describe('postOrganizationFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_ORGANIZATION_FAILURE,
	};

	it('sets isLoadingPostOrganization to false', () => {
		expect(postOrganizationFailure(initialState, action).isLoadingPostOrganization).toBe(false);
	});
});

describe('postOrganizationSuccess', () => {
	const action: HttpAction<ActionTypes> = {
		type: POST_ORGANIZATION_SUCCESS,
		payload: {
			data:
			{
				id: 'first-id',
				name: 'first-name',
				slug: 'first-slug',
			}
		}
	};

	it('sets isLoadingPostOrganization to false', () => {
		expect(postOrganizationSuccess(initialState, action).isLoadingPostOrganization).toBe(false);
	});

	it('set entity', () => {
		const newState = (postOrganizationSuccess(initialState, action));

		expect(newState.organizations['first-slug']).toEqual({
			id: 'first-id',
			name: 'first-name',
			slug: 'first-slug',
		});
	});

	it('keeps others entities in other', () => {
		const someState: OrganizationState = {
			...initialState,
			organizations: {
				['some-slug']: {
					id: 'some-id',
					name: 'some-name',
					slug: 'some-slug',
				},
			}
		}

		const newState = (postOrganizationSuccess(someState, action));

		expect(newState.organizations['some-slug']).toEqual({
			id: 'some-id',
			name: 'some-name',
			slug: 'some-slug',
		});
	});
});

describe('requestOrganizations', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_ORGANIZATIONS,
	};

	it('sets isLoadingRequestOrganizations to true', () => {
		expect(requestOrganizations(initialState, action).isLoadingRequestOrganizations).toBe(true);
	});
});

describe('requestOrganizationsFailure', () => {
	const action: HttpAction<ActionTypes> = {
		type: REQUEST_ORGANIZATIONS_FAILURE,
	};

	it('sets isLoadingRequestOrganizations to false', () => {
		expect(requestOrganizationsFailure(initialState, action).isLoadingRequestOrganizations).toBe(false);
	});
});

describe('requestOrganizationsSuccess', () => {
	const action: HttpAction<ActionTypes> = {
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

		expect(newState.organizations['first-slug']).toEqual({
			id: 'first-id',
			name: 'first-name',
			slug: 'first-slug',
		});
		expect(newState.organizations['second-slug']).toEqual({
			id: 'second-id',
			name: 'second-name',
			slug: 'second-slug',
		});
	});
});