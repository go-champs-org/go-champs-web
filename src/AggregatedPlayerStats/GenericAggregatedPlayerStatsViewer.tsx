import React from 'react';

import AggregatedStats, {
  AggregatedPlayerStatsViewerProps
} from '../Players/AggregatedStats';
import { useTranslation } from 'react-i18next';

function GenericAggregatedPlayerStatsViewer({
  aggregatedPlayerStats,
  playerStats,
  tournament
}: AggregatedPlayerStatsViewerProps) {
  const { t } = useTranslation();
  const displayStats = playerStats.map(playerStat => {
    const label = t(
      `sports.${tournament.sportSlug}.statistics.${playerStat.slug}.abbreviation`,
      {
        keySeparator: '.',
        defaultValue: playerStat.title
      }
    );
    return {
      label,
      value: aggregatedPlayerStats.stats[playerStat.slug || playerStat.id]
    };
  });
  return <AggregatedStats stats={displayStats} />;
}

export default GenericAggregatedPlayerStatsViewer;
