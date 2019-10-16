import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationState } from '../Organizations/state';
import { TournamentPhaseState } from '../Phases/state';
import { StoreState } from '../store';
import { postTournament } from '../Tournaments/actions';
import New from '../Tournaments/New';
import { OrganizationHomeMatchProps } from './support/routerInterfaces';
import withOrganizations from './support/withOrganizations';

interface TournamentNewProps
  extends RouteComponentProps<OrganizationHomeMatchProps> {
  organizationState: OrganizationState;
  postTournament: any;
  tournamentPhaseState: TournamentPhaseState;
}

class TournamentNew extends React.Component<TournamentNewProps> {
  render() {
    return (
      <New
        organizationSlug={this.props.match.params.organizationSlug}
        organizationState={this.props.organizationState}
        postTournament={this.props.postTournament}
      />
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  organizationState: state.organizations,
  tournamentPhaseState: state.tournamentPhases
});

const mapDispatchToProps = (dispatch: any, state: TournamentNewProps) => {
  const organizationId =
    state.organizationState.organizations[state.match.params.organizationSlug]
      .id;
  return bindActionCreators(
    {
      postTournament: postTournament(organizationId)
    },
    dispatch
  );
};

export default withOrganizations(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentNew)
);
