import type { GameEntity } from '@gochamps/api-client';
import { gamesByDate } from './gamesByDate';

const game = (id: string, datetime: string): GameEntity =>
  ({ id, datetime }) as GameEntity;

describe('gamesByDate', () => {
  it('groups games of the same day and labels it in the locale', () => {
    const days = gamesByDate(
      [game('g1', '2026-08-12T18:00:00Z'), game('g2', '2026-08-12T21:00:00Z')],
      'pt'
    );

    expect(days).toHaveLength(1);
    expect(days[0].label).toBe('12 de agosto de 2026');
    expect(days[0].games.map(g => g.id)).toEqual(['g1', 'g2']);
  });

  it('labels the day in English for the en locale', () => {
    const [day] = gamesByDate([game('g1', '2026-08-12T18:00:00Z')], 'en');

    expect(day.label).toBe('August 12, 2026');
  });

  // A 22:30 game in São Paulo is already the next day in UTC: grouping on the
  // raw timestamp would file it under a day nobody played on.
  it('groups a late game on its São Paulo day, not its UTC day', () => {
    const days = gamesByDate(
      [game('early', '2026-08-12T18:00:00Z'), game('late', '2026-08-13T01:30:00Z')],
      'pt'
    );

    expect(days).toHaveLength(1);
    expect(days[0].games.map(g => g.id)).toEqual(['early', 'late']);
  });

  it('returns the days oldest first, and each day kicks off in order', () => {
    const days = gamesByDate(
      [
        game('later', '2026-08-20T22:00:00Z'),
        game('second', '2026-08-12T21:00:00Z'),
        game('first', '2026-08-12T18:00:00Z')
      ],
      'pt'
    );

    expect(days.map(day => day.key)).toEqual(['2026-08-12', '2026-08-20']);
    expect(days[0].games.map(g => g.id)).toEqual(['first', 'second']);
  });

  // The API leaves datetime empty on a game nobody has scheduled yet. Dropping
  // it would hide a fixture the team really has.
  it('keeps a game without a usable date in an unlabelled group', () => {
    const days = gamesByDate(
      [game('scheduled', '2026-08-12T18:00:00Z'), game('undated', '')],
      'pt'
    );

    expect(days).toHaveLength(2);
    expect(days[0]).toEqual({ key: '', label: '', games: [expect.objectContaining({ id: 'undated' })] });
  });

  it('has no days for a team with no games', () => {
    expect(gamesByDate([], 'pt')).toEqual([]);
  });
});
