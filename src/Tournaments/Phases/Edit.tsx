import React from 'react';
import { Form } from 'react-final-form';
import { TournamentState } from '../state';
import { default as TournamentPhaseForm } from './Form';
import { TournamentPhaseEntity, TournamentPhaseState } from './state';

interface TournamentPhaseEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchTournamentPhase: any;
  phase: TournamentPhaseEntity;
  tournamentState: TournamentState;
  tournamentPhase: TournamentPhaseEntity;
  tournamentPhaseState: TournamentPhaseState;
}

export const Edit: React.FC<TournamentPhaseEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchTournamentPhase,
  phase,
  tournamentState,
  tournamentPhase,
  tournamentPhaseState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
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
