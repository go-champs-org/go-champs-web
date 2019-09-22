import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
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
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';

interface PhaseHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  gameDates: string[];
  gamesByDate: { [date: string]: TournamentGameEntity[] };
  gamesInitialDatePosition: number;
  gamesLoading: boolean;
  phase: TournamentPhaseEntity | undefined;
}

const PhaseHome: React.FC<PhaseHomeProps> = ({
  gameDates,
  gamesByDate,
  gamesInitialDatePosition,
  gamesLoading,
  phase
}) => {
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

      <aside className="column is-4">
        {gamesLoading ? (
          <div>Loading...</div>
        ) : (
          <GameListByDate
            dates={gameDates}
            gamesByDate={gamesByDate}
            initialDatePosition={gamesInitialDatePosition}
          />
        )}
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
    phase: phaseById(state.tournamentPhases, phaseId)
  };
};

export default connect(mapStateToProps)(PhaseHome);
