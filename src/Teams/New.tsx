import React from 'react';
import { Form } from 'react-final-form';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import { PhaseEliminationState } from '../Tournaments/state';
import { default as TournamentTeamForm } from './Form';

interface TournamentTeamNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTournamentTeam: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: PhaseEliminationState;
}

export const New: React.FC<TournamentTeamNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentTeam,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Team</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentTeam}
          initialValues={{ name: '' }}
          render={TournamentTeamForm}
        />
      </div>
    </div>
  );
};

export default New;
