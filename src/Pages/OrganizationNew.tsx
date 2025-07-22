import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { postOrganization } from '../Organizations/effects';
import { default as OrganizationForm } from '../Organizations/Form';
import arrayMutators from 'final-form-arrays';
import { Mutator } from 'final-form';
import { Form, FormRenderProps } from 'react-final-form';
import { OrganizationEntity } from '../Organizations/state';
import Helmet from 'react-helmet';
import { StoreState } from '../store';
import { postingOrganization } from '../Organizations/selectors';
import { buildNewOrganizationWithMember } from '../Organizations/dataMappers';
import { RouteComponentProps } from 'react-router-dom';
import { Trans } from 'react-i18next';

const mapStateToProps = (state: StoreState) => ({
  isPostingOrganization: postingOrganization(state.organizations)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history }: RouteComponentProps
) =>
  bindActionCreators(
    {
      postOrganization: (organization: OrganizationEntity) =>
        postOrganization(organization, history)
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OrganizationNewProps = ConnectedProps<typeof connector>;

const OrganizationNew: React.FC<OrganizationNewProps> = ({
  isPostingOrganization,
  postOrganization
}) => {
  const backUrl = `/Account`;
  const initialOrganization = buildNewOrganizationWithMember();
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>newOrganization</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <Form
            onSubmit={postOrganization}
            initialValues={initialOrganization}
            mutators={
              (arrayMutators as unknown) as {
                [key: string]: Mutator<OrganizationEntity>;
              }
            }
            render={(props: FormRenderProps<OrganizationEntity>) => (
              <OrganizationForm
                {...props}
                backUrl={backUrl}
                isLoading={isPostingOrganization}
                push={props.form.mutators.push}
              />
            )}
          />
        </div>
      </div>

      <Helmet>
        <title>Go Champs | New Organization</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(OrganizationNew);
