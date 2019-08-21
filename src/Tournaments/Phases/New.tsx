import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentState } from '../state';
import { default as TournamentPhaseForm } from './Form';
import { TournamentPhaseState } from './state';

interface TournamentPhaseNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  postTournamentPhase: any;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
}

export const New: React.FC<TournamentPhaseNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  postTournamentPhase,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <Top
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentPhases={tournamentPhaseState.tournamentPhases}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Phase</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentPhase}
          initialValues={{ title: '', type: '' }}
          render={TournamentPhaseForm}
        />
      </div>
    </div>
  );
};

export default New;
