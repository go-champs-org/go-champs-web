import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { TournamentState } from '../Tournaments/state';
import { default as TeamForm } from './Form';
import { TeamEntity } from './state';

interface TeamEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  postTeam: any;
  tournamentPhaseState: PhaseState;
  tournamentState: TournamentState;
  team: TeamEntity;
}

export const Edit: React.FC<TeamEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTeam,
  tournamentPhaseState,
  tournamentState,
  team
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
        <Form onSubmit={postTeam} initialValues={team} render={TeamForm} />
      </div>
    </div>
  );
};

export default Edit;
