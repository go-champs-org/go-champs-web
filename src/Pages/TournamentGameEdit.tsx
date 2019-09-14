import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { requestTournament } from '../Tournaments/actions';
import {
  patchTournamentGame,
  requestTournamentGame
} from '../Tournaments/Games/actions';
import Edit from '../Tournaments/Games/Edit';
import { TournamentGameState } from '../Tournaments/Games/state';
import { currentPhase } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGameEditMatch extends TournamentHomeMatchProps {
  tournamentGameId: string;
}

interface TournamentGameEditProps
  extends RouteComponentProps<TournamentGameEditMatch> {
  patchTournamentGame: any;
  phase: TournamentPhaseEntity;
  requestTournament: any;
  requestTournamentGame: any;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
  tournamentGameState: TournamentGameState;
  tournamentTeamState: TournamentTeamState;
}

class TournamentGameEdit extends React.Component<TournamentGameEditProps> {
  render() {
    const tournamentGame = this.props.tournamentGameState.tournamentGames[
      this.props.match.params.tournamentGameId
    ];
    return (
      <Edit
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        patchTournamentGame={this.props.patchTournamentGame}
        phase={this.props.phase}
        tournamentState={this.props.tournamentState}
        tournamentGame={tournamentGame}
        tournamentPhaseState={this.props.tournamentPhaseState}
        tournamentTeams={this.props.tournamentTeamState.tournamentTeams}
      />
    );
  }

  componentDidMount() {
    const tournamentId = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ].id;
    this.props.requestTournament(tournamentId);
    this.props.requestTournamentGame(
      tournamentId,
      this.props.match.params.tournamentGameId
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  phase: currentPhase(state),
  tournamentState: state.tournaments,
  tournamentGameState: state.tournamentGames,
  tournamentStatState: state.tournamentStats,
  tournamentTeamState: state.tournamentTeams
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      patchTournamentGame: patchTournamentGame(tournamentId),
      requestTournament,
      requestTournamentGame
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentGameEdit)
);
