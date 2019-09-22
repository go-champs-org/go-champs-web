import React from 'react';
import { Form } from 'react-final-form';
import { TournamentState } from '../state';
import { default as TournamentPhaseForm } from './Form';
import { TournamentPhaseEntity, TournamentPhaseState } from './state';

interface TournamentPhaseNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTournamentPhase: any;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
}

export const New: React.FC<TournamentPhaseNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentPhase,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
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
