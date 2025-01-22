import React, { useEffect, useRef } from 'react';
import { Trans } from 'react-i18next';
import { PlayerStatsLogRenderEntity } from '../PlayerStatsLog/View';
import { PlayersMap } from '../Players/state';

interface GameBoxScoreRowProps {
  playerStatLog: PlayerStatsLogRenderEntity;
  players: PlayersMap;
  statColumns: StatColumn[];
}

function GameBoxScoreRow({
  playerStatLog,
  players,
  statColumns
}: GameBoxScoreRowProps): React.ReactElement {
  const playerName = players[playerStatLog.playerId]
    ? players[playerStatLog.playerId].shirtName ||
      players[playerStatLog.playerId].name
    : '';
  return (
    <tr>
      <td className="player">{playerName}</td>

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

export interface StatColumn {
  id: string;
  header: string;
  cell: (playerStatLog: PlayerStatsLogRenderEntity) => React.ReactElement;
  cellStyle?: React.CSSProperties;
  legend?: string;
}

interface GameBoxScoreTableProps {
  onHeaderClick?: (column: StatColumn) => void;
  statColumns: StatColumn[];
  playersMap: PlayersMap;
  playerStatLogs: PlayerStatsLogRenderEntity[];
}

function GameBoxScoreTable({
  onHeaderClick,
  statColumns,
  playerStatLogs,
  playersMap
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
        <table className="table is-fullwidth is-custom-striped is-size-7-mobile">
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
            {playerStatLogs.map((playerStatLog: PlayerStatsLogRenderEntity) => (
              <GameBoxScoreRow
                key={playerStatLog.playerId}
                playerStatLog={playerStatLog}
                players={playersMap}
                statColumns={statColumns}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameBoxScoreTable;
