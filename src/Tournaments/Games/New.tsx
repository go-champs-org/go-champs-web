import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import { TournamentState } from '../state';
import { TournamentTeamEntity } from '../Teams/state';
import { default as TournamentGameForm } from './Form';

interface PhaseGameNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTournamentGame: any;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}

export const New: React.FC<PhaseGameNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentGame,
  tournamentPhaseState,
  tournamentState,
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
            <h2 className="subtitle">New Game</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentGame}
          initialValues={{ datetime: '', location: '' }}
          render={(props: any) => (
            <TournamentGameForm {...props} tournamentTeams={tournamentTeams} />
          )}
        />
      </div>
    </div>
  );
};

export default New;
