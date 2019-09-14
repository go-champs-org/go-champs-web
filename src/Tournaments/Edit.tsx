import React from 'react';
import { Form } from 'react-final-form';
import { OrganizationState } from '../Organizations/state';
import Top from './Common/Top';
import { default as TournamentForm } from './Form';
import { TournamentPhaseEntity, TournamentPhaseState } from './Phases/state';
import { TournamentEntity } from './state';

interface TournamentEditProps {
  organizationSlug: string;
  organizationState: OrganizationState;
  patchTournament: any;
  tournament: TournamentEntity;
  tournamentPhaseState: TournamentPhaseState;
  phase: TournamentPhaseEntity;
}

export const Edit: React.FC<TournamentEditProps> = ({
  organizationSlug,
  organizationState,
  patchTournament,
  phase,
  tournament,
  tournamentPhaseState
}) => {
  const organization = organizationState.organizations[organizationSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <Top
          organizationSlug={organization.slug}
          phase={phase}
          tournament={tournament}
          tournamentPhases={tournamentPhaseState.tournamentPhases}
          tournamentSlug={tournament.slug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Edit Tournament</h2>
          </div>
        </div>
        <Form
          onSubmit={patchTournament}
          initialValues={tournament}
          render={TournamentForm}
        />
      </div>
    </div>
  );
};

export default Edit;
