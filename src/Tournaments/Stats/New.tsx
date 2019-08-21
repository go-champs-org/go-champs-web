import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentState } from '../state';
import { default as TournamentStatForm } from './Form';

interface TournamentStatNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  postTournamentStat: any;
  tournamentState: TournamentState;
}

export const New: React.FC<TournamentStatNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  postTournamentStat,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <Top
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Stat</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentStat}
          initialValues={{ name: '' }}
          render={TournamentStatForm}
        />
      </div>
    </div>
  );
};

export default New;
