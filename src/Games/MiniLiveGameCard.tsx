import React, { useEffect, useState } from 'react';
import { GameEntity } from './state';
import { timeFromDate } from '../Shared/datetime/format';
import './MiniLiveGameCard.scss';
import { useTranslation } from 'react-i18next';
import scoreboardApiHttpClient from '../Shared/httpClient/scoreboardApiHttpClient';
import { teamScore } from '../Sports/Basketball5x5/scoreboardGameStateDataMappers';
import TeamAndScore from './TeamAndScore';

const POLLING_SCORES_INTERVAL = 10000; // 10 seconds

interface MiniLiveGameCardProps {
  game: GameEntity;
  baseUrl: string;
}

function MiniLiveGameCard({ game }: MiniLiveGameCardProps) {
  const { t } = useTranslation();
  const [teamScores, setTeamScores] = useState({
    awayScore: game.awayScore,
    homeScore: game.homeScore
  });

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const gameState = await scoreboardApiHttpClient.getGame(game.id);
        if (gameState) {
          const { away_team, home_team } = gameState;
          const awayScore = teamScore(away_team);
          const homeScore = teamScore(home_team);
          setTeamScores({ awayScore, homeScore });
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    const interval = setInterval(fetchGameState, POLLING_SCORES_INTERVAL);

    return () => clearInterval(interval);
  });

  return (
    <div className="card item">
      <div className="card-content">
        <div className="columns is-multiline is-mobile">
          <div className="column is-12 is-size-7 has-text-weight-bold">
            <div className="columns is-mobile">
              <div className="column is-8" style={{ padding: '.3rem' }}>
                <div className="time-and-live">
                  {game.datetime && (
                    <span className="time">{timeFromDate(game.datetime)}</span>
                  )}
                  <span className="live-indicator">
                    <div className="live-dot"></div>
                    <span className="live-text">
                      {t('uppercase', { uppercase: t('live') })}
                    </span>
                  </span>
                </div>
              </div>

              <div
                className="column is-4 has-text-right"
                style={{ padding: '.3rem' }}
              >
                {game.location}
              </div>
            </div>
          </div>

          <div className="column is-12">
            <TeamAndScore team={game.awayTeam} score={teamScores.awayScore} />
          </div>

          <div className="column is-12">
            <TeamAndScore team={game.homeTeam} score={teamScores.homeScore} />
          </div>
        </div>
      </div>

      {game.info && (
        <footer className="card-footer has-text-centered">
          <span className="card-footer-item has-text-centered is-paddingless is-size-7">
            {game.info}
          </span>
        </footer>
      )}
    </div>
  );
}

export default MiniLiveGameCard;
