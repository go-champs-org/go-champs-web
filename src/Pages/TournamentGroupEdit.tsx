import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import { patchTournamentGroup } from '../Tournaments/Groups/actions';
import Edit from '../Tournaments/Groups/Edit';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGroupEditMatch extends TournamentHomeMatchProps {
  tournamentGroupId: string;
}

interface TournamentGroupEditProps
  extends RouteComponentProps<TournamentGroupEditMatch> {
  patchTournamentGroup: any;
  requestTournament: any;
  tournamentState: TournamentState;
  tournamentGroupState: TournamentGroupState;
}

class TournamentGroupEdit extends React.Component<TournamentGroupEditProps> {
  render() {
    const tournamentGroup = this.props.tournamentGroupState.tournamentGroups[
      this.props.match.params.tournamentGroupId
    ];
    return (
      <Edit
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentGroup={this.props.patchTournamentGroup}
        tournamentState={this.props.tournamentState}
        tournamentGroup={tournamentGroup}
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
  tournamentGroupState: state.tournamentGroups
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      patchTournamentGroup: patchTournamentGroup(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentGroupEdit)
);
