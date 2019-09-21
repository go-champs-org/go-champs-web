import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { StoreState } from '../store';
import { isInProgressPhase } from '../Tournaments/Phases/selectors';
import { TournamentPhaseEntity } from '../Tournaments/Phases/state';

interface PhaseDefaultRedirectProps extends RouteComponentProps {
  phase: TournamentPhaseEntity | undefined;
}

class PhaseDefaultRedirect extends React.Component<PhaseDefaultRedirectProps> {
  render() {
    if (!this.props.phase) {
      return <Redirect to={`${this.props.match.url}/empty`} />;
    }
    return (
      <Redirect to={`${this.props.match.url}/phase/${this.props.phase.id}`} />
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  phase: isInProgressPhase(state.tournamentPhases)
});

export default connect(mapStateToProps)(PhaseDefaultRedirect);
