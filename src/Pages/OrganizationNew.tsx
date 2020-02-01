import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { postOrganization } from '../Organizations/effects';
import { default as OrganizationForm } from '../Organizations/Form';
import { Form } from 'react-final-form';
import { DEFAULT_ORGANIZATION } from '../Organizations/state';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postOrganization
    },
    dispatch
  );

const connector = connect(state => state, mapDispatchToProps);

type OrganizationNewProps = ConnectedProps<typeof connector>;

const OrganizationNew: React.FC<OrganizationNewProps> = ({
  postOrganization
}) => {
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">New organization</h2>
        </div>

        <div className="column is-12">
          <Form
            onSubmit={postOrganization}
            initialValues={DEFAULT_ORGANIZATION}
            render={OrganizationForm}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default connector(OrganizationNew);
