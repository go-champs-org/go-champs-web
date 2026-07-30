import React, { Fragment } from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  getRegistrationInvite,
  putRegistrationResponseApprove
} from '../Registrations/effects';
import {
  isApprovingRegistrationResponses,
  gettingRegistration,
  gettingRegistrationInvite,
  registrationById,
  registrationInviteById
} from '../Registrations/selectors';
import withRegistrationInvite from './support/withRegistrationInvite';
import ResponseList, { Loading } from '../Registrations/ResponseList';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { registrationId, inviteId } = props.match.params;
  return {
    isApprovingRegistrationResponses: isApprovingRegistrationResponses(
      state.registrations
    ),
    registration: registrationById(state.registrations, registrationId),
    registrationLoading: gettingRegistration(state.registrations),
    registrationInvite: registrationInviteById(state.registrations, inviteId),
    registrationInviteLoading: gettingRegistrationInvite(state.registrations)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getRegistrationInvite,
      putRegistrationResponseApprove
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type RegistrationInviteManagerProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function RegistrationInviteManager({
  isApprovingRegistrationResponses,
  registrationInviteLoading,
  registration,
  registrationInvite,
  putRegistrationResponseApprove,
  match
}: RegistrationInviteManagerProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="container">
          <div className="columns is-multiline is-mobile is-vcentered">
            {registrationInviteLoading ? (
              <Loading />
            ) : (
              <ResponseList
                isApprovingRegistrationResponses={
                  isApprovingRegistrationResponses
                }
                registration={registration}
                registrationInvite={registrationInvite}
                organizationSlug={organizationSlug}
                putRegistrationResponseApprove={putRegistrationResponseApprove}
                tournamentSlug={tournamentSlug}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default connector(withRegistrationInvite(RegistrationInviteManager));
