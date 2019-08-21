import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { postTournamentStat } from '../Tournaments/Stats/actions';
import New from '../Tournaments/Stats/New';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentStatNewProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  postTournamentStat: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
}

class TournamentStatNew extends React.Component<TournamentStatNewProps> {
  render() {
    return (
      <New
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        postTournamentStat={this.props.postTournamentStat}
        tournamentPhaseState={this.props.tournamentPhaseState}
        tournamentState={this.props.tournamentState}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  tournamentPhaseState: state.tournamentPhases,
  tournamentState: state.tournaments,
  tournamentStatState: state.tournamentStats
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      postTournamentStat: postTournamentStat(tournamentId)
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentStatNew)
);
