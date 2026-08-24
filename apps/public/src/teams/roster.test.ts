import type { PlayerEntity } from '@gochamps/api-client';
import { teamRoster } from './roster';

const player = (overrides: Partial<PlayerEntity>): PlayerEntity => ({
  id: 'p1',
  name: 'Player',
  shirtName: '',
  shirtNumber: '',
  teamId: 't1',
  photoUrl: '',
  licenseNumber: '',
  ...overrides
});

describe('teamRoster', () => {
  it('keeps only the players of the given team', () => {
    const roster = teamRoster(
      [
        player({ id: 'p1', teamId: 't1' }),
        player({ id: 'p2', teamId: 't2' }),
        player({ id: 'p3', teamId: 't1' })
      ],
      't1'
    );

    expect(roster.map(p => p.id)).toEqual(['p1', 'p3']);
  });

  it('sorts by shirt number as a number, not as text', () => {
    const roster = teamRoster(
      [
        player({ id: 'p10', shirtNumber: '10' }),
        player({ id: 'p2', shirtNumber: '2' })
      ],
      't1'
    );

    expect(roster.map(p => p.id)).toEqual(['p2', 'p10']);
  });

  it('sends players with no shirt number to the end, sorted by name', () => {
    const roster = teamRoster(
      [
        player({ id: 'zoe', name: 'Zoe', shirtNumber: '' }),
        player({ id: 'ana', name: 'Ana', shirtNumber: '' }),
        player({ id: 'p7', name: 'Seven', shirtNumber: '7' })
      ],
      't1'
    );

    expect(roster.map(p => p.id)).toEqual(['p7', 'ana', 'zoe']);
  });

  it('does not mutate the tournament roster it was given', () => {
    const players = [
      player({ id: 'p10', shirtNumber: '10' }),
      player({ id: 'p2', shirtNumber: '2' })
    ];

    teamRoster(players, 't1');

    expect(players.map(p => p.id)).toEqual(['p10', 'p2']);
  });
});
