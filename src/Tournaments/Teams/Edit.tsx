import React from 'react';
import { Form } from 'react-final-form';
import Top from '../Common/Top';
import { TournamentGroupEntity } from '../Groups/state';
import { TournamentPhaseState } from '../Phases/state';
import { TournamentState } from '../state';
import { default as TournamentTeamForm } from './Form';
import { TournamentTeamEntity } from './state';

interface TournamentTeamEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  postTournamentTeam: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentTeam: TournamentTeamEntity;
  tournamentGroups: { [key: string]: TournamentGroupEntity };
}

export const Edit: React.FC<TournamentTeamEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  postTournamentTeam,
  tournamentPhaseState,
  tournamentState,
  tournamentTeam,
  tournamentGroups
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
            <h2 className="subtitle">Edit Team</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentTeam}
          initialValues={tournamentTeam}
          render={(props: any) => (
            <TournamentTeamForm
              {...props}
              tournamentGroups={tournamentGroups}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Edit;
