import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { TeamEntity } from '../Teams/state';
import { PhaseEliminationState } from '../Tournaments/state';
import { default as TournamentGameForm } from './Form';

interface PhaseGameNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  postTournamentGame: any;
  tournamentState: PhaseEliminationState;
  tournamentPhaseState: PhaseState;
  teams: { [key: string]: TeamEntity };
}

export const New: React.FC<PhaseGameNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentGame,
  tournamentPhaseState,
  tournamentState,
  teams
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Game</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentGame}
          initialValues={{ datetime: '', location: '' }}
          render={(props: any) => (
            <TournamentGameForm {...props} teams={teams} />
          )}
        />
      </div>
    </div>
  );
};

export default New;
