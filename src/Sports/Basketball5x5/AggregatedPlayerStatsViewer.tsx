import React, { useState } from 'react';

import { AggregatedPlayerStatsViewerProps } from '../../Players/AggregatedStats';
import AggregatedStats from '../../Players/AggregatedStats';
import { Trans, useTranslation } from 'react-i18next';

interface Stats {
  labelKey: string;
  propertyKey: string;
}

const ABSOLUTE_STATS: Stats[] = [
  {
    labelKey: 'gamesPlayed',
    propertyKey: 'game_played'
  },
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
    labelKey: 'onePointerPercentage',
    propertyKey: 'free_throw_percentage'
  },
  {
    labelKey: 'twoPointerPercentage',
    propertyKey: 'field_goal_percentage'
  },
  {
    labelKey: 'threePointPercentage',
    propertyKey: 'three_point_field_goal_percentage'
  }
];

const PER_GAME_STATS: Stats[] = [
  {
    labelKey: 'gamesPlayed',
    propertyKey: 'game_played'
  },
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
    labelKey: 'onePointerPercentage',
    propertyKey: 'free_throw_percentage'
  },
  {
    labelKey: 'twoPointerPercentage',
    propertyKey: 'field_goal_percentage'
  },
  {
    labelKey: 'threePointPercentage',
    propertyKey: 'three_point_field_goal_percentage'
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
            <Trans>aggregated</Trans>
          </button>
          <button
            className={
              `button is-small` + (isPerGame ? ` is-selected is-info` : ``)
            }
            onClick={toogleIsPerGame}
          >
            <Trans>perGame</Trans>
          </button>
        </div>
      </div>
      <AggregatedStats stats={displayStats} />
    </>
  );
}

export default AggregatedPlayerStatsViewer;
