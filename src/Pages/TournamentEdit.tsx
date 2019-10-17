import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationState } from '../Organizations/state';
import { PhaseEliminationStatState } from '../Phases/EliminationStats/state';
import { isInProgressPhase } from '../Phases/selectors';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import { patchTournament, requestTournament } from '../Tournaments/actions';
import Edit from '../Tournaments/Edit';
import { PhaseEliminationState } from '../Tournaments/state';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentEditProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  phase: TournamentPhaseEntity | undefined;
  deletePhaseEliminationStat: any;
  organizationState: OrganizationState;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: PhaseEliminationState;
  tournamentStatState: PhaseEliminationStatState;
  patchTournament: any;
  patchPhaseEliminationStat: any;
  postPhaseEliminationStat: any;
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
    tournamentStatState: state.eliminationStats
  };
};

const mapDispatchToProps = (dispatch: any, props: TournamentEditProps) => {
  const currentOrganization =
    props.organizationState.organizations[props.match.params.organizationSlug];
  const organizationId = currentOrganization ? currentOrganization.id : '';
  return bindActionCreators(
    {
      patchTournament: patchTournament(organizationId),
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
