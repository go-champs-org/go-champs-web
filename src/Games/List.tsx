import React from 'react';
import { Link } from 'react-router-dom';
import { dateFromDate, timeFromDate } from '../Shared/datetime/format';
import { GameEntity } from './state';
import { Dispatch, AnyAction } from 'redux';
import Shimmer from '../Shared/UI/Shimmer';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';

const LoadingCard: React.FC = () => (
  <div className="card item">
    <div className="card-header">
      <div className="card-header-title">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </div>
);

export const ListLoading: React.FC = () => (
  <div>
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
);

const GameCard: React.FC<{
  onDeleteGame: any;
  url: string;
  game: GameEntity;
}> = ({ onDeleteGame, url, game }) => (
  <div className="card item">
    <div className="card-header">
      <Link className="card-header-title" to={url}>
        <div className="columns" style={{ flex: '1' }}>
          <div className="column is-4 has-text-centered">
            <span className="title is-6">
              {game.awayTeam && game.awayTeam.name}
            </span>
          </div>
          <div className="column is-2 has-text-centered">
            <span className="title is-7">{game.awayScore}</span>
          </div>
          <div className="column is-2 has-text-centered">
            <span className="title is-7">{game.homeScore}</span>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="title is-6">
              {game.homeTeam && game.homeTeam.name}
            </span>
          </div>
        </div>
      </Link>
      <div className="card-header-icon">
        <DoubleClickButton
          className="button is-text"
          onClick={() => onDeleteGame(game)}
        >
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>

    <footer className="card-footer">
      <div className="columns is-mobile" style={{ flex: '1' }}>
        <div className="column is-6 has-text-centered">
          <span className="title is-7">
            {game.datetime &&
              `${dateFromDate(game.datetime)} : ${timeFromDate(game.datetime)}`}
          </span>
        </div>
        <div className="column is-6 has-text-centered">
          <span className="title is-7">{game.location}</span>
        </div>
      </div>
    </footer>
  </div>
);

const List: React.FC<{
  baseUrl: string;
  deleteGame: (
    game: GameEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  games: GameEntity[];
}> = ({ baseUrl, deleteGame, games }) => {
  return (
    <div>
      {games.map((game: GameEntity) => (
        <GameCard
          key={game.id}
          url={`${baseUrl}/EditGame/${game.id}`}
          game={game}
          onDeleteGame={deleteGame}
        />
      ))}
    </div>
  );
};

export default List;
