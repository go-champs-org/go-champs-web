import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { postTournamentGroup } from '../Tournaments/Groups/actions';
import New from '../Tournaments/Groups/New';
import { currentPhase } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface PhaseGroupNewProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  phase: TournamentPhaseEntity;
  postTournamentGroup: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}

class PhaseGroupNew extends React.Component<PhaseGroupNewProps> {
  render() {
    return (
      <New
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        phase={this.props.phase}
        postTournamentGroup={this.props.postTournamentGroup}
        tournamentPhaseState={this.props.tournamentPhaseState}
        tournamentState={this.props.tournamentState}
      />
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  phase: currentPhase(state)
});

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
    mapStateToProps,
    mapDispatchToProps
  )(PhaseGroupNew)
);
