import React from 'react';
import { Form } from 'react-final-form';
import { TournamentState } from '../Tournaments/state';
import { default as PhaseForm } from './Form';
import { PhaseEntity, PhaseState } from './state';

interface PhaseEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchPhase: any;
  phase: PhaseEntity;
  tournamentState: TournamentState;
  tournamentPhase: PhaseEntity;
  tournamentPhaseState: PhaseState;
}

export const Edit: React.FC<PhaseEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchPhase,
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
          onSubmit={patchPhase}
          initialValues={tournamentPhase}
          render={PhaseForm}
        />
      </div>
    </div>
  );
};

export default Edit;
