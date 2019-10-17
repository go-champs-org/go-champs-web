import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { dateFromDate, timeFromDate } from '../Shared/datetime/format';
import { PhaseEliminationState } from '../Tournaments/state';
import { GameEntity, GameState } from './state';

const GameCard: React.FC<{
  onDeleteGame: any;
  url: string;
  tournamentGame: GameEntity;
}> = ({ onDeleteGame, url, tournamentGame }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${url}/PhaseGameEdit/${tournamentGame.id}`}
      >
        <div className="columns" style={{ flex: '1' }}>
          <div className="column is-4 has-text-centered">
            <span className="title is-6">
              {tournamentGame.awayTeam && tournamentGame.awayTeam.name}
            </span>
          </div>
          <div className="column is-2 has-text-centered">
            <span className="title is-7">{tournamentGame.awayScore}</span>
          </div>
          <div className="column is-2 has-text-centered">
            <span className="title is-7">{tournamentGame.homeScore}</span>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="title is-6">
              {tournamentGame.homeTeam && tournamentGame.homeTeam.name}
            </span>
          </div>
        </div>
      </Link>
      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => onDeleteGame(tournamentGame)}
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>

    <footer className="card-footer">
      <div className="columns is-mobile" style={{ flex: '1' }}>
        <div className="column is-6 has-text-centered">
          <span className="title is-7">
            {tournamentGame.datetime &&
              `${dateFromDate(tournamentGame.datetime)} : ${timeFromDate(
                tournamentGame.datetime
              )}`}
          </span>
        </div>
        <div className="column is-6 has-text-centered">
          <span className="title is-7">{tournamentGame.location}</span>
        </div>
      </div>
    </footer>
  </div>
);

const List: React.FC<{
  deleteGame: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  tournamentState: PhaseEliminationState;
  tournamentGameState: GameState;
  tournamentPhaseState: PhaseState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteGame,
  phase,
  tournamentState,
  tournamentGameState,
  tournamentPhaseState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Games</h2>
          </div>
          <div className="column is-4 has-text-right">
            <Link className="button" to={`./PhaseGameNew`}>
              New game
            </Link>
          </div>
        </div>
        {Object.keys(tournamentGameState.games).map((key: string) => (
          <GameCard
            key={key}
            url={baseTournamentUrl}
            tournamentGame={tournamentGameState.games[key]}
            onDeleteGame={deleteGame}
          />
        ))}
      </div>
    </div>
  );
};

export const Wrapper: React.FC<{
  deleteGame: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  tournamentPhaseState: PhaseState;
  tournamentState: PhaseEliminationState;
  tournamentGameState: GameState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteGame,
  phase,
  tournamentPhaseState,
  tournamentState,
  tournamentGameState
}) => {
  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deleteGame={deleteGame}
      phase={phase}
      tournamentPhaseState={tournamentPhaseState}
      tournamentState={tournamentState}
      tournamentGameState={tournamentGameState}
    />
  );
};

export default Wrapper;
