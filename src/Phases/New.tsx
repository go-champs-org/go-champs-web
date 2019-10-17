import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEliminationState } from '../Tournaments/state';
import { default as PhaseForm } from './Form';
import { PhaseEntity, PhaseState } from './state';

interface PhaseNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  postPhase: any;
  tournamentState: PhaseEliminationState;
  tournamentPhaseState: PhaseState;
}

export const New: React.FC<PhaseNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postPhase,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Phase</h2>
          </div>
        </div>
        <Form
          onSubmit={postPhase}
          initialValues={{ title: '', type: '' }}
          render={PhaseForm}
        />
      </div>
    </div>
  );
};

export default New;
