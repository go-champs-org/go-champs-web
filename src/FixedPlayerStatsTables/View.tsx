import React from 'react';
import {
  FixedPlayerStatsTableEntity,
  FixedPlayerStatsRecordEntity
} from './state';
import { PlayerStatMap } from '../Tournaments/state';
import { PlayersMap } from '../Players/state';
import { Trans } from 'react-i18next';
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

export function FixedPlayerStatsLoading() {
  return (
    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12 has-text-centered">
          <Shimmer>
            <div
              style={{
                height: '10px',
                marginTop: '10px',
                width: '120px'
              }}
            ></div>
          </Shimmer>
        </div>
        <div className="column is-12">
          <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th style={{ paddingLeft: '0' }}>
                  <Trans>player</Trans>
                </th>
                <th className="has-text-centered">
                  <Trans>value</Trans>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <LoadingCell width={120} />
                <LoadingCell className="has-text-centered" width={60} />
              </tr>

              <tr>
                <LoadingCell width={100} />
                <LoadingCell className="has-text-centered" width={50} />
              </tr>

              <tr>
                <LoadingCell width={110} />
                <LoadingCell className="has-text-centered" width={70} />
              </tr>

              <tr>
                <LoadingCell width={120} />
                <LoadingCell className="has-text-centered" width={60} />
              </tr>

              <tr>
                <LoadingCell width={100} />
                <LoadingCell className="has-text-centered" width={60} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ViewLoading() {
  return (
    <div className="columns is-multiline">
      <FixedPlayerStatsLoading />
      <FixedPlayerStatsLoading />
      <FixedPlayerStatsLoading />
    </div>
  );
}

interface FixedPlayerStatsViewProps {
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity;
  playersMap: PlayersMap;
  playerStatsMap: PlayerStatMap;
}

function FixedPlayerStatsView({
  fixedPlayerStatsTable,
  playersMap,
  playerStatsMap
}: FixedPlayerStatsViewProps): React.ReactElement {
  return (
    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12 has-text-centered">
          <span className="subtitle">
            {playerStatsMap[fixedPlayerStatsTable.statId]
              ? playerStatsMap[fixedPlayerStatsTable.statId].title
              : ''}
          </span>
        </div>

        <div className="column is-12">
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '0' }}>
                    <Trans>player</Trans>
                  </th>

                  <th className="has-text-centered">
                    <Trans>value</Trans>
                  </th>
                </tr>
              </thead>

              <tbody>
                {fixedPlayerStatsTable.playerStats.map(
                  (playerStat: FixedPlayerStatsRecordEntity) => (
                    <tr>
                      <td style={{ paddingLeft: '0' }}>
                        {playersMap[playerStat.playerId]
                          ? playersMap[playerStat.playerId].name
                          : ''}
                      </td>

                      <td className="has-text-centered">{playerStat.value}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ViewProps {
  fixedPlayerStatsTables: FixedPlayerStatsTableEntity[];
  playersMap: PlayersMap;
  playerStatsMap: PlayerStatMap;
}

function View({
  fixedPlayerStatsTables,
  playersMap,
  playerStatsMap
}: ViewProps): React.ReactElement {
  return (
    <div className="columns is-multiline">
      {fixedPlayerStatsTables.map(
        (fixedPlayerStatsTable: FixedPlayerStatsTableEntity) => (
          <FixedPlayerStatsView
            fixedPlayerStatsTable={fixedPlayerStatsTable}
            playersMap={playersMap}
            playerStatsMap={playerStatsMap}
          />
        )
      )}
    </div>
  );
}

export default View;
