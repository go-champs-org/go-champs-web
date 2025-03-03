import React, { Fragment } from 'react';
import arrayMutators from 'final-form-arrays';
import { Mutator } from 'final-form';

import { TournamentEntity } from '../Tournaments/state';
import {
  DEFAULT_REGISTRATION,
  RegistrationEntity
} from '../Registrations/state';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { default as RegistrationForm } from '../Registrations/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { RouteProps } from './support/routerInterfaces';
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import { connect, ConnectedProps } from 'react-redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { Trans } from 'react-i18next';
import { postingRegistration } from '../Registrations/selectors';
import { postRegistration } from '../Registrations/effects';
import AdminMenu from '../Tournaments/AdminMenu';

type StateProps = {
  isPostingRegistration: boolean;
  tournament: TournamentEntity;
};

type DispatchProps = {
  postRegistration: (
    registration: RegistrationEntity,
    tournamentId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    isPostingRegistration: postingRegistration(state.registrations),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      postRegistration
    },
    dispatch
  );
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: any
) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    postRegistration: (registration: RegistrationEntity) =>
      dispatchProps.postRegistration(registration, stateProps.tournament.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type RegistrationNewProps = ConnectedProps<typeof connector>;

function RegistrationNew({
  match,
  postRegistration,
  isPostingRegistration
}: RegistrationNewProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Registrations`;
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newRegistration</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postRegistration}
              initialValues={DEFAULT_REGISTRATION}
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
                  isLoading={isPostingRegistration}
                />
              )}
            />
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

export default connector(RegistrationNew);
