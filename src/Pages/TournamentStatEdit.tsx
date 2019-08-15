import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import { TournamentState } from '../Tournaments/state';
import { patchTournamentStat } from '../Tournaments/Stats/actions';
import Edit from '../Tournaments/Stats/Edit';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentStatEditMatch extends TournamentHomeMatchProps {
  tournamentStatId: string;
}

interface TournamentStatEditProps
  extends RouteComponentProps<TournamentStatEditMatch> {
  patchTournamentStat: any;
  requestTournament: any;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
}

class TournamentStatEdit extends React.Component<TournamentStatEditProps> {
  render() {
    const tournamentStat = this.props.tournamentStatState.tournamentStats[
      this.props.match.params.tournamentStatId
    ];
    return (
      <Edit
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentStat={this.props.patchTournamentStat}
        tournamentState={this.props.tournamentState}
        tournamentStat={tournamentStat}
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
  tournamentStatState: state.tournamentStats
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      patchTournamentStat: patchTournamentStat(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentStatEdit)
);
