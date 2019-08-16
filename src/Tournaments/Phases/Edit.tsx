import React from 'react';
import { Form } from 'react-final-form';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { default as TournamentPhaseForm } from './Form';
import { TournamentPhaseEntity } from './state';

interface TournamentPhaseEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchTournamentPhase: any;
  tournamentState: TournamentState;
  tournamentPhase: TournamentPhaseEntity;
}

export const Edit: React.FC<TournamentPhaseEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchTournamentPhase,
  tournamentState,
  tournamentPhase
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
            <h2 className="subtitle">Edit Phase</h2>
          </div>
        </div>
        <Form
          onSubmit={patchTournamentPhase}
          initialValues={tournamentPhase}
          render={TournamentPhaseForm}
        />
      </div>
    </div>
  );
};

export default Edit;
