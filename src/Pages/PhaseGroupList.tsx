import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { requestTournament } from '../Tournaments/actions';
import { deleteTournamentGroup } from '../Tournaments/Groups/actions';
import List from '../Tournaments/Groups/List';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import { currentPhase } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface PhaseGroupListProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentGroup: any;
  phase: TournamentPhaseEntity;
  tournamentPhaseState: TournamentPhaseState;
  tournamentGroupState: TournamentGroupState;
  tournamentState: TournamentState;
  requestTournament: any;
}

class PhaseGroupList extends React.Component<PhaseGroupListProps> {
  render() {
    const {
      deleteTournamentGroup,
      match,
      phase,
      tournamentGroupState,
      tournamentPhaseState,
      tournamentState
    } = this.props;

    return (
      <List
        currentOrganizationSlug={match.params.organizationSlug}
        currentTournamentSlug={match.params.tournamentSlug}
        phase={phase}
        deleteTournamentGroup={deleteTournamentGroup}
        tournamentGroupState={tournamentGroupState}
        tournamentPhaseState={tournamentPhaseState}
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

const mapStateToProps = (state: StoreState) => ({
  phase: currentPhase(state),
  tournamentPhaseState: state.tournamentPhases,
  tournamentState: state.tournaments,
  tournamentGroupState: state.tournamentGroups
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      deleteTournamentGroup: deleteTournamentGroup(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhaseGroupList)
);
