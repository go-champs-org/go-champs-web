import React from 'react';
import { AggregatedPlayerStatsLogEntity } from '../AggregatedPlayerStats/state';
import { PlayerStatEntity } from '../Tournaments/state';

export interface AggregatedPlayerStatsViewerProps {
  aggregatedPlayerStats: AggregatedPlayerStatsLogEntity;
  playerStats: PlayerStatEntity[];
}

export function Loading() {
  return <>Loading...</>;
}

interface AggregatedStatsProps {
  stats: { label: string; value: string }[];
}

function AggregatedStats({ stats }: AggregatedStatsProps) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="columns is-multiline">
            {stats.map((stat, index) => (
              <div className="column is-1" key={index}>
                <p className="title is-5">{stat.label}</p>
                <p className="subtitle is-5">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AggregatedStats;
