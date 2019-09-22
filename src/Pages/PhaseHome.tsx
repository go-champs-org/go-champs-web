import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { StoreState } from '../store';
import { phaseById } from '../Tournaments/Phases/selectors';
import { PhaseTypes, TournamentPhaseEntity } from '../Tournaments/Phases/state';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';

interface PhaseHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  phase: TournamentPhaseEntity | undefined;
}

const PhaseHome: React.FC<PhaseHomeProps> = ({ phase }) => {
  const MainContent =
    phase!.type === PhaseTypes.standings ? (
      <div>Standing view</div>
    ) : (
      <div>Bracket view</div>
    );

  return (
    <div className="columns is-multiline">
      <div className="column">{MainContent}</div>

      <div className="is-divider-vertical"></div>

      <aside className="column is-4">Games by date</aside>
    </div>
  );
};

const mapStateToProps = (state: StoreState, props: PhaseHomeProps) => {
  const {
    match: {
      params: { phaseId }
    }
  } = props;
  return {
    phase: phaseById(state.tournamentPhases, phaseId)
  };
};

export default connect(mapStateToProps)(PhaseHome);
