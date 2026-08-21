import {
  GAME_STATISTIC_LEVEL,
  mapApiSportToEntity,
  playerStatisticsByLevel
} from './dataMappers';

const apiSport = {
  slug: 'basketball_5x5',
  name: 'Basketball 5x5',
  player_statistics: [
    {
      slug: 'assists',
      name: 'Assists',
      level: 'game',
      scope: 'aggregate',
      value_type: 'manual'
    },
    {
      slug: 'points_per_game',
      name: 'Points per game',
      level: 'tournament',
      scope: 'per_game',
      value_type: 'calculated'
    }
  ]
};

describe('mapApiSportToEntity', () => {
  it('maps the sport and its statistics', () => {
    expect(mapApiSportToEntity(apiSport)).toEqual({
      slug: 'basketball_5x5',
      name: 'Basketball 5x5',
      playerStatistics: [
        {
          slug: 'assists',
          name: 'Assists',
          level: 'game',
          scope: 'aggregate',
          valueType: 'manual'
        },
        {
          slug: 'points_per_game',
          name: 'Points per game',
          level: 'tournament',
          scope: 'per_game',
          valueType: 'calculated'
        }
      ]
    });
  });

  it('handles a sport with no statistics catalogue', () => {
    const entity = mapApiSportToEntity({
      slug: 'unknown',
      name: 'Unknown',
      player_statistics: undefined as unknown as []
    });

    expect(entity.playerStatistics).toEqual([]);
  });
});

describe('playerStatisticsByLevel', () => {
  it('keeps only the statistics of the requested level', () => {
    const sport = mapApiSportToEntity(apiSport);

    expect(
      playerStatisticsByLevel(sport, GAME_STATISTIC_LEVEL).map(
        statistic => statistic.slug
      )
    ).toEqual(['assists']);
  });

  it('is empty for a level the sport does not score', () => {
    expect(playerStatisticsByLevel(mapApiSportToEntity(apiSport), 'season')).toEqual(
      []
    );
  });
});
