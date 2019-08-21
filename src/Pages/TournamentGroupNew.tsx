import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { postTournamentGroup } from '../Tournaments/Groups/actions';
import New from '../Tournaments/Groups/New';
import { TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGroupNewProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  postTournamentGroup: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}

class TournamentGroupNew extends React.Component<TournamentGroupNewProps> {
  render() {
    return (
      <New
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentGroup={this.props.postTournamentGroup}
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
      postTournamentGroup: postTournamentGroup(tournamentId)
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    state => state,
    mapDispatchToProps
  )(TournamentGroupNew)
);
