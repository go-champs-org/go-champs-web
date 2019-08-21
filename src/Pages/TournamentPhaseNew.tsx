import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postTournamentPhase } from '../Tournaments/Phases/actions';
import New from '../Tournaments/Phases/New';
import { TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentPhaseNewProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  postTournamentPhase: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}

class TournamentPhaseNew extends React.Component<TournamentPhaseNewProps> {
  render() {
    return (
      <New
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentPhase={this.props.postTournamentPhase}
        tournamentPhaseState={this.props.tournamentPhaseState}
        tournamentState={this.props.tournamentState}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      postTournamentPhase: postTournamentPhase(tournamentId)
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    state => state,
    mapDispatchToProps
  )(TournamentPhaseNew)
);
