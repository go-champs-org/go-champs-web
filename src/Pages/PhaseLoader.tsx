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

type PhaseLoaderProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const PhaseLoader: React.FC<PhaseLoaderProps> = ({
  currentPhaseId,
  match,
  getGamesByFilter,
  getPhase,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <ComponentLoader
      canRender={!tournamentLoading}
      loader={<div>Loading...</div>}
    >
      <PhaseHome
        organizationSlug={organizationSlug}
        phaseId={currentPhaseId}
        getGamesByFilter={getGamesByFilter}
        getPhase={getPhase}
        tournamentSlug={tournamentSlug}
      />
    </ComponentLoader>
  );
};

export default connector(PhaseLoader);
