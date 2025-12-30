import React from 'react';
import { GameAssetEntity, GameEntity } from './state';
import { useTranslation } from 'react-i18next';
import Identifier from '../Teams/Indentifier';
import './Card.scss';
import { TeamEntity } from '../Teams/state';
import { StatsLogRenderEntity } from '../PlayerStatsLog/View';
import LiveIndicator from '../Shared/UI/LiveIndicator';
import { gameAssetOptionByValue } from './selectors';

const DEFAULT_ASSET_ICON_CLASS = 'fas fa-external-link-alt';

function Asset({ asset }: { asset: GameAssetEntity }) {
  const { t } = useTranslation();
  const assetTypeOption = gameAssetOptionByValue(asset.type);
  return (
    <a
      href={asset.url}
      target="_blank"
      rel="noopener noreferrer"
      className="button is-small"
    >
      <span className="icon is-small">
        <i
          className={
            assetTypeOption
              ? assetTypeOption.faIconClass
              : DEFAULT_ASSET_ICON_CLASS
          }
        ></i>
      </span>
      <span className="is-hidden-mobile">
        {t(assetTypeOption ? assetTypeOption.labelKey || '' : '', {
          keySeparator: '.'
        })}
      </span>
    </a>
  );
}

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

interface CardProps {
  game: GameEntity;
  homeTeamStats?: StatsLogRenderEntity | null;
  awayTeamStats?: StatsLogRenderEntity | null;
}

function Card({
  game,
  homeTeamStats,
  awayTeamStats
}: CardProps): React.ReactElement {
  const { t } = useTranslation();

  const getHomeScore = () => {
    if (
      game.liveState === 'in_progress' &&
      homeTeamStats &&
      homeTeamStats.stats &&
      homeTeamStats.stats.points
    ) {
      return homeTeamStats.stats.points;
    }
    return game.homeScore;
  };

  const getAwayScore = () => {
    if (
      game.liveState === 'in_progress' &&
      awayTeamStats &&
      awayTeamStats.stats &&
      awayTeamStats.stats.points
    ) {
      return awayTeamStats.stats.points;
    }
    return game.awayScore;
  };

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
                  <span className="title">{getHomeScore()}</span>
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
                  <span className="title">{getAwayScore()}</span>
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
              <span className="title is-size-5">{getHomeScore()}</span>
            </div>

            <div className="column is-8">
              <span className="title is-size-5">
                <Identifier team={game.awayTeam} />
              </span>
            </div>

            <div className="column is-4 has-text-right">
              <span className="title is-size-5">{getAwayScore()}</span>
            </div>
          </div>
        </div>

        <div className="column is-12">
          <div className="columns">
            <div className="column is-6-tablet is-full-mobile buttons has-text-centered-mobile">
              {game.assets.map(asset => (
                <Asset key={asset.id || asset.url} asset={asset} />
              ))}
            </div>
            {game.info && (
              <div className="column is-6-tablet is-full-mobile has-text-centered-mobile has-text-right-tablet">
                <small>{game.info}</small>
              </div>
            )}
          </div>
        </div>

        {game.liveState === 'in_progress' && (
          <div className="column is-12 has-text-centered">
            <LiveIndicator />
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
