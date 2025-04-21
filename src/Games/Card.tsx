import React from 'react';
import { GameEntity } from './state';
import { useTranslation } from 'react-i18next';
import Identifier from '../Teams/Indentifier';
import './Card.scss';
import { TeamEntity } from '../Teams/state';

function Team({
  team,
  isHomeTeam = false
}: {
  team: TeamEntity;
  isHomeTeam?: boolean;
}) {
  return (
    <div
      className={
        `team-container columns is-vcentered` +
        (isHomeTeam ? ' is-reverse' : '')
      }
    >
      {team.logoUrl && (
        <div className="column is-2">
          <img src={team.logoUrl} alt={team.name} className="logo" />
        </div>
      )}
      <div className="column">
        <h2 className="title">{team.name}</h2>
      </div>
    </div>
  );
}

function Card({ game }: { game: GameEntity }): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="tile is-child box game-card">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-6 has-text-left notranslate">
          <small>{t('dateTime', { date: game.datetime })}</small>
        </div>

        <div className="column is-6 has-text-right">
          <small>{game.location}</small>
        </div>

        <div className="column is-12 is-hidden-mobile">
          <div className="columns is-vcentered">
            <div className="column is-5 has-text-right">
              <Team team={game.homeTeam} isHomeTeam />
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
              <Team team={game.awayTeam} />
            </div>
          </div>
        </div>

        <div className="column is-12 is-hidden-tablet">
          <div className="columns is-mobile is-multiline">
            <div className="column is-8">
              <span className="title is-size-5">
                <Identifier team={game.homeTeam} />
              </span>
            </div>

            <div className="column is-4 has-text-right">
              <span className="title is-size-5">{game.homeScore}</span>
            </div>

            <div className="column is-8">
              <span className="title is-size-5">
                <Identifier team={game.awayTeam} />
              </span>
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
