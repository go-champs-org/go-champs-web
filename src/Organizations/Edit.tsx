import React from 'react';
import { Form } from 'react-final-form';
import NavBar from '../Shared/UI/NavBar';
import { default as OrganizationForm } from './Form';
import { OrganizationEntity } from './state';

interface OrganizationEditProps {
  patchOrganization: any;
  organization: OrganizationEntity;
}

export const Edit: React.FC<OrganizationEditProps> = ({
  patchOrganization,
  organization
}) => {
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar title="Super tournament" titleUrl="" />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Edit Organization</h2>
          </div>
        </div>
        <Form
          onSubmit={patchOrganization}
          initialValues={organization}
          component={OrganizationForm}
        />
      </div>
    </div>
  );
};

export default Edit;
