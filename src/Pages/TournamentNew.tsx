import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postTournament } from '../Tournaments/effects';
import { default as TournamentForm, FormLoading } from '../Tournaments/Form';
import { Form } from 'react-final-form';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import {
  organizationBySlug,
  organizationsLoading
} from '../Organizations/selectors';
import { OrganizationEntity } from '../Organizations/state';
import withOrganizations from './support/withOrganizations';
import { getOrganizations } from '../Organizations/effects';

interface OwnProps extends RouteComponentProps<RouteProps> {
  organization: OrganizationEntity;
}

type StateProps = {
  organization: OrganizationEntity;
  organizationsLoading: boolean;
};

type DispatchProps = {
  getOrganizations: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  postTournament: (
    organizationId: string,
    tournament: TournamentEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  const { organizationSlug } = props.match.params;
  return {
    organization: organizationBySlug(state.organizations, organizationSlug),
    organizationsLoading: organizationsLoading(state.organizations)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getOrganizations,
      postTournament
    },
    dispatch
  );
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    postTournament: (tournament: TournamentEntity) =>
      dispatchProps.postTournament(stateProps.organization.id, tournament)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type TournamentNewProps = ConnectedProps<typeof connector>;

const TournamentNew: React.FC<TournamentNewProps> = ({
  organizationsLoading,
  postTournament
}) => {
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">New tournament</h2>
        </div>

        <div className="column is-12">
          {organizationsLoading ? (
            <FormLoading />
          ) : (
            <Form
              onSubmit={postTournament}
              initialValues={DEFAULT_TOURNAMENT}
              render={TournamentForm}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withOrganizations(TournamentNew));
