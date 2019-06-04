import React from 'react';
import { Form } from 'react-final-form';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { default as TournamentGroupForm } from './Form';

interface TournamentGroupNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  postTournamentGroup: any;
  tournamentState: TournamentState;
}

export const New: React.FC<TournamentGroupNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  postTournamentGroup,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Group</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentGroup}
          initialValues={{ name: '' }}
          render={TournamentGroupForm}
        />
      </div>
    </div>
  );
};

export default New;
