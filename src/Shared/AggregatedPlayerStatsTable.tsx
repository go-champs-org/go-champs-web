import React, { useEffect, useRef } from 'react';
import { Trans } from 'react-i18next';
import { PlayerStatsLogRenderEntity } from '../PlayerStatsLog/View';
import { PlayersMap } from '../Players/state';
import './AggregatedPlayerStatsTable.scss';
import { mapPlayerMapToPlayerDisplayName } from '../Players/dataMappers';

interface AggregatePlayerStatsRowProps {
  number: number;
  playerStatLog: PlayerStatsLogRenderEntity;
  players: PlayersMap;
  statColumns: StatColumn[];
}

function AggregatePlayerStatsRow({
  number,
  playerStatLog,
  players,
  statColumns
}: AggregatePlayerStatsRowProps): React.ReactElement {
  const playerName = mapPlayerMapToPlayerDisplayName(
    players,
    playerStatLog.playerId
  );
  const teamName = players[playerStatLog.playerId]
    ? players[playerStatLog.playerId].team.name
    : '';
  return (
    <tr>
      <td className="position">{number}</td>

      <td className="position-span"></td>

      <td className="player">{playerName}</td>

      <td className="player-span"></td>

      <td className="team has-text-centered">{teamName}</td>

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
  sortKey?: string;
  legend?: string;
}

interface AggregatePlayerStatsTableProps {
  onHeaderClick?: (sportKey: string) => void;
  statColumns: StatColumn[];
  players: PlayersMap;
  playerStatLogs: PlayerStatsLogRenderEntity[];
}

function AggregatePlayerStatsTable({
  playerStatLogs,
  players,
  statColumns,
  onHeaderClick
}: AggregatePlayerStatsTableProps): React.ReactElement {
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
    <div className="aggregated-player-stats-table container">
      <div className="table-container" ref={tableContainerRef}>
        <table className="table is-fullwidth is-custom-striped is-size-7-mobile">
          <thead>
            <tr>
              <th className="position">#</th>

              <th className="position-span"></th>

              <th className="player">
                <Trans>player</Trans>
              </th>

              <th className="player-span"></th>

              <th className="team has-text-centered">
                <Trans>team</Trans>
              </th>

              {statColumns.map(column => (
                <th
                  key={column.id}
                  className="has-text-centered sortable"
                  onClick={() =>
                    onHeaderClick && onHeaderClick(column.sortKey || '')
                  }
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {playerStatLogs.map(
              (playerStatLog: PlayerStatsLogRenderEntity, index: number) => (
                <AggregatePlayerStatsRow
                  number={index + 1}
                  key={playerStatLog.playerId}
                  playerStatLog={playerStatLog}
                  players={players}
                  statColumns={statColumns}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AggregatePlayerStatsTable;
