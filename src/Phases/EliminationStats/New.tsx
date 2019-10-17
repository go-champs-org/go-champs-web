import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEliminationState } from '../../Tournaments/state';
import { PhaseEntity, PhaseState } from '../state';
import { default as PhaseEliminationStatForm } from './Form';

interface PhaseStatNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  postPhaseEliminationStat: any;
  tournamentPhaseState: PhaseState;
  tournamentState: PhaseEliminationState;
}

export const New: React.FC<PhaseStatNewProps> = ({
  currentTournamentSlug,
  postPhaseEliminationStat,
  tournamentState
}) => {
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Stat</h2>
          </div>
        </div>
        <Form
          onSubmit={postPhaseEliminationStat}
          initialValues={{ name: '' }}
          render={PhaseEliminationStatForm}
        />
      </div>
    </div>
  );
};

export default New;
