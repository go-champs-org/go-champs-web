import React from 'react';
import { Form } from 'react-final-form';
import NavBar from '../Shared/UI/NavBar';
import { default as OrganizationForm } from './Form';

interface TournamentNewProps {
  postOrganization: any;
}

export const New: React.FC<TournamentNewProps> = ({ postOrganization }) => {
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar title="Super tournament" titleUrl="" />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Organization</h2>
          </div>
        </div>
        <Form
          onSubmit={postOrganization}
          initialValues={{ name: '', slug: '' }}
          render={OrganizationForm}
        />
      </div>
    </div>
  );
};

export default New;
