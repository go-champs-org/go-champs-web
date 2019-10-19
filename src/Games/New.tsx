import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { TeamEntity } from '../Teams/state';
import { TournamentState } from '../Tournaments/state';
import { default as GameForm } from './Form';

interface PhaseGameNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  postGame: any;
  tournamentState: TournamentState;
  tournamentPhaseState: PhaseState;
  teams: { [key: string]: TeamEntity };
}

export const New: React.FC<PhaseGameNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postGame,
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
          onSubmit={postGame}
          initialValues={{ datetime: '', location: '' }}
          render={(props: any) => <GameForm {...props} teams={teams} />}
        />
      </div>
    </div>
  );
};

export default New;
