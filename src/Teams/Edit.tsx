import React from 'react';
import { Form } from 'react-final-form';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import { PhaseEliminationState } from '../Tournaments/state';
import { default as TeamForm } from './Form';
import { TeamEntity } from './state';

interface TeamEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTeam: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: PhaseEliminationState;
  tournamentTeam: TeamEntity;
}

export const Edit: React.FC<TeamEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTeam,
  tournamentPhaseState,
  tournamentState,
  tournamentTeam
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Edit Team</h2>
          </div>
        </div>
        <Form
          onSubmit={postTeam}
          initialValues={tournamentTeam}
          render={TeamForm}
        />
      </div>
    </div>
  );
};

export default Edit;
