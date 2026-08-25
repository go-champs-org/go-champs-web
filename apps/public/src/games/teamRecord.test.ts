import type { GameEntity } from '@gochamps/api-client';
import { teamRecord } from './teamRecord';

const team = (id: string) => ({
  id,
  name: id,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
});

const game = (overrides: Partial<GameEntity>): GameEntity =>
  ({
    id: 'g1',
    datetime: '2026-08-12T21:00:00Z',
    homeTeam: team('home'),
    awayTeam: team('away'),
    homeScore: 0,
    awayScore: 0,
    isFinished: true,
    resultType: 'automatic',
    ...overrides
  }) as GameEntity;

describe('teamRecord', () => {
  it('counts every game of the schedule, decided or not', () => {
    const record = teamRecord(
      [game({ isFinished: false }), game({ homeScore: 2, awayScore: 1 })],
      'home'
    );

    expect(record.games).toBe(2);
  });

  it('counts a win at home and a win away', () => {
    const games = [
      game({ homeScore: 80, awayScore: 70 }),
      game({
        homeTeam: team('other'),
        awayTeam: team('home'),
        homeScore: 60,
        awayScore: 75
      })
    ];

    expect(teamRecord(games, 'home').wins).toBe(2);
  });

  it('does not count a loss or a draw', () => {
    const games = [
      game({ homeScore: 70, awayScore: 80 }),
      game({ homeScore: 70, awayScore: 70 })
    ];

    expect(teamRecord(games, 'home').wins).toBe(0);
  });

  // A game still being played has a score already: counting it would credit a
  // win the team has not earned yet.
  it('ignores a game that has not finished', () => {
    const games = [game({ homeScore: 80, awayScore: 70, isFinished: false })];

    expect(teamRecord(games, 'home').wins).toBe(0);
  });

  // A walkover is decided by the result type, not by the scoreline.
  it('counts a walkover for the side it was awarded to', () => {
    const games = [
      game({ resultType: 'home_team_walkover', isFinished: false }),
      game({ resultType: 'away_team_walkover' })
    ];

    expect(teamRecord(games, 'home').wins).toBe(1);
    expect(teamRecord(games, 'away').wins).toBe(1);
  });
});
