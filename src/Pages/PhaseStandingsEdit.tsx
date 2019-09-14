import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { requestTournament } from '../Tournaments/actions';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import { currentPhase } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import { Edit } from '../Tournaments/Standings/Edit';
import { TournamentState } from '../Tournaments/state';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { patchTournamentTeam } from '../Tournaments/Teams/actions';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface PhaseStandingsEditProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  patchTournamentTeam: any;
  phase: TournamentPhaseEntity;
  requestTournament: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentGroupState: TournamentGroupState;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
  tournamentTeamState: TournamentTeamState;
}

class PhaseStandingsEdit extends React.Component<PhaseStandingsEditProps> {
  render() {
    return (
      <Edit
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        patchTournamentTeam={this.props.patchTournamentTeam}
        phase={this.props.phase}
        tournamentPhaseState={this.props.tournamentPhaseState}
        tournamentGroupState={this.props.tournamentGroupState}
        tournamentState={this.props.tournamentState}
        tournamentStatState={this.props.tournamentStatState}
        tournamentTeamState={this.props.tournamentTeamState}
      />
    );
  }

  componentDidMount() {
    const tournamentId = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ].id;
    this.props.requestTournament(tournamentId);
  }
}

const mapStateToProps = (state: StoreState) => ({
  phase: currentPhase(state),
  tournamentPhaseState: state.tournamentPhases,
  tournamentGroupState: state.tournamentGroups,
  tournamentState: state.tournaments,
  tournamentStatState: state.tournamentStats,
  tournamentTeamState: state.tournamentTeams
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      patchTournamentTeam: patchTournamentTeam(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhaseStandingsEdit)
);
