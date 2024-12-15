import React from 'react';
import { PlayersMap } from '../Players/state';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { Trans, useTranslation } from 'react-i18next';
import './View.scss';
import Shimmer from '../Shared/UI/Shimmer';

function LoadingCell({
  className,
  width
}: {
  className?: string;
  width?: number;
}) {
  return (
    <td className={className}>
      <Shimmer>
        <div
          style={{
            height: '10px',
            marginTop: '10px',
            width: width ? `${width}px` : '50px'
          }}
        ></div>
      </Shimmer>
    </td>
  );
}

export function ViewLoading() {
  return (
    <table className="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th style={{ paddingLeft: '0' }}>
            <Trans>player</Trans>
          </th>
          <th className="has-text-centered">
            <Shimmer>
              <div
                style={{
                  height: '10px',
                  marginTop: '10px',
                  width: '80px'
                }}
              ></div>
            </Shimmer>
          </th>
          <th className="has-text-centered">
            <Shimmer>
              <div
                style={{
                  height: '10px',
                  marginTop: '10px',
                  width: '70px'
                }}
              ></div>
            </Shimmer>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <LoadingCell width={120} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={70} />
        </tr>

        <tr>
          <LoadingCell width={100} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={50} />
        </tr>

        <tr>
          <LoadingCell width={110} />
          <LoadingCell className="has-text-centered" width={70} />
          <LoadingCell className="has-text-centered" width={50} />
        </tr>

        <tr>
          <LoadingCell width={120} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={70} />
        </tr>

        <tr>
          <LoadingCell width={100} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={50} />
        </tr>
      </tbody>
    </table>
  );
}

export interface PlayerStatsLogRenderEntity {
  id: string;
  playerId: string;
  stats: {
    [id: string]: string;
  };
}

interface PlayerStatsLogRowProps {
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  playerStatLog: PlayerStatsLogRenderEntity;
}

function PlayerStatsLogRow({
  players,
  playersStats,
  playerStatLog
}: PlayerStatsLogRowProps): React.ReactElement {
  return (
    <tr>
      <td className="player">
        {players[playerStatLog.playerId] &&
          players[playerStatLog.playerId].name}
      </td>

      <td style={{ minWidth: '150px' }}></td>

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
  onHeaderClick?: (playerStat: PlayerStatEntity) => void;
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
            onHeaderClick(playetStatLog);
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

interface ViewProps {
  onHeaderClick?: (playerStat: PlayerStatEntity) => void;
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  playerStatLogs: PlayerStatsLogRenderEntity[];
  tournament: TournamentEntity;
}

function View({
  onHeaderClick,
  players,
  playersStats,
  playerStatLogs,
  tournament
}: ViewProps): React.ReactElement {
  return (
    <div className="container">
      <div className="table-container">
        <table className="table is-fullwidth is-custom-striped is-hoverable">
          <thead>
            <tr>
              <th className="player">
                <Trans>player</Trans>
              </th>

              <th style={{ minWidth: '150px' }}></th>

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
            {playerStatLogs.map((playerStatLog: PlayerStatsLogRenderEntity) => (
              <PlayerStatsLogRow
                playerStatLog={playerStatLog}
                players={players}
                playersStats={playersStats}
                key={playerStatLog.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
