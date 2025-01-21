import React, { useState } from 'react';
import { PlayersMap } from '../Players/state';
import { PlayerStatsLogRenderEntity } from '../PlayerStatsLog/View';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { default as PlayerStatLogView } from '../PlayerStatsLog/View';

interface GeneralBoxScoreProps {
  playersMap: PlayersMap;
  playerStats: PlayerStatEntity[];
  playerStatsLogs: PlayerStatsLogRenderEntity[];
  teamName: string;
  tournament: TournamentEntity;
}

const byStatValue = (statId: string) => (
  playerStatsLogA: PlayerStatsLogRenderEntity,
  playerStatsLogB: PlayerStatsLogRenderEntity
) =>
  Number(playerStatsLogB.stats[statId]) - Number(playerStatsLogA.stats[statId]);

function GeneralBoxScore({
  playerStats,
  playerStatsLogs,
  playersMap,
  teamName,
  tournament
}: GeneralBoxScoreProps): React.ReactElement {
  const firstStatId = playerStats[0].id;
  const [statIdOrder, setStatIdOrder] = useState(firstStatId);
  const [isReverse, setIsReverse] = useState(false);
  const sortByStatId = byStatValue(statIdOrder);
  const sortedPlayerStatLogs = isReverse
    ? playerStatsLogs.sort(sortByStatId).reverse()
    : playerStatsLogs.sort(sortByStatId);

  const onHeaderClick = (playerStat: PlayerStatEntity) => {
    if (statIdOrder === playerStat.id) {
      setIsReverse(!isReverse);
    } else {
      setIsReverse(false);
    }
    setStatIdOrder(playerStat.id);
  };

  return (
    <div className="column is-12">
      <h2 className="subtitle">{teamName}</h2>

      <PlayerStatLogView
        onHeaderClick={onHeaderClick}
        playerStatLogs={sortedPlayerStatLogs}
        players={playersMap}
        playersStats={playerStats}
        tournament={tournament}
      />
    </div>
  );
}

export default GeneralBoxScore;
