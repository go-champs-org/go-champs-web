import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationState } from '../Organizations/state';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import { patchTournament, requestTournament } from '../Tournaments/actions';
import Edit from '../Tournaments/Edit';
import { isInProgressPhase } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import {
  deleteTournamentStat,
  patchTournamentStat,
  postTournamentStat
} from '../Tournaments/Stats/actions';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentEditProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  phase: TournamentPhaseEntity | undefined;
  deleteTournamentStat: any;
  organizationState: OrganizationState;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
  patchTournament: any;
  patchTournamentStat: any;
  postTournamentStat: any;
  requestTournament: any;
}

class TournamentEdit extends React.Component<TournamentEditProps> {
  render() {
    if (!this.props.phase) {
      return (
        <PageLoader canRender={false}>
          <div></div>
        </PageLoader>
      );
    }
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
          phase={this.props.phase!}
          organizationSlug={this.props.match.params.organizationSlug}
          organizationState={this.props.organizationState}
          patchTournament={this.props.patchTournament}
          tournament={tournament}
          tournamentPhaseState={this.props.tournamentPhaseState}
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

const mapStateToProps = (state: StoreState) => {
  return {
    organizationState: state.organizations,
    phase: isInProgressPhase(state.tournamentPhases),
    tournamentPhaseState: state.tournamentPhases,
    tournamentState: state.tournaments,
    tournamentStatState: state.tournamentStats
  };
};

const mapDispatchToProps = (dispatch: any, props: TournamentEditProps) => {
  const currentOrganization =
    props.organizationState.organizations[props.match.params.organizationSlug];
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
