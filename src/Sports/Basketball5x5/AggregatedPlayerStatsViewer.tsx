import React, { ReactElement, useState } from 'react';

import { AggregatedPlayerStatsViewerProps } from '../../Players/AggregatedStats';
import AggregatedStats from '../../Players/AggregatedStats';
import { Trans, useTranslation } from 'react-i18next';
import { PercetualCell, RateCell } from './TableCells';

interface Stats {
  labelKey: string;
  propertyKey: string;
  valueFunction: (value: string) => ReactElement;
}

const ABSOLUTE_STATS: Stats[] = [
  {
    labelKey: 'gamesPlayed',
    propertyKey: 'game_played',
    valueFunction: (value: string) => <>{value}</>
  },
  {
    labelKey: 'points',
    propertyKey: 'points',
    valueFunction: (value: string) => <>{value}</>
  },
  {
    labelKey: 'rebounds',
    propertyKey: 'rebounds',
    valueFunction: (value: string) => <>{value}</>
  },
  {
    labelKey: 'assists',
    propertyKey: 'assists',
    valueFunction: (value: string) => <>{value}</>
  },
  {
    labelKey: 'steals',
    propertyKey: 'steals',
    valueFunction: (value: string) => <>{value}</>
  },
  {
    labelKey: 'blocks',
    propertyKey: 'blocks',
    valueFunction: (value: string) => <>{value}</>
  },
  {
    labelKey: 'onePointerPercentage',
    propertyKey: 'free_throw_percentage',
    valueFunction: (value: string) => <PercetualCell value={value} />
  },
  {
    labelKey: 'twoPointerPercentage',
    propertyKey: 'field_goal_percentage',
    valueFunction: (value: string) => <PercetualCell value={value} />
  },
  {
    labelKey: 'threePointPercentage',
    propertyKey: 'three_point_field_goal_percentage',
    valueFunction: (value: string) => <PercetualCell value={value} />
  }
];

const PER_GAME_STATS: Stats[] = [
  {
    labelKey: 'gamesPlayed',
    propertyKey: 'game_played',
    valueFunction: (value: string) => <>{value}</>
  },
  {
    labelKey: 'points',
    propertyKey: 'points_per_game',
    valueFunction: (value: string) => <RateCell value={value} />
  },
  {
    labelKey: 'rebounds',
    propertyKey: 'rebounds_per_game',
    valueFunction: (value: string) => <RateCell value={value} />
  },
  {
    labelKey: 'assists',
    propertyKey: 'assists_per_game',
    valueFunction: (value: string) => <RateCell value={value} />
  },
  {
    labelKey: 'steals',
    propertyKey: 'steals_per_game',
    valueFunction: (value: string) => <RateCell value={value} />
  },
  {
    labelKey: 'blocks',
    propertyKey: 'blocks_per_game',
    valueFunction: (value: string) => <RateCell value={value} />
  },
  {
    labelKey: 'onePointerPercentage',
    propertyKey: 'free_throw_percentage',
    valueFunction: (value: string) => <PercetualCell value={value} />
  },
  {
    labelKey: 'twoPointerPercentage',
    propertyKey: 'field_goal_percentage',
    valueFunction: (value: string) => <PercetualCell value={value} />
  },
  {
    labelKey: 'threePointPercentage',
    propertyKey: 'three_point_field_goal_percentage',
    valueFunction: (value: string) => <PercetualCell value={value} />
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
      value: stat.valueFunction(aggregatedPlayerStats.stats[stat.propertyKey])
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
