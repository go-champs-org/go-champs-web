import type { GameEntity } from '@gochamps/api-client';
import {
  gameStructuredData,
  serializeStructuredData
} from './gameStructuredData';

const names = { homeTeam: 'Time Casa', awayTeam: 'Time Visitante' };

const game = (overrides: Partial<GameEntity> = {}) =>
  ({
    datetime: '2026-08-01T23:00:00Z',
    info: '',
    ...overrides
  }) as GameEntity;

const buildSchema = (overrides: Partial<GameEntity> = {}, venue = 'Ginásio') =>
  gameStructuredData({
    game: game(overrides),
    names,
    url: 'https://go-champs.com/pt/org/torneio/jogos/g1',
    venue
  }) as Record<string, unknown>;

describe('gameStructuredData', () => {
  it('describes the game as a SportsEvent named after both teams', () => {
    const schema = buildSchema();

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('SportsEvent');
    expect(schema.name).toBe('Time Casa x Time Visitante');
    expect(schema.url).toBe('https://go-champs.com/pt/org/torneio/jogos/g1');
  });

  it('names both sides as competitors', () => {
    const schema = buildSchema();

    expect(schema.homeTeam).toEqual({
      '@type': 'SportsTeam',
      name: 'Time Casa'
    });
    expect(schema.awayTeam).toEqual({
      '@type': 'SportsTeam',
      name: 'Time Visitante'
    });
    expect(schema.competitor).toEqual([
      { '@type': 'SportsTeam', name: 'Time Casa' },
      { '@type': 'SportsTeam', name: 'Time Visitante' }
    ]);
  });

  it('carries the kick-off instant and the venue', () => {
    const schema = buildSchema();

    expect(schema.startDate).toBe('2026-08-01T23:00:00Z');
    expect(schema.location).toEqual({ '@type': 'Place', name: 'Ginásio' });
  });

  it('leaves out a start date the game does not have yet', () => {
    expect('startDate' in buildSchema({ datetime: '' })).toBe(false);
  });

  it('leaves out the venue when there is neither location nor city', () => {
    expect('location' in buildSchema({}, '')).toBe(false);
  });

  it('adds the organizer note as the description only when there is one', () => {
    expect(buildSchema({ info: 'Final da temporada' }).description).toBe(
      'Final da temporada'
    );
    expect('description' in buildSchema()).toBe(false);
  });
});

describe('serializeStructuredData', () => {
  it('produces JSON that parses back to the same object', () => {
    const schema = buildSchema();

    expect(JSON.parse(serializeStructuredData(schema))).toEqual(schema);
  });

  it('escapes a closing script tag so the JSON cannot break out of the tag', () => {
    const json = serializeStructuredData({ name: '</script><b>hi</b>' });

    expect(json).not.toContain('</script');
    expect(JSON.parse(json).name).toBe('</script><b>hi</b>');
  });
});
