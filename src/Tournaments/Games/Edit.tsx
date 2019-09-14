import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import { TournamentState } from '../state';
import { TournamentTeamEntity } from '../Teams/state';
import { default as TournamentGameForm } from './Form';
import { TournamentGameEntity } from './state';

interface TournamentGameEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchTournamentGame: any;
  phase: TournamentPhaseEntity;
  tournamentState: TournamentState;
  tournamentGame: TournamentGameEntity;
  tournamentPhaseState: TournamentPhaseState;
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}

export const Edit: React.FC<TournamentGameEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchTournamentGame,
  phase,
  tournamentGame,
  tournamentState,
  tournamentPhaseState,
  tournamentTeams
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <Top
          organizationSlug={currentOrganizationSlug}
          phase={phase}
          tournament={tournament}
          tournamentPhases={tournamentPhaseState.tournamentPhases}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
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
            <TournamentGameForm {...props} tournamentTeams={tournamentTeams} />
          )}
        />
      </div>
    </div>
  );
};

export default Edit;
