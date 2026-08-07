import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getOrganizationBySlug } from '../Organizations/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  organizationBySlug,
  organizationsLoading
} from '../Organizations/selectors';
import { organizationSetting } from '../OrganizationSettings/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import { default as OrganizationSettingForm } from '../OrganizationSettings/Form';
import { FormLoading } from '../Organizations/Form';
import {
  patchOrganizationSetting,
  postOrganizationSetting
} from '../OrganizationSettings/effects';
import { OrganizationSettingEntity } from '../OrganizationSettings/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Helmet from 'react-helmet';
import withOrganization from './support/withOrganization';
import { Trans } from 'react-i18next';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  organization: organizationBySlug(
    state.organizations,
    props.match.params.organizationSlug
  ),
  organizationSetting: organizationSetting(
    state.organizations.organizationSettings
  ),
  organizationsLoading: organizationsLoading(state.organizations)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getOrganizationBySlug,
      postOrganizationSetting,
      patchOrganizationSetting
    },
    dispatch
  );

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>
) => ({
  ...stateProps,
  ...dispatchProps,
  patchOrganizationSetting: (organizationSetting: OrganizationSettingEntity) =>
    dispatchProps.patchOrganizationSetting(organizationSetting),
  postOrganizationSetting: (organizationSetting: OrganizationSettingEntity) =>
    dispatchProps.postOrganizationSetting(
      organizationSetting,
      stateProps.organization.id
    )
});

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type OrganizationSettingEditProps = ConnectedProps<typeof connector>;

const OrganizationSettingEdit: React.FC<OrganizationSettingEditProps> = ({
  organization,
  organizationSetting,
  organizationsLoading,
  postOrganizationSetting,
  patchOrganizationSetting
}) => {
  const backUrl = `/Organization/${organization.slug}`;

  const submitFunction = organizationSetting.id
    ? patchOrganizationSetting
    : postOrganizationSetting;

  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>editSettings</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!organizationsLoading}
            loader={<FormLoading />}
          >
            <Form
              onSubmit={submitFunction}
              initialValues={organizationSetting}
              render={(props: FormRenderProps<OrganizationSettingEntity>) => (
                <OrganizationSettingForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={organizationsLoading}
                />
              )}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | Edit Organization Name Format Settings</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(withOrganization(OrganizationSettingEdit));
