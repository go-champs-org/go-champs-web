import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import { TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { postTournamentTeam } from '../Tournaments/Teams/actions';
import New from '../Tournaments/Teams/New';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentTeamNewProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  postTournamentTeam: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentGroupState: TournamentGroupState;
}

class TournamentTeamNew extends React.Component<TournamentTeamNewProps> {
  render() {
    return (
      <New
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentTeam={this.props.postTournamentTeam}
        tournamentPhaseState={this.props.tournamentPhaseState}
        tournamentState={this.props.tournamentState}
        tournamentGroups={this.props.tournamentGroupState.tournamentGroups}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  tournamentPhaseState: state.tournamentPhases,
  tournamentState: state.tournaments,
  tournamentGroupState: state.tournamentGroups
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
