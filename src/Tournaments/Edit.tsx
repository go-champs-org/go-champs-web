import React from 'react';
import { Form } from 'react-final-form';
import { OrganizationState } from '../Organizations/state';
import NavBar from './Common/NavBar';
import { default as TournamentForm } from './Form';
import { default as PhasesForm } from './Phases/Edit';
import { TournamentEntity } from './state';
import { TournamentStatState } from './Stats/state';

interface TournamentEditProps {
  deleteTournamentStat: any;
  organizationSlug: string;
  organizationState: OrganizationState;
  patchTournament: any;
  patchTournamentStat: any;
  postTournamentStat: any;
  tournament: TournamentEntity;
  tournamentStatState: TournamentStatState;
}

export const Edit: React.FC<TournamentEditProps> = ({
  deleteTournamentStat,
  organizationSlug,
  organizationState,
  patchTournament,
  patchTournamentStat,
  postTournamentStat,
  tournament,
  tournamentStatState
}) => {
  const organization = organizationState.organizations[organizationSlug];
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar
          organizationSlug={organization.slug}
          tournament={tournament}
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
        <div
          className="columns is-mobile is-vcentered"
          style={{ marginTop: '.5em' }}
        >
          <div className="column is-8">
            <h2 className="subtitle">Phases</h2>
          </div>
        </div>
        <PhasesForm />
      </div>
    </div>
  );
};

export default Edit;
