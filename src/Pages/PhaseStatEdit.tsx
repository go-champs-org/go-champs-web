import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { requestTournament } from '../Tournaments/actions';
import { currentPhase } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { patchTournamentStat } from '../Tournaments/Stats/actions';
import Edit from '../Tournaments/Stats/Edit';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface PhaseStatEditMatch extends TournamentHomeMatchProps {
  tournamentStatId: string;
}

interface PhaseStatEditProps extends RouteComponentProps<PhaseStatEditMatch> {
  patchTournamentStat: any;
  phase: TournamentPhaseEntity;
  requestTournament: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
}

class PhaseStatEdit extends React.Component<PhaseStatEditProps> {
  render() {
    const tournamentStat = this.props.tournamentStatState.tournamentStats[
      this.props.match.params.tournamentStatId
    ];
    return (
      <Edit
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        phase={this.props.phase}
        postTournamentStat={this.props.patchTournamentStat}
        tournamentPhaseState={this.props.tournamentPhaseState}
        tournamentState={this.props.tournamentState}
        tournamentStat={tournamentStat}
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
  tournamentState: state.tournaments,
  tournamentStatState: state.tournamentStats
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      patchTournamentStat: patchTournamentStat(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhaseStatEdit)
);
