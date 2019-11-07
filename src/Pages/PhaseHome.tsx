import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { allDraws } from '../Draws/selectors';
import { DrawEntity } from '../Draws/state';
import { default as DrawView } from '../Draws/View';
import { allElimination } from '../Eliminations/selectors';
import { EliminationEntity } from '../Eliminations/state';
import { default as EliminationView } from '../Eliminations/View';
import { default as GameListByDate } from '../Games/ListByDate';
import {
  gameDates,
  gamesByDate,
  gamesCloserGameDatePosition,
  gamesLoading
} from '../Games/selectors';
import { GameEntity } from '../Games/state';
import { allEliminationStats } from '../Phases/EliminationStats/selectors';
import { PhaseEliminationStatEntity } from '../Phases/EliminationStats/state';
import { phaseLoading, selectedPhase } from '../Phases/selectors';
import { PhaseEntity, PhaseTypes } from '../Phases/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { StoreState } from '../store';
import { TeamEntity } from '../Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';

interface PhaseHomeProps extends RouteComponentProps<TournamentHomeMatchProps> {
  gameDates: string[];
  gamesByDate: { [date: string]: GameEntity[] };
  gamesInitialDatePosition: number;
  gamesLoading: boolean;
  draws: DrawEntity[];
  phase: PhaseEntity | undefined;
  phaseLoading: boolean;
  eliminationStats: PhaseEliminationStatEntity[];
  eliminations: EliminationEntity[];
  teams: { [id: string]: TeamEntity };
}

const PhaseHome: React.FC<PhaseHomeProps> = ({
  gameDates,
  gamesByDate,
  gamesInitialDatePosition,
  gamesLoading,
  phase,
  phaseLoading,
  eliminationStats,
  draws,
  eliminations,
  teams
}) => {
  const MainContent =
    phase!.type === PhaseTypes.elimination ? (
      <EliminationView
        {...{
          eliminationStats,
          eliminations,
          teams
        }}
      />
    ) : (
      <DrawView {...{ draws }} />
    );

  return (
    <div className="columns is-multiline">
      <div className="column">{MainContent}</div>

      <div className="is-divider-vertical"></div>

      <aside className="column is-4">
        <ComponentLoader canRender={!gamesLoading} loader={'Loading'}>
          <GameListByDate
            dates={gameDates}
            gamesByDate={gamesByDate}
            initialDatePosition={gamesInitialDatePosition}
          />
        </ComponentLoader>
      </aside>
    </div>
  );
};

const mapStateToProps = (state: StoreState, props: PhaseHomeProps) => {
  return {
    gameDates: gameDates(state.games),
    gamesByDate: gamesByDate(state.games),
    gamesInitialDatePosition: gamesCloserGameDatePosition(state.games),
    gamesLoading: gamesLoading(state.games),
    phase: selectedPhase(state.phases),
    phaseLoading: phaseLoading(state.phases),
    eliminationStats: allEliminationStats(state.eliminationStats),
    draws: allDraws(state.draws),
    eliminations: allElimination(state.eliminations),
    teams: state.teams.teams
  };
};

export default connect(mapStateToProps)(PhaseHome);
