export interface OrganizationEntity {
	id: string;
	name: string;
	slug: string;
}

export interface OrganizationState {
	isLoadingPostOrganization: boolean;
	isLoadingRequestOrganizations: boolean;
	organizations: { [key: string]: OrganizationEntity; };
}

export const initialState: OrganizationState = {
	isLoadingPostOrganization: false,
	isLoadingRequestOrganizations: false,
	organizations: {},
}