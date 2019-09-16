import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { requestTournament } from '../Tournaments/actions';
import { requestTournamentGames } from '../Tournaments/Games/actions';
import { TournamentGameState } from '../Tournaments/Games/state';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import Home from '../Tournaments/Home';
import { currentPhase } from '../Tournaments/Phases/selectors';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentHomeProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  phase: TournamentPhaseEntity;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  tournamentGroupState: TournamentGroupState;
  tournamentTeamState: TournamentTeamState;
  tournamentStatState: TournamentStatState;
  requestTournament: any;
  requestTournamentGames: any;
}

class TournamentHome extends React.Component<TournamentHomeProps> {
  render() {
    const {
      match,
      phase,
      tournamentPhaseState,
      tournamentState,
      tournamentGameState,
      tournamentGroupState,
      tournamentTeamState,
      tournamentStatState
    } = this.props;
    return (
      <Home
        currentOrganizationSlug={match.params.organizationSlug}
        currentTournamentSlug={match.params.tournamentSlug}
        phase={phase}
        tournamentPhaseState={tournamentPhaseState}
        tournamentState={tournamentState}
        tournamentGameState={tournamentGameState}
        tournamentGroupState={tournamentGroupState}
        tournamentTeamState={tournamentTeamState}
        tournamentStatState={tournamentStatState}
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
  tournamentGameState: state.tournamentGames,
  tournamentGroupState: state.tournamentGroups,
  tournamentTeamState: state.tournamentTeams,
  tournamentStatState: state.tournamentStats
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const phaseId = state.match.params.phaseId;
  return bindActionCreators(
    {
      requestTournamentGames: requestTournamentGames(phaseId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentHome)
);
