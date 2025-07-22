import React, { useEffect, useRef } from 'react';
import { Trans } from 'react-i18next';
import { StatsLogRenderEntity } from '../PlayerStatsLog/View';
import { PlayersMap } from '../Players/state';
import { mapPlayerMapToPlayerDisplayName } from '../Players/dataMappers';
import { Link } from 'react-router-dom';

interface GameBoxScorePlayerRowProps {
  playerStatLog: StatsLogRenderEntity;
  players: PlayersMap;
  playerViewBasePath: string;
  statColumns: StatColumn[];
}

function GameBoxScorePlayerRow({
  playerStatLog,
  players,
  playerViewBasePath,
  statColumns
}: GameBoxScorePlayerRowProps): React.ReactElement {
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

      {statColumns.map(column => (
        <td
          key={column.id}
          className="has-text-centered"
          style={column.cellStyle}
        >
          {column.cell
            ? column.cell(playerStatLog)
            : playerStatLog.stats[column.id] || '-'}
        </td>
      ))}
    </tr>
  );
}

interface GameBoxScoreTeamRowProps {
  teamStatsLog: StatsLogRenderEntity;
  statColumns: StatColumn[];
}

function GameBoxScoreTeamRow({
  teamStatsLog,
  statColumns
}: GameBoxScoreTeamRowProps): React.ReactElement {
  return (
    <tr>
      <td className="player">
        <Trans>totals</Trans>
      </td>
      <td className="player-span"></td>
      {statColumns.map(column => (
        <td key={column.id} className="has-text-centered">
          {column.cell
            ? column.cell(teamStatsLog)
            : teamStatsLog.stats[column.id] || '-'}
        </td>
      ))}
    </tr>
  );
}

export interface StatColumn {
  id: string;
  header: string;
  cell: (statLog: StatsLogRenderEntity) => React.ReactElement;
  cellStyle?: React.CSSProperties;
  legend?: string;
}

interface GameBoxScoreTableProps {
  playersMap: PlayersMap;
  playerStatLogs: StatsLogRenderEntity[];
  playerViewBasePath: string;
  teamStatsLog: StatsLogRenderEntity;
  statColumns: StatColumn[];
  onHeaderClick?: (column: StatColumn) => void;
}

function GameBoxScoreTable({
  playerStatLogs,
  playersMap,
  playerViewBasePath,
  teamStatsLog,
  statColumns,
  onHeaderClick
}: GameBoxScoreTableProps): React.ReactElement {
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
        <table className="table is-fullwidth is-custom-striped is-narrow is-size-7-mobile">
          <thead>
            <tr>
              <th className="player">
                <Trans>player</Trans>
              </th>

              <th className="player-span"></th>

              {statColumns.map(column => (
                <th
                  key={column.id}
                  className="has-text-centered sortable"
                  onClick={() => onHeaderClick && onHeaderClick(column)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {playerStatLogs.map((playerStatLog: StatsLogRenderEntity) => (
              <GameBoxScorePlayerRow
                key={playerStatLog.playerId}
                playerStatLog={playerStatLog}
                players={playersMap}
                statColumns={statColumns}
                playerViewBasePath={playerViewBasePath}
              />
            ))}
            {teamStatsLog.id && (
              <GameBoxScoreTeamRow
                key={teamStatsLog.id}
                teamStatsLog={teamStatsLog}
                statColumns={statColumns}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameBoxScoreTable;
