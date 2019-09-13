import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import {
  deleteTournamentGame,
  requestTournamentGames
} from '../Tournaments/Games/actions';
import { TournamentGameState } from '../Tournaments/Games/state';
import { deleteTournamentGroup } from '../Tournaments/Groups/actions';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import Home from '../Tournaments/Home';
import { TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { deleteTournamentTeam } from '../Tournaments/Teams/actions';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentHomeProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentGame: any;
  deleteTournamentGroup: any;
  deleteTournamentTeam: any;
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

const mapStateToProps = (state: any) => ({
  tournamentPhaseState: state.tournamentPhases,
  tournamentState: state.tournaments,
  tournamentGameState: state.tournamentGames,
  tournamentGroupState: state.tournamentGroups,
  tournamentTeamState: state.tournamentTeams,
  tournamentStatState: state.tournamentStats
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  const phaseId = state.match.params.phaseId;
  return bindActionCreators(
    {
      deleteTournamentGame: deleteTournamentGame(tournamentId),
      deleteTournamentGroup: deleteTournamentGroup(tournamentId),
      deleteTournamentTeam: deleteTournamentTeam(tournamentId),
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
