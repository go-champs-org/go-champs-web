import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postTournamentGame } from '../Tournaments/Games/actions';
import New from '../Tournaments/Games/New';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGameNewProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  postTournamentGame: any;
  tournamentState: TournamentState;
}

class TournamentGameNew extends React.Component<TournamentGameNewProps> {
  render() {
    return (
      <New
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentGame={this.props.postTournamentGame}
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
      postTournamentGame: postTournamentGame(tournamentId)
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    state => state,
    mapDispatchToProps
  )(TournamentGameNew)
);