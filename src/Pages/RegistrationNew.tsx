import React, { Fragment } from 'react';
import { TournamentEntity } from '../Tournaments/state';
import { RegistrationEntity } from '../Registrations/state';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import { connect, ConnectedProps } from 'react-redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { Trans } from 'react-i18next';

type StateProps = {
  // isPostingRegistration: boolean;
  tournament: TournamentEntity;
};

type DispatchProps = {
  // postRegistration: (
  //     registration: RegistrationEntity,
  //     tournamentId: string
  // ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    // isPostingRegistration: postingRegistration(state.registrations),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug
      //   postRegistration
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
    ...dispatchProps
    // postRegistration: (team: RegistrationEntity) =>
    //   dispatchProps.postRegistration(team, stateProps.tournament.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type RegistrationNewProps = ConnectedProps<typeof connector>;

function RegistrationNew({ match }: RegistrationNewProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const backUrl = `/${organizationSlug}/${tournamentSlug}/Teams`;
  return (
    <div>
      <Fragment>
        <div className="column">
          <div className="columns is-multiline">
            <div className="column is-12">
              <h2 className="subtitle">
                <Trans>newRegistration</Trans>
              </h2>
            </div>

            <div className="column is-12"></div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default RegistrationNew;
