import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { isInProgressPhase } from '../Phases/selectors';
import { PhaseEntity } from '../Phases/state';
import { StoreState } from '../store';

interface PhaseDefaultRedirectProps extends RouteComponentProps {
  phase: PhaseEntity | undefined;
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
  phase: isInProgressPhase(state.phases)
});

export default connect(mapStateToProps)(PhaseDefaultRedirect);
