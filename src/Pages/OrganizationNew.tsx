import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postOrganization } from '../Organizations/effects';
import { default as OrganizationForm } from '../Organizations/Form';
import { Form } from 'react-final-form';
import { DEFAULT_ORGANIZATION } from '../Organizations/state';

interface OrganizationNewProps extends RouteComponentProps {
  postOrganization: any;
}

const OrganizationNew: React.FC<OrganizationNewProps> = ({
  postOrganization
}) => {
  return (
    <Fragment>
      <div className="columns is-gapless is-vcentered is-mobile is-multiline">
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

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      postOrganization
    },
    dispatch
  );

export default connect(state => state, mapDispatchToProps)(OrganizationNew);
