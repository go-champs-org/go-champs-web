import React from 'react';
import { Form } from 'react-final-form';
import TopLevel from '../Common/TopLevel';
import { TournamentState } from '../state';
import { default as TournamentStatForm } from './Form';
import { TournamentStatEntity } from './state';

interface TournamentStatEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  postTournamentStat: any;
  tournamentState: TournamentState;
  tournamentStat: TournamentStatEntity;
}

export const Edit: React.FC<TournamentStatEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  postTournamentStat,
  tournamentState,
  tournamentStat
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <TopLevel
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Edit Stat</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentStat}
          initialValues={tournamentStat}
          render={TournamentStatForm}
        />
      </div>
    </div>
  );
};

export default Edit;
