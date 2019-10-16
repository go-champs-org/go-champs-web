import React from 'react';
import { Form } from 'react-final-form';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../../Phases/state';
import { TournamentState } from '../state';
import { default as TournamentStatForm } from './Form';

interface PhaseStatNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTournamentStat: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}

export const New: React.FC<PhaseStatNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentStat,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Stat</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentStat}
          initialValues={{ name: '' }}
          render={TournamentStatForm}
        />
      </div>
    </div>
  );
};

export default New;
