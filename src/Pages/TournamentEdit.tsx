import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { OrganizationState } from '../Organizations/state';
import { PhaseEliminationStatState } from '../Phases/EliminationStats/state';
import { selectedPhase } from '../Phases/selectors';
import { PhaseEntity, PhaseState } from '../Phases/state';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import Edit from '../Tournaments/Edit';
import { getTournament, patchTournament } from '../Tournaments/effects';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentEditProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  phase: PhaseEntity | undefined;
  deletePhaseEliminationStat: any;
  organizationState: OrganizationState;
  tournamentPhaseState: PhaseState;
  tournamentState: TournamentState;
  tournamentStatState: PhaseEliminationStatState;
  patchTournament: any;
  patchPhaseEliminationStat: any;
  postPhaseEliminationStat: any;
  getTournament: any;
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
      !this.props.organizationState.isLoadingOrganizations &&
      !!this.props.organizationState.organizations[
        this.props.match.params.organizationSlug
      ];
    return (
      <PageLoader canRender={canRender}>
        <Edit
          patchTournament={this.props.patchTournament}
          tournament={tournament}
        />
      </PageLoader>
    );
  }

  componentDidMount() {
    const tournamentId = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ].id;
    this.props.getTournament(tournamentId);
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    organizationState: state.organizations,
    phase: selectedPhase(state.phases),
    tournamentPhaseState: state.phases,
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
      getTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(mapStateToProps, mapDispatchToProps)(TournamentEdit)
);
