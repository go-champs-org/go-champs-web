import {
  mapApiFixedPlayerStatsRecordToFixedPlayerStatsRecordEntity,
  mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity
} from './dataMappers';

const apiFixedPlayerStatsTable = {
  id: 'ft1',
  stat_id: 'stat1',
  tournament_id: 'tour1',
  player_stats: [
    { id: 'r1', player_id: 'p1', value: '22' },
    { id: 'r2', player_id: 'p2', value: '10' }
  ]
};

describe('mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity', () => {
  it('maps the table and its ranked player stat records', () => {
    expect(
      mapApiFixedPlayerStatsTableToFixedPlayerStatsTableEntity(
        apiFixedPlayerStatsTable
      )
    ).toEqual({
      id: 'ft1',
      statId: 'stat1',
      playerStats: [
        { id: 'r1', playerId: 'p1', value: '22' },
        { id: 'r2', playerId: 'p2', value: '10' }
      ]
    });
  });
});

describe('mapApiFixedPlayerStatsRecordToFixedPlayerStatsRecordEntity', () => {
  it('maps a single record', () => {
    expect(
      mapApiFixedPlayerStatsRecordToFixedPlayerStatsRecordEntity({
        id: 'r1',
        player_id: 'p1',
        value: '22'
      })
    ).toEqual({ id: 'r1', playerId: 'p1', value: '22' });
  });
});
