import React from 'react';
import { Link } from "react-router-dom";
import { OrganizationEntity, OrganizationState } from "./state";

const OrganizationCard: React.FC<{ organization: OrganizationEntity, url: string }> = ({ organization }) => (
	<div>
		<Link to={`/${organization.slug}`}>
			{organization.name}
		</Link>
	</div>
);

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const List: React.FC<{ organizationState: OrganizationState, url: string }> = ({ organizationState, url }) => (
	<div>
		{organizationState.isLoadingRequestOrganizations ?
			<Loading /> :
			Object.keys(organizationState.organizations).map((key: string) => <OrganizationCard key={key} organization={organizationState.organizations[key]} url={url} />)
		}
	</div>
);