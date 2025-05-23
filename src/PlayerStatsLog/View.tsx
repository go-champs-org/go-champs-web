import React, { useEffect, useRef } from 'react';
import { PlayersMap } from '../Players/state';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { Trans, useTranslation } from 'react-i18next';
import './View.scss';
import { AggregatedPlayerStatsTableViewerProps } from '../AggregatedPlayerStats/AggregatedPlayerStatsTableViewer';
import { mapPlayerMapToPlayerDisplayName } from '../Players/dataMappers';
import { Link } from 'react-router-dom';

export interface StatsLogRenderEntity {
  id: string;
  playerId?: string;
  teamId?: string;
  stats: {
    [id: string]: string;
  };
}

interface PlayerStatsLogRowProps {
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  playerStatLog: StatsLogRenderEntity;
  playerViewBasePath: string;
}

function PlayerStatsLogRow({
  players,
  playersStats,
  playerStatLog,
  playerViewBasePath
}: PlayerStatsLogRowProps): React.ReactElement {
  const playerName = mapPlayerMapToPlayerDisplayName(
    players,
    playerStatLog.playerId
  );
  return (
    <tr>
      <td className="player">
        <Link to={`${playerViewBasePath}${playerStatLog.playerId}`}>
          {playerName}
        </Link>
      </td>

      <td className="player-span"></td>

      {playersStats.map((playerStat: PlayerStatEntity) => (
        <td
          key={playerStat.id}
          className="has-text-centered"
          style={{ minWidth: '50px' }}
        >
          {playerStatLog.stats[playerStat.slug || playerStat.id]}
        </td>
      ))}
    </tr>
  );
}

const PlayerStatLogHeader: React.FC<{
  onHeaderClick?: (sortKey: string) => void;
  playetStatLog: PlayerStatEntity;
  tournament: TournamentEntity;
}> = ({ onHeaderClick, playetStatLog, tournament }) => {
  const { t } = useTranslation();
  const headerContent = t(
    `sports.${tournament.sportSlug}.statistics.${playetStatLog.slug}.abbreviation`,
    {
      keySeparator: '.',
      defaultValue: playetStatLog.title
    }
  );

  return (
    <th className="has-text-centered">
      {onHeaderClick ? (
        <a
          className="has-text-info clickable-header"
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            onHeaderClick(playetStatLog.slug || playetStatLog.id);
          }}
        >
          {headerContent}
        </a>
      ) : (
        headerContent
      )}
    </th>
  );
};

function View({
  onHeaderClick,
  players,
  playersStats,
  playerStatLogs,
  playerViewBasePath,
  tournament
}: AggregatedPlayerStatsTableViewerProps): React.ReactElement {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        if (tableContainerRef.current.scrollLeft > 0) {
          tableContainerRef.current.classList.add('is-scrolling');
        } else {
          tableContainerRef.current.classList.remove('is-scrolling');
        }
      }
    };

    const tableContainerElem = tableContainerRef.current;
    if (tableContainerElem) {
      tableContainerElem.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainerElem) {
        tableContainerElem.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="table-container" ref={tableContainerRef}>
        <table className="table is-fullwidth is-custom-striped is-size-7-mobile">
          <thead>
            <tr>
              <th className="player">
                <Trans>player</Trans>
              </th>

              <th className="player-span"></th>

              {playersStats.map((stat: PlayerStatEntity) => (
                <PlayerStatLogHeader
                  key={stat.id}
                  playetStatLog={stat}
                  onHeaderClick={onHeaderClick}
                  tournament={tournament}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {playerStatLogs.map((playerStatLog: StatsLogRenderEntity) => (
              <PlayerStatsLogRow
                playerStatLog={playerStatLog}
                players={players}
                playersStats={playersStats}
                key={playerStatLog.id}
                playerViewBasePath={playerViewBasePath}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
