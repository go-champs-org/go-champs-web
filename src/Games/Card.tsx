import React from 'react';
import { GameEntity } from './state';
import { useTranslation } from 'react-i18next';

function Card({ game }: { game: GameEntity }): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="tile is-child box">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-6 has-text-left notranslate">
          <small>{t('dateTime', { date: game.datetime })}</small>
        </div>

        <div className="column is-6 has-text-right">
          <small>{game.location}</small>
        </div>

        <div className="column is-12 is-hidden-mobile">
          <div className="columns">
            <div className="column is-5 has-text-right">
              <h2 className="title">{game.homeTeam.name}</h2>
            </div>

            <div className="column is-2 has-text-centered">
              <div className="columns is-vcentered is-gapless">
                <div className="column is-5 has-text-centered">
                  <span className="title">{game.homeScore}</span>
                </div>

                <div className="column is-2 has-text-centered">
                  <span
                    className="icon is-small"
                    style={{ paddingTop: '.8rem' }}
                  >
                    <i className="fas fa-times"></i>
                  </span>
                </div>

                <div className="column is-5 has-text-centered">
                  <span className="title">{game.awayScore}</span>
                </div>
              </div>
            </div>

            <div className="column is-5 has-text-left">
              <h2 className="title">{game.awayTeam.name}</h2>
            </div>
          </div>
        </div>

        <div className="column is-12 is-hidden-tablet">
          <div className="columns is-mobile is-multiline">
            <div className="column is-8">
              <span className="title is-size-5">{game.homeTeam.name}</span>
            </div>

            <div className="column is-4 has-text-right">
              <span className="title is-size-5">{game.homeScore}</span>
            </div>

            <div className="column is-8">
              <span className="title is-size-5">{game.awayTeam.name}</span>
            </div>

            <div className="column is-4 has-text-right">
              <span className="title is-size-5">{game.awayScore}</span>
            </div>
          </div>
        </div>

        <div className="column is-12 has-text-centered">
          <small>{game.info}</small>
        </div>
      </div>
    </div>
  );
}

export default Card;
