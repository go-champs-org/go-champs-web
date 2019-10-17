import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { allDraws } from '../Draws/selectors';
import { DrawEntity } from '../Draws/state';
import { default as BracketView } from '../Draws/View';
import { allElimination } from '../Eliminations/selectors';
import { EliminationEntity } from '../Eliminations/state';
import { default as StandingsView } from '../Eliminations/View';
import { default as GameListByDate } from '../Games/ListByDate';
import {
  gameDates,
  gamesByDate,
  gamesCloserGameDatePosition,
  gamesLoading
} from '../Games/selectors';
import { TournamentGameEntity } from '../Games/state';
import { phaseById } from '../Phases/selectors';
import { PhaseTypes, TournamentPhaseEntity } from '../Phases/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { StoreState } from '../store';
import { TournamentTeamEntity } from '../Teams/state';
import { allPhaseStats } from '../Tournaments/Stats/selectors';
import { TournamentStatEntity } from '../Tournaments/Stats/state';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';

interface PhaseHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  gameDates: string[];
  gamesByDate: { [date: string]: TournamentGameEntity[] };
  gamesInitialDatePosition: number;
  gamesLoading: boolean;
  draws: DrawEntity[];
  phase: TournamentPhaseEntity | undefined;
  phaseStats: TournamentStatEntity[];
  eliminations: EliminationEntity[];
  teams: { [id: string]: TournamentTeamEntity };
}

const PhaseHome: React.FC<PhaseHomeProps> = ({
  gameDates,
  gamesByDate,
  gamesInitialDatePosition,
  gamesLoading,
  phase,
  phaseStats,
  draws,
  eliminations,
  teams
}) => {
  const MainContent =
    phase!.type === PhaseTypes.elimination ? (
      <StandingsView
        {...{
          phaseStats,
          eliminations,
          teams
        }}
      />
    ) : (
      <BracketView {...{ draws }} />
    );

  return (
    <div className="columns is-multiline">
      <div className="column">{MainContent}</div>

      <div className="is-divider-vertical"></div>

      <aside className="column is-4">
        <ComponentLoader canRender={!gamesLoading}>
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
  const {
    match: {
      params: { phaseId }
    }
  } = props;
  return {
    gameDates: gameDates(state.tournamentGames),
    gamesByDate: gamesByDate(state.tournamentGames),
    gamesInitialDatePosition: gamesCloserGameDatePosition(
      state.tournamentGames
    ),
    gamesLoading: gamesLoading(state.tournamentGames),
    phase: phaseById(state.tournamentPhases, phaseId),
    phaseStats: allPhaseStats(state.tournamentStats),
    draws: allDraws(state.draws),
    eliminations: allElimination(state.eliminations),
    teams: state.tournamentTeams.tournamentTeams
  };
};

export default connect(mapStateToProps)(PhaseHome);
