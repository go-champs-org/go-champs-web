import React, { useState } from 'react';
import { PlayersMap } from '../Players/state';
import { StatsLogRenderEntity } from '../PlayerStatsLog/View';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { default as PlayerStatLogView } from '../PlayerStatsLog/View';

interface GeneralBoxScoreProps {
  playersMap: PlayersMap;
  playerStats: PlayerStatEntity[];
  playerStatsLogs: StatsLogRenderEntity[];
  playerViewBasePath: string;
  teamName: string;
  tournament: TournamentEntity;
}

const byStatValue = (statId: string) => (
  playerStatsLogA: StatsLogRenderEntity,
  playerStatsLogB: StatsLogRenderEntity
) =>
  Number(playerStatsLogB.stats[statId]) - Number(playerStatsLogA.stats[statId]);

function GeneralBoxScore({
  playerStats,
  playerStatsLogs,
  playersMap,
  playerViewBasePath,
  teamName,
  tournament
}: GeneralBoxScoreProps): React.ReactElement {
  const firstStatId = playerStats.length > 0 ? playerStats[0].id : '';
  const [statIdOrder, setStatIdOrder] = useState(firstStatId);
  const [isReverse, setIsReverse] = useState(false);
  const sortByStatId = byStatValue(statIdOrder);
  const sortedPlayerStatLogs = isReverse
    ? playerStatsLogs.sort(sortByStatId).reverse()
    : playerStatsLogs.sort(sortByStatId);

  const onHeaderClick = (sortKey: string) => {
    if (statIdOrder === sortKey) {
      setIsReverse(!isReverse);
    } else {
      setIsReverse(false);
    }
    setStatIdOrder(sortKey);
  };

  return (
    <div className="column is-12">
      <h2 className="subtitle">{teamName}</h2>

      <PlayerStatLogView
        onHeaderClick={onHeaderClick}
        playerStatLogs={sortedPlayerStatLogs}
        players={playersMap}
        playersStats={playerStats}
        playerViewBasePath={playerViewBasePath}
        tournament={tournament}
        scope="aggregate"
      />
    </div>
  );
}

export default GeneralBoxScore;
