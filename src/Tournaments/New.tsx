import React from 'react';
import { Form } from 'react-final-form';
import { default as OrganizationNavBar } from '../Organizations/Common/NavBar';
import { OrganizationState } from '../Organizations/state';
import { default as TournamentForm } from './Form';

interface TournamentNewProps {
  organizationSlug: string;
  organizationState: OrganizationState;
  postTournament: any;
}

export const New: React.FC<TournamentNewProps> = ({
  organizationSlug,
  organizationState,
  postTournament
}) => {
  const organization = organizationState.organizations[organizationSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <OrganizationNavBar
          organizationSlug={postTournament}
          organization={organization}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Tournament</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournament}
          initialValues={{ name: '', slug: '' }}
          render={TournamentForm}
        />
      </div>
    </div>
  );
};

export default New;
