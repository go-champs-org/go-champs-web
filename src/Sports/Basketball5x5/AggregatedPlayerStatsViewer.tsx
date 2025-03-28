import React, { useState } from 'react';

import { AggregatedPlayerStatsViewerProps } from '../../Players/AggregatedStats';
import AggregatedStats from '../../Players/AggregatedStats';
import { useTranslation } from 'react-i18next';

interface Stats {
  labelKey: string;
  propertyKey: string;
}

const ABSOLUTE_STATS: Stats[] = [
  {
    labelKey: 'points',
    propertyKey: 'points'
  },
  {
    labelKey: 'rebounds',
    propertyKey: 'rebounds'
  },
  {
    labelKey: 'assists',
    propertyKey: 'assists'
  },
  {
    labelKey: 'steals',
    propertyKey: 'steals'
  },
  {
    labelKey: 'blocks',
    propertyKey: 'blocks'
  },
  {
    labelKey: 'turnovers',
    propertyKey: 'turnovers'
  }
];

const PER_GAME_STATS: Stats[] = [
  {
    labelKey: 'points',
    propertyKey: 'points_per_game'
  },
  {
    labelKey: 'rebounds',
    propertyKey: 'rebounds_per_game'
  },
  {
    labelKey: 'assists',
    propertyKey: 'assists_per_game'
  },
  {
    labelKey: 'steals',
    propertyKey: 'steals_per_game'
  },
  {
    labelKey: 'blocks',
    propertyKey: 'blocks_per_game'
  },
  {
    labelKey: 'turnovers',
    propertyKey: 'turnovers_per_game'
  }
];

function AggregatedPlayerStatsViewer({
  aggregatedPlayerStats
}: AggregatedPlayerStatsViewerProps) {
  const [isPerGame, setIsPerGame] = useState(false);
  const toogleIsPerGame = () => {
    setIsPerGame(!isPerGame);
  };
  const { t } = useTranslation();
  const statsConfig = isPerGame ? PER_GAME_STATS : ABSOLUTE_STATS;
  const displayStats = statsConfig.map(stat => {
    const labelContent = t(
      `sports.basketball_5x5.aggregatedStatsViewer.playerStatColumns.${stat.labelKey}.abbreviation`,
      {
        keySeparator: '.',
        defaultValue: stat.propertyKey
      }
    );
    return {
      label: labelContent,
      value: aggregatedPlayerStats.stats[stat.propertyKey]
    };
  });
  return (
    <>
      <div>
        <div
          className="buttons has-addons"
          style={{ justifyContent: 'flex-end' }}
        >
          <button
            className={
              `button is-small` + (!isPerGame ? ` is-selected is-info` : ``)
            }
            onClick={toogleIsPerGame}
          >
            Absolute
          </button>
          <button
            className={
              `button is-small` + (isPerGame ? ` is-selected is-info` : ``)
            }
            onClick={toogleIsPerGame}
          >
            Per game
          </button>
        </div>
      </div>
      <AggregatedStats stats={displayStats} />
    </>
  );
}

export default AggregatedPlayerStatsViewer;
