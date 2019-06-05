import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationState } from '../Organizations/state';
import PageLoader from '../Shared/UI/PageLoader';
import { patchTournament, requestTournament } from '../Tournaments/actions';
import Edit from '../Tournaments/Edit';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentEditProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  organizationState: OrganizationState;
  tournamentState: TournamentState;
  patchTournament: any;
  requestTournament: any;
}

class TournamentEdit extends React.Component<TournamentEditProps> {
  render() {
    const tournament = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ];
    const canRender = !this.props.organizationState.isLoadingRequestOrganization &&
      !!this.props.organizationState.organizations[this.props.match.params.organizationSlug];
    return (
      <PageLoader canRender={canRender}>
        <Edit
          organizationSlug={this.props.match.params.organizationSlug}
          organizationState={this.props.organizationState}
          patchTournament={this.props.patchTournament}
          tournament={tournament} />
      </PageLoader>

    );
  }

  componentDidMount() {
    const tournamentId = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ].id;
    this.props.requestTournament(tournamentId);
  }
}

const mapStateToProps = (state: any) => {
  return {
    organizationState: state.organizations,
    tournamentState: state.tournaments,
  }
};

const mapDispatchToProps = (dispatch: any, state: TournamentEditProps) => {
  const currentOrganization = state.organizationState.organizations[state.match.params.organizationSlug];
  const organizationId = currentOrganization ? currentOrganization.id : '';
  return bindActionCreators(
    {
      patchTournament: patchTournament(organizationId),
      requestTournament,
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentEdit)
);
