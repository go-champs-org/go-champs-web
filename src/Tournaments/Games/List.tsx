import React from 'react';
import { Link } from 'react-router-dom';
import { dateFromDate, timeFromDate } from '../../Shared/datetime/format';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
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
        to={`${url}/TournamentGameEdit/${tournamentGame.id}`}
      >
        <div className="columns" style={{ flex: '1' }}>
          <div className="column is-4 has-text-centered">
            <span className="title is-6">
              {tournamentGame.game.awayTeamName}
            </span>
          </div>
          <div className="column is-2 has-text-centered">
            <span className="title is-7">{tournamentGame.game.awayScore}</span>
          </div>
          <div className="column is-2 has-text-centered">
            <span className="title is-7">{tournamentGame.game.homeScore}</span>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="title is-6">
              {tournamentGame.game.homeTeamName}
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
            {`${dateFromDate(tournamentGame.game.datetime)} : ${timeFromDate(
              tournamentGame.game.datetime
            )}`}
          </span>
        </div>
        <div className="column is-6 has-text-centered">
          <span className="title is-7">{tournamentGame.game.location}</span>
        </div>
      </div>
    </footer>
  </div>
);

const List: React.FC<{
  deleteTournamentGame: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  url: string;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGame,
  tournamentState,
  tournamentGameState,
  url
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Games</h2>
          </div>
          <div className="column is-4 has-text-right">
            <Link className="button" to={`./TournamentGameNew`}>
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

const Loading: React.FC = () => <div>Loading...</div>;

export const Wrapper: React.FC<{
  deleteTournamentGame: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  url: string;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGame,
  tournamentState,
  tournamentGameState,
  url
}) => {
  if (tournamentGameState.isLoadingRequestTournamentGames) {
    return <Loading />;
  }

  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deleteTournamentGame={deleteTournamentGame}
      tournamentState={tournamentState}
      tournamentGameState={tournamentGameState}
      url={url}
    />
  );
};

export default Wrapper;
