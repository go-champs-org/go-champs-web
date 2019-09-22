import React from 'react';
import { Form } from 'react-final-form';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import { TournamentState } from '../state';
import { default as TournamentStatForm } from './Form';
import { TournamentStatEntity } from './state';

interface PhaseStatEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTournamentStat: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentStat: TournamentStatEntity;
}

export const Edit: React.FC<PhaseStatEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentStat,
  tournamentPhaseState,
  tournamentState,
  tournamentStat
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
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
