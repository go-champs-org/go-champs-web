import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { allPhaseStandings } from '../Phases/Standings/selectors';
import { PhaseStandingsEntity } from '../Phases/Standings/state';
import { default as StandingsView } from '../Phases/Standings/View';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { StoreState } from '../store';
import { default as GameListByDate } from '../Tournaments/Games/ListByDate';
import {
  gameDates,
  gamesByDate,
  gamesCloserGameDatePosition,
  gamesLoading
} from '../Tournaments/Games/selectors';
import { TournamentGameEntity } from '../Tournaments/Games/state';
import { phaseById } from '../Tournaments/Phases/selectors';
import { PhaseTypes, TournamentPhaseEntity } from '../Tournaments/Phases/state';
import { allPhaseStats } from '../Tournaments/Stats/selectors';
import { TournamentStatEntity } from '../Tournaments/Stats/state';
import { TournamentTeamEntity } from '../Tournaments/Teams/state';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';

interface PhaseHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  gameDates: string[];
  gamesByDate: { [date: string]: TournamentGameEntity[] };
  gamesInitialDatePosition: number;
  gamesLoading: boolean;
  phase: TournamentPhaseEntity | undefined;
  phaseStats: TournamentStatEntity[];
  standings: PhaseStandingsEntity[];
  teams: { [id: string]: TournamentTeamEntity };
}

const PhaseHome: React.FC<PhaseHomeProps> = ({
  gameDates,
  gamesByDate,
  gamesInitialDatePosition,
  gamesLoading,
  phase,
  phaseStats,
  standings,
  teams
}) => {
  const MainContent =
    phase!.type === PhaseTypes.standings ? (
      <StandingsView
        {...{
          phaseStats,
          standings,
          teams
        }}
      />
    ) : (
      <div>Bracket view</div>
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
    standings: allPhaseStandings(state.phaseStandings),
    teams: state.tournamentTeams.tournamentTeams
  };
};

export default connect(mapStateToProps)(PhaseHome);
