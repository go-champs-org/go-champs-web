import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import { TournamentState } from '../state';
import { default as TournamentGroupForm } from './Form';

interface TournamentGroupNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTournamentGroup: any;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
}

export const New: React.FC<TournamentGroupNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentGroup,
  tournamentPhaseState,
  tournamentState
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
            <h2 className="subtitle">New Group</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentGroup}
          initialValues={{ name: '' }}
          render={TournamentGroupForm}
        />
      </div>
    </div>
  );
};

export default New;
