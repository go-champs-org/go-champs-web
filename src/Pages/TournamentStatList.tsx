import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import { TournamentState } from '../Tournaments/state';
import { deleteTournamentStat } from '../Tournaments/Stats/actions';
import List from '../Tournaments/Stats/List';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentStatListProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentStat: any;
  tournamentStatState: TournamentStatState;
  tournamentState: TournamentState;
  requestTournament: any;
}

class TournamentStatList extends React.Component<TournamentStatListProps> {
  render() {
    const {
      deleteTournamentStat,
      match,
      tournamentStatState,
      tournamentState
    } = this.props;

    return (
      <List
        currentOrganizationSlug={match.params.organizationSlug}
        currentTournamentSlug={match.params.tournamentSlug}
        deleteTournamentStat={deleteTournamentStat}
        tournamentStatState={tournamentStatState}
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
  tournamentStatState: state.tournamentStats
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      deleteTournamentStat: deleteTournamentStat(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentStatList)
);
