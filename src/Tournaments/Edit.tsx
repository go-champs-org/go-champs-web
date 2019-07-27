import React from 'react';
import { Form } from 'react-final-form';
import { default as OrganizationNavBar } from '../Organizations/Common/NavBar';
import { OrganizationState } from '../Organizations/state';
import { default as TournamentForm } from './Form';
import { TournamentEntity } from './state';
import FormArray from './Stats/FormArray';
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
        <OrganizationNavBar
          organizationSlug={organizationSlug}
          organization={organization}
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
            <h2 className="subtitle">Team Stats</h2>
          </div>
        </div>
        <FormArray
          deleteTournamentStat={deleteTournamentStat}
          pacthTournamentStat={patchTournamentStat}
          postTournamentStat={postTournamentStat}
          tournamentStat={tournamentStatState.tournamentStats}
        />
      </div>
    </div>
  );
};

export default Edit;
