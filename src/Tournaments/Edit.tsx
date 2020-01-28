import React from 'react';
import { Form } from 'react-final-form';
import { default as TournamentForm } from './Form';
import { TournamentEntity } from './state';

interface TournamentEditProps {
  patchTournament: any;
  tournament: TournamentEntity;
}

export const Edit: React.FC<TournamentEditProps> = ({
  patchTournament,
  tournament
}) => {
  return (
    <div className="columns is-multiline">
      <header className="column is-12">Tournament edit</header>
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
