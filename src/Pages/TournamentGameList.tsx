import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { requestTournament } from '../Tournaments/actions';
import {
  deleteTournamentGame,
  requestTournamentGames
} from '../Tournaments/Games/actions';
import List from '../Tournaments/Games/List';
import { TournamentGameState } from '../Tournaments/Games/state';
import { currentPhase } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGameListProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentGame: any;
  phase: TournamentPhaseEntity;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  requestTournament: any;
  requestTournamentGames: any;
}

class TournamentGameList extends React.Component<TournamentGameListProps> {
  render() {
    const {
      deleteTournamentGame,
      match,
      phase,
      tournamentPhaseState,
      tournamentState,
      tournamentGameState
    } = this.props;

    return (
      <List
        currentOrganizationSlug={match.params.organizationSlug}
        currentTournamentSlug={match.params.tournamentSlug}
        deleteTournamentGame={deleteTournamentGame}
        phase={phase}
        tournamentPhaseState={tournamentPhaseState}
        tournamentState={tournamentState}
        tournamentGameState={tournamentGameState}
      />
    );
  }

  componentDidMount() {
    const tournamentId = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ].id;
    this.props.requestTournament(tournamentId);
    this.props.requestTournamentGames(tournamentId);
  }
}

const mapStateToProps = (state: StoreState) => ({
  phase: currentPhase(state),
  tournamentState: state.tournaments,
  tournamentGameState: state.tournamentGames,
  tournamentGroupState: state.tournamentGroups,
  tournamentPhaseState: state.tournamentPhases,
  tournamentTeamState: state.tournamentTeams
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      deleteTournamentGame: deleteTournamentGame(tournamentId),
      requestTournamentGames: requestTournamentGames(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentGameList)
);
