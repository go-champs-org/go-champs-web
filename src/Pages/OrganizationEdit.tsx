import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrganizations, patchOrganization } from '../Organizations/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import withOrganizations from './support/withOrganizations';
import {
  organizationBySlug,
  organizationsLoading
} from '../Organizations/selectors';
import { Form } from 'react-final-form';
import {
  default as OrganizationForm,
  FormLoading
} from '../Organizations/Form';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Helmet from 'react-helmet';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  organization: organizationBySlug(
    state.organizations,
    props.match.params.organizationSlug
  ),
  organizationsLoading: organizationsLoading(state.organizations)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getOrganizations,
      patchOrganization
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OrganizationEditProps = ConnectedProps<typeof connector>;

const OrganizationEdit: React.FC<OrganizationEditProps> = ({
  organization,
  organizationsLoading,
  patchOrganization
}) => {
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">Edit organization</h2>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!organizationsLoading}
            loader={<FormLoading />}
          >
            <Form
              onSubmit={patchOrganization}
              initialValues={organization}
              render={OrganizationForm}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs! | Edit Organization</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(withOrganizations(OrganizationEdit));
