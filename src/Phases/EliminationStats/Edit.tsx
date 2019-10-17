import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEliminationState } from '../../Tournaments/state';
import { TournamentPhaseEntity, TournamentPhaseState } from '../state';
import { default as PhaseEliminationStatForm } from './Form';
import { PhaseEliminationStatEntity } from './state';

interface PhaseStatEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postPhaseEliminationStat: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: PhaseEliminationState;
  tournamentStat: PhaseEliminationStatEntity;
}

export const Edit: React.FC<PhaseStatEditProps> = ({
  currentTournamentSlug,
  postPhaseEliminationStat,
  tournamentState,
  tournamentStat
}) => {
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Edit Stat</h2>
          </div>
        </div>
        <Form
          onSubmit={postPhaseEliminationStat}
          initialValues={tournamentStat}
          render={PhaseEliminationStatForm}
        />
      </div>
    </div>
  );
};

export default Edit;
