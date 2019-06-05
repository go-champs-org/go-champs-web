import React from 'react';
import { Form } from 'react-final-form';
import { default as OrganizationNavBar } from '../Organizations/Common/NavBar';
import { OrganizationState } from '../Organizations/state';
import { default as TournamentForm } from './Form';
import { TournamentEntity } from './state';

interface TournamentEditProps {
	organizationSlug: string;
	organizationState: OrganizationState;
	patchTournament: any;
	tournament: TournamentEntity;
}

export const Edit: React.FC<TournamentEditProps> = ({
	organizationSlug,
	organizationState,
	patchTournament,
	tournament,
}) => {
	const organization = organizationState.organizations[organizationSlug];
	return (
		<div className="columns is-multiline">
			<header className="column is-12">
				<OrganizationNavBar
					organizationSlug={organizationSlug}
					organization={organization}
				/>
			</header>
			<div className="column is-8">
				<div className="columns is-mobile is-vcentered">
					<div className="column is-8">
						<h2 className="subtitle">Edit Tournament</h2>
					</div>
				</div>
				<Form
					onSubmit={patchTournament}
					initialValues={tournament}
					render={TournamentForm}
				/>
			</div>
		</div>
	);
};

export default Edit;
