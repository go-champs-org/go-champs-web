import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { TournamentState } from '../Tournaments/state';
import { postTournamentTeam } from '../Tournaments/Teams/actions';
import New from '../Tournaments/Teams/New';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentTeamNewProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  postTournamentTeam: any;
  tournamentState: TournamentState;
}

class TournamentTeamNew extends React.Component<TournamentTeamNewProps> {
  render() {
    return (
      <New
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentTeam={this.props.postTournamentTeam}
        tournamentState={this.props.tournamentState}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  tournamentState: state.tournaments
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      postTournamentTeam: postTournamentTeam(tournamentId)
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentTeamNew)
);
