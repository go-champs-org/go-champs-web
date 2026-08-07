import { mapApiAggregatedPlayerStatsLogToEntity } from '@gochamps/api-client';

describe('mapApiAggregatedPlayerStatsLogToEntity', () => {
  it('maps snake_case API fields to camelCase entity fields', () => {
    const result = mapApiAggregatedPlayerStatsLogToEntity({
      id: 'log1',
      player_id: 'p1',
      stats: { points: '10', rebounds: '5' }
    });

    expect(result).toEqual({
      id: 'log1',
      playerId: 'p1',
      stats: { points: '10', rebounds: '5' }
    });
  });
});
