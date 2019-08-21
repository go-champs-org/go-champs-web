import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentState } from '../state';
import { default as TournamentGroupForm } from './Form';
import { TournamentGroupEntity } from './state';
import { TournamentPhaseState } from '../Phases/state';

interface TournamentGroupEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  postTournamentGroup: any;
  tournamentState: TournamentState;
  tournamentGroup: TournamentGroupEntity;
  tournamentPhaseState: TournamentPhaseState;
}

export const Edit: React.FC<TournamentGroupEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  postTournamentGroup,
  tournamentState,
  tournamentGroup,
  tournamentPhaseState
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
            <h2 className="subtitle">Edit Group</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentGroup}
          initialValues={tournamentGroup}
          render={TournamentGroupForm}
        />
      </div>
    </div>
  );
};

export default Edit;
