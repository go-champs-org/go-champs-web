import React from 'react';
import { AggregatedPlayerStatsLogEntity } from '../AggregatedPlayerStats/state';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import Shimmer from '../Shared/UI/Shimmer';

export interface AggregatedPlayerStatsViewerProps {
  aggregatedPlayerStats: AggregatedPlayerStatsLogEntity;
  playerStats: PlayerStatEntity[];
  tournament: TournamentEntity;
}

export function Loading() {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="columns">
            <div className="column">
              <Shimmer>
                <div
                  style={{
                    height: '40px',
                    width: '200px'
                  }}
                ></div>
              </Shimmer>
            </div>
            <div className="column">
              <Shimmer>
                <div
                  style={{
                    height: '40px',
                    width: '200px'
                  }}
                ></div>
              </Shimmer>
            </div>
            <div className="column">
              <Shimmer>
                <div
                  style={{
                    height: '40px',
                    width: '200px'
                  }}
                ></div>
              </Shimmer>
            </div>
            <div className="column">
              <Shimmer>
                <div
                  style={{
                    height: '40px',
                    width: '200px'
                  }}
                ></div>
              </Shimmer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AggregatedStatsProps {
  stats: { label: string; value: React.ReactElement }[];
}

function AggregatedStats({ stats }: AggregatedStatsProps) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="columns is-mobile is-multiline">
            {stats.map((stat, index) => (
              <div
                className="column is-half-mobile"
                key={index}
                style={{ overflow: 'hidden' }}
              >
                <p
                  className="title is-5"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {stat.label}
                </p>
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
