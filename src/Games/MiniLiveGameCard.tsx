import React, { useEffect, useState } from 'react';
import { GameEntity } from './state';
import { timeFromDate } from '../Shared/datetime/format';
import './MiniLiveGameCard.scss';
import { useTranslation } from 'react-i18next';
import scoreboardApiHttpClient from '../Shared/httpClient/scoreboardApiHttpClient';
import {
  periodAndTime,
  teamScore
} from '../Sports/Basketball5x5/scoreboardGameStateDataMappers';
import TeamAndScore from './TeamAndScore';
import { MinutesCell } from '../Shared/UI/TableCells';
import LiveIndicator from '../Shared/UI/LiveIndicator';

const POLLING_SCORES_INTERVAL = 10000; // 10 seconds

interface MiniLiveGameCardProps {
  game: GameEntity;
  baseUrl: string;
}

function MiniLiveGameCard({ game }: MiniLiveGameCardProps) {
  const { t } = useTranslation();
  const [gameData, setGameData] = useState({
    awayScore: game.awayScore,
    homeScore: game.homeScore,
    period: 0,
    time: 0
  });

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const gameState = await scoreboardApiHttpClient.getGame(game.id);
        if (gameState) {
          const { away_team, home_team } = gameState;
          const awayScore = teamScore(away_team);
          const homeScore = teamScore(home_team);
          const { period, time } = periodAndTime(gameState.clock_state);
          setGameData({ awayScore, homeScore, period, time });
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    const interval = setInterval(fetchGameState, POLLING_SCORES_INTERVAL);

    fetchGameState(); // Fetch immediately on mount

    return () => clearInterval(interval);
  }, [game.id]);

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
                  <LiveIndicator />
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
            <TeamAndScore team={game.awayTeam} score={gameData.awayScore} />
          </div>

          <div className="column is-12">
            <TeamAndScore team={game.homeTeam} score={gameData.homeScore} />
          </div>

          <div className="column is-12 is-narrow has-text-centered">
            <span>
              {`Q${gameData.period} | `}
              <MinutesCell value={gameData.time.toString()} />
            </span>
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
