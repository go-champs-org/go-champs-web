import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { registrationId } = props.match.params;
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type RegistrationInviteManagerProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function RegistrationInviteManager({ match }: RegistrationInviteManagerProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="container">
          <div className="columns is-multiline is-mobile is-vcentered"></div>
        </div>
        <div className="is-divider-vertical is-hidden-tablet-only"></div>

        <div className="column is-4-desktop is-12-tablet">
          <AdminMenu
            organizationSlug={organizationSlug}
            tournamentSlug={tournamentSlug}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default RegistrationInviteManager;
