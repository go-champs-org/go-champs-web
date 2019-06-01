import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import { TournamentState } from '../Tournaments/state';
import { patchTournamentTeam } from '../Tournaments/Teams/actions';
import Edit from '../Tournaments/Teams/Edit';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentTeamEditMatch extends TournamentHomeMatchProps {
  tournamentTeamId: string;
}

interface TournamentTeamEditProps
  extends RouteComponentProps<TournamentTeamEditMatch> {
  patchTournamentTeam: any;
  requestTournament: any;
  tournamentState: TournamentState;
  tournamentTeamState: TournamentTeamState;
}

class TournamentTeamEdit extends React.Component<TournamentTeamEditProps> {
  render() {
    const tournamentTeam = this.props.tournamentTeamState.tournamentTeams[
      this.props.match.params.tournamentTeamId
    ];
    return (
      <Edit
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentTeam={this.props.patchTournamentTeam}
        tournamentState={this.props.tournamentState}
        tournamentTeam={tournamentTeam}
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
  tournamentTeamState: state.tournamentTeams
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      patchTournamentTeam: patchTournamentTeam(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentTeamEdit)
);
