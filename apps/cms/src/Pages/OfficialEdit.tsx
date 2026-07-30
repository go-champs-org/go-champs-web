import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchOfficial } from '../Officials/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { tournamentLoading } from '../Tournaments/selectors';
import { officialById, patchingOfficial } from '../Officials/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import { default as OfficialForm, FormLoading } from '../Officials/Form';
import withTournament from './support/withTournament';
import { organizationBySlug } from '../Organizations/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { OfficialEntity } from '../Officials/state';
import { Trans } from 'react-i18next';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { organizationSlug } = props.match.params;
  return {
    ...props,
    isPatchingOfficial: patchingOfficial(state.officials),
    organization: organizationBySlug(state.organizations, organizationSlug),
    officialsLoading: tournamentLoading(state.tournaments),
    official: officialById(state.officials, props.match.params.officialId || '')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      patchOfficial
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialEditProps = ConnectedProps<typeof connector>;

const OfficialEdit: React.FC<OfficialEditProps> = ({
  isPatchingOfficial,
  match,
  official,
  officialsLoading,
  patchOfficial
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Officials`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>editOfficial</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <ComponentLoader
              canRender={!officialsLoading}
              loader={<FormLoading />}
            >
              <Form
                onSubmit={patchOfficial}
                initialValues={official}
                render={(props: FormRenderProps<OfficialEntity>) => (
                  <OfficialForm
                    {...props}
                    backUrl={backUrl}
                    isLoading={isPatchingOfficial}
                  />
                )}
              />
            </ComponentLoader>
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withTournament<OfficialEditProps>(OfficialEdit));
