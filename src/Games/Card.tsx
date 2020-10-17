import React from 'react';
import { GameEntity } from './state';

function Card({ game }: { game: GameEntity }): React.ReactElement {
  return (
    <div className="tile is-child box">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-6 has-text-left">
          <small>{game.datetime}</small>
        </div>

        <div className="column is-6 has-text-right">
          <small>{game.location}</small>
        </div>

        <div className="column is-5 has-text-right">
          <h2 className="title">{game.homeTeam.name}</h2>
        </div>

        <div className="column is-2 has-text-centered">
          <div className="columns is-vcentered is-gapless">
            <div className="column is-5 has-text-centered">
              <span className="title">{game.homeScore}</span>
            </div>

            <div className="column is-2">x</div>

            <div className="column is-5 has-text-centered">
              <span className="title">{game.awayScore}</span>
            </div>
          </div>
        </div>

        <div className="column is-5 has-text-left">
          <h2 className="title">{game.awayTeam.name}</h2>
        </div>

        <div className="column is-12 has-text-centered">
          <small>{game.info}</small>
        </div>
      </div>
    </div>
  );
}

export default Card;
