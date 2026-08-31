import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getOrganizationBySlug,
  patchOrganization
} from '../Organizations/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  organizationBySlug,
  organizationsLoading,
  patchingOrganization
} from '../Organizations/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import {
  default as OrganizationForm,
  FormLoading
} from '../Organizations/Form';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Helmet from 'react-helmet';
import { OrganizationEntity } from '../Organizations/state';
import withOrganization from './support/withOrganization';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  isPatchingOrganization: patchingOrganization(state.organizations),
  organization: organizationBySlug(
    state.organizations,
    props.match.params.organizationSlug
  ),
  organizationsLoading: organizationsLoading(state.organizations)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getOrganizationBySlug,
      patchOrganization
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OrganizationEditProps = ConnectedProps<typeof connector>;

const OrganizationEdit: React.FC<OrganizationEditProps> = ({
  isPatchingOrganization,
  organization,
  organizationsLoading,
  patchOrganization
}) => {
  const backUrl = `/Organization/${organization.slug}`;
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-4">
          <h2 className="subtitle">
            <Trans>editOrganization</Trans>
          </h2>
        </div>

        <div className="column is-8 has-text-right">
          <div className="buttons is-right">
            <Link to={`${backUrl}/Members`}>
              <button className="button is-info is-outlined is-small">
                <span className="icon">
                  <i className="fas fa-users"></i>
                </span>

                <span>
                  <Trans>members</Trans>
                </span>
              </button>
            </Link>

            <Link to={`${backUrl}/Settings`}>
              <button className="button is-info is-outlined is-small">
                <span className="icon">
                  <i className="fas fa-cog"></i>
                </span>

                <span>
                  <Trans>settings</Trans>
                </span>
              </button>
            </Link>
          </div>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!organizationsLoading}
            loader={<FormLoading />}
          >
            <Form
              onSubmit={patchOrganization}
              initialValues={organization}
              render={(props: FormRenderProps<OrganizationEntity>) => (
                <OrganizationForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPatchingOrganization}
                />
              )}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | Edit Organization</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(withOrganization(OrganizationEdit));
