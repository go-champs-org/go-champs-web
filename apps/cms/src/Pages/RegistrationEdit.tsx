import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import arrayMutators from 'final-form-arrays';
import { Mutator } from 'final-form';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { patchRegistration } from '../Registrations/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  registrationsLoading,
  registrationById,
  patchingRegistration
} from '../Registrations/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import {
  default as RegistrationForm,
  FormLoading
} from '../Registrations/Form';
import withTournament from './support/withTournament';
import { organizationBySlug } from '../Organizations/selectors';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { RegistrationEntity } from '../Registrations/state';
import { Trans } from 'react-i18next';
import { teamsForSelectInput } from '../Teams/selectors';
import { Link } from 'react-router-dom';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { organizationSlug } = props.match.params;
  return {
    ...props,
    isPatchingRegistration: patchingRegistration(state.registrations),
    organization: organizationBySlug(state.organizations, organizationSlug),
    registrationsLoading: registrationsLoading(state.registrations),
    registration: registrationById(
      state.registrations,
      props.match.params.registrationId
    ),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      patchRegistration
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type RegistrationEditProps = ConnectedProps<typeof connector>;

function RegistrationEdit({
  isPatchingRegistration,
  match,
  registration,
  registrationsLoading,
  patchRegistration
}: RegistrationEditProps): React.ReactElement {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const registrationInviterUrl = `/${organizationSlug}/${tournamentSlug}/RegistrationInvites/${registration.id}`;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Registrations`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-vcentered is-mobile is-multiline">
          <div className="column is-6">
            <h2 className="subtitle">
              <Trans>editRegistration</Trans>
            </h2>
          </div>

          <div className="column is-6 has-text-right">
            <Link to={registrationInviterUrl} className="button is-outlined">
              <span className="icon">
                <i className="fas fa-envelope"></i>
              </span>

              <span>
                <Trans>invites</Trans>
              </span>
            </Link>
          </div>

          <div className="column is-12">
            <ComponentLoader
              canRender={!registrationsLoading}
              loader={<FormLoading />}
            >
              <Form
                onSubmit={patchRegistration}
                initialValues={registration}
                mutators={
                  (arrayMutators as unknown) as {
                    [key: string]: Mutator<RegistrationEntity>;
                  }
                }
                render={(props: FormRenderProps<RegistrationEntity>) => (
                  <RegistrationForm
                    {...props}
                    push={props.form.mutators.push}
                    backUrl={backUrl}
                    isLoading={isPatchingRegistration}
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
}

export default connector(
  withTournament<RegistrationEditProps>(RegistrationEdit)
);
