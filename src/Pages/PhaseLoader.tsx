import React from 'react';
import { StoreState } from '../store';
import { currentPhaseId } from '../Phases/selectors';
import { tournamentLoading } from '../Tournaments/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getPhase } from '../Phases/effects';
import { getGamesByFilter } from '../Games/effects';
import { RouteProps } from './support/routerInterfaces';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import PhaseHome from './PhaseHome';

const mapStateToProps = (state: StoreState) => ({
  currentPhaseId: currentPhaseId(state.phases),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGamesByFilter,
      getPhase
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PhaseLoaderProps = ConnectedProps<typeof connector>;

const PhaseLoader: React.FC<PhaseLoaderProps &
  RouteComponentProps<RouteProps>> = props => {
  return (
    <ComponentLoader
      canRender={!props.tournamentLoading}
      loader={<div>Loading...</div>}
    >
      <PhaseHome
        phaseId={props.currentPhaseId}
        getGamesByFilter={props.getGamesByFilter}
        getPhase={props.getPhase}
      />
    </ComponentLoader>
  );
};

export default connector(PhaseLoader);
