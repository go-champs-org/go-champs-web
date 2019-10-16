import React from 'react';
import { Form } from 'react-final-form';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../../Phases/state';
import { TournamentState } from '../state';
import { default as TournamentTeamForm } from './Form';
import { TournamentTeamEntity } from './state';

interface TournamentTeamEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  postTournamentTeam: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentTeam: TournamentTeamEntity;
}

export const Edit: React.FC<TournamentTeamEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTournamentTeam,
  tournamentPhaseState,
  tournamentState,
  tournamentTeam
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Edit Team</h2>
          </div>
        </div>
        <Form
          onSubmit={postTournamentTeam}
          initialValues={tournamentTeam}
          render={TournamentTeamForm}
        />
      </div>
    </div>
  );
};

export default Edit;
