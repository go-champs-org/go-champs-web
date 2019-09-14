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
import { deleteTournamentTeam } from '../Tournaments/Teams/actions';
import List from '../Tournaments/Teams/List';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentTeamListProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentTeam: any;
  phase: TournamentPhaseEntity;
  tournamentPhaseState: TournamentPhaseState;
  tournamentTeamState: TournamentTeamState;
  tournamentState: TournamentState;
  requestTournament: any;
}

class TournamentTeamList extends React.Component<TournamentTeamListProps> {
  render() {
    const {
      deleteTournamentTeam,
      match,
      phase,
      tournamentPhaseState,
      tournamentTeamState,
      tournamentState
    } = this.props;

    return (
      <List
        currentOrganizationSlug={match.params.organizationSlug}
        currentTournamentSlug={match.params.tournamentSlug}
        deleteTournamentTeam={deleteTournamentTeam}
        phase={phase}
        tournamentPhaseState={tournamentPhaseState}
        tournamentTeamState={tournamentTeamState}
        tournamentState={tournamentState}
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
  tournamentTeamState: state.tournamentTeams
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      deleteTournamentTeam: deleteTournamentTeam(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentTeamList)
);
