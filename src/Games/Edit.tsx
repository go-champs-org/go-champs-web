import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { TeamEntity } from '../Teams/state';
import { PhaseEliminationState } from '../Tournaments/state';
import { default as TournamentGameForm } from './Form';
import { TournamentGameEntity } from './state';

interface PhaseGameEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchTournamentGame: any;
  phase: PhaseEntity;
  tournamentState: PhaseEliminationState;
  tournamentGame: TournamentGameEntity;
  tournamentPhaseState: PhaseState;
  teams: { [key: string]: TeamEntity };
}

export const Edit: React.FC<PhaseGameEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchTournamentGame,
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
          onSubmit={patchTournamentGame}
          initialValues={tournamentGame}
          render={(props: any) => (
            <TournamentGameForm {...props} teams={teams} />
          )}
        />
      </div>
    </div>
  );
};

export default Edit;
