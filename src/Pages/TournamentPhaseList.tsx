import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import {
  deleteTournamentPhase,
  patchTournamentPhase
} from '../Tournaments/Phases/actions';
import List from '../Tournaments/Phases/List';
import { TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentPhaseListProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentPhase: any;
  patchTournamentPhase: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  requestTournament: any;
}

class TournamentPhaseList extends React.Component<TournamentPhaseListProps> {
  render() {
    const {
      deleteTournamentPhase,
      patchTournamentPhase,
      match,
      tournamentPhaseState,
      tournamentState
    } = this.props;

    return (
      <List
        currentOrganizationSlug={match.params.organizationSlug}
        currentTournamentSlug={match.params.tournamentSlug}
        deleteTournamentPhase={deleteTournamentPhase}
        patchTournamentPhase={patchTournamentPhase}
        tournamentPhaseState={tournamentPhaseState}
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

const mapStateToProps = (state: any) => ({
  tournamentState: state.tournaments,
  tournamentPhaseState: state.tournamentPhases
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      deleteTournamentPhase: deleteTournamentPhase(tournamentId),
      patchTournamentPhase: patchTournamentPhase(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentPhaseList)
);
