import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationState } from '../Organizations/state';
import PageLoader from '../Shared/UI/PageLoader';
import { patchTournament, requestTournament } from '../Tournaments/actions';
import Edit from '../Tournaments/Edit';
import { TournamentState } from '../Tournaments/state';
import { deleteTournamentStat, patchTournamentStat, postTournamentStat } from '../Tournaments/Stats/actions';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentEditProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentStat: any;
  organizationState: OrganizationState;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
  patchTournament: any;
  patchTournamentStat: any;
  postTournamentStat: any;
  requestTournament: any;
}

class TournamentEdit extends React.Component<TournamentEditProps> {
  render() {
    const tournament = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ];
    const canRender =
      !this.props.organizationState.isLoadingRequestOrganization &&
      !!this.props.organizationState.organizations[
      this.props.match.params.organizationSlug
      ];
    return (
      <PageLoader canRender={canRender}>
        <Edit
          deleteTournamentStat={this.props.deleteTournamentStat(tournament.id)}
          organizationSlug={this.props.match.params.organizationSlug}
          organizationState={this.props.organizationState}
          patchTournament={this.props.patchTournament}
          patchTournamentStat={this.props.patchTournamentStat(tournament.id)}
          postTournamentStat={this.props.postTournamentStat(tournament.id)}
          tournament={tournament}
          tournamentStatState={this.props.tournamentStatState}
        />
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
    tournamentStatState: state.tournamentStats,
  };
};

const mapDispatchToProps = (dispatch: any, state: TournamentEditProps) => {
  const currentOrganization =
    state.organizationState.organizations[state.match.params.organizationSlug];
  const organizationId = currentOrganization ? currentOrganization.id : '';
  return bindActionCreators(
    {
      deleteTournamentStat: deleteTournamentStat,
      patchTournament: patchTournament(organizationId),
      patchTournamentStat: patchTournamentStat,
      postTournamentStat: postTournamentStat,
      requestTournament
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
