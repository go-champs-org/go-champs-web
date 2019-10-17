import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { TeamEntity } from '../Teams/state';
import { PhaseEliminationState } from '../Tournaments/state';
import { default as GameForm } from './Form';
import { GameEntity } from './state';

interface PhaseGameEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchGame: any;
  phase: PhaseEntity;
  tournamentState: PhaseEliminationState;
  tournamentGame: GameEntity;
  tournamentPhaseState: PhaseState;
  teams: { [key: string]: TeamEntity };
}

export const Edit: React.FC<PhaseGameEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchGame,
  phase,
  tournamentGame,
  tournamentState,
  tournamentPhaseState,
  teams
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">Game edit</header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Edit Game</h2>
          </div>
        </div>
        <Form
          onSubmit={patchGame}
          initialValues={tournamentGame}
          render={(props: any) => <GameForm {...props} teams={teams} />}
        />
      </div>
    </div>
  );
};

export default Edit;
