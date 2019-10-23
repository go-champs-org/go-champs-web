import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { isInProgressPhase } from '../Phases/selectors';
import { PhaseEntity } from '../Phases/state';
import { StoreState } from '../store';
import PhaseSelectedHome from './PhaseSelectedHome';

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
  return (
    <Route
      path={`/:organizationSlug/:tournamentSlug`}
      component={PhaseSelectedHome}
    />
  );
};

const mapStateToProps = (state: StoreState) => ({
  phase: isInProgressPhase(state.phases)
});

export default connect(mapStateToProps)(PhaseDefaultRedirect);
