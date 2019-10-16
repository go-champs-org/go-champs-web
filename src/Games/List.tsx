import React from 'react';
import { Link } from 'react-router-dom';
import { dateFromDate, timeFromDate } from '../Shared/datetime/format';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentGameEntity, TournamentGameState } from './state';

const TournamentGameCard: React.FC<{
  onDeleteTournamentGame: any;
  url: string;
  tournamentGame: TournamentGameEntity;
}> = ({ onDeleteTournamentGame, url, tournamentGame }) => (
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
          onClick={() => onDeleteTournamentGame(tournamentGame)}
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
  deleteTournamentGame: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  tournamentPhaseState: TournamentPhaseState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGame,
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
          {Object.keys(tournamentGameState.tournamentGames).map((key: string) => (
            <TournamentGameCard
              key={key}
              url={baseTournamentUrl}
              tournamentGame={tournamentGameState.tournamentGames[key]}
              onDeleteTournamentGame={deleteTournamentGame}
            />
          ))}
        </div>
      </div>
    );
  };

export const Wrapper: React.FC<{
  deleteTournamentGame: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGame,
  phase,
  tournamentPhaseState,
  tournamentState,
  tournamentGameState
}) => {
    return (
      <List
        currentOrganizationSlug={currentOrganizationSlug}
        currentTournamentSlug={currentTournamentSlug}
        deleteTournamentGame={deleteTournamentGame}
        phase={phase}
        tournamentPhaseState={tournamentPhaseState}
        tournamentState={tournamentState}
        tournamentGameState={tournamentGameState}
      />
    );
  };

export default Wrapper;
