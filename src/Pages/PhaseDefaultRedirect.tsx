import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { StoreState } from '../store';
import { isInProgressPhase } from '../Tournaments/Phases/selectors';
import { TournamentPhaseEntity } from '../Tournaments/Phases/state';

interface PhaseDefaultRedirectProps extends RouteComponentProps {
  phase: TournamentPhaseEntity | undefined;
}

const PhaseDefaultRedirect: React.FC<PhaseDefaultRedirectProps> = ({
  match,
  phase
}) => {
  if (!phase) {
    return <Redirect to={`${match.url}/empty`} />;
  }
  return <Redirect to={`${match.url}/phase/${phase.id}`} />;
};

const mapStateToProps = (state: StoreState) => ({
  phase: isInProgressPhase(state.tournamentPhases)
});

export default connect(mapStateToProps)(PhaseDefaultRedirect);
