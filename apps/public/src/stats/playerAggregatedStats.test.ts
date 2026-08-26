import type { AggregatedPlayerStatsLogEntity } from '@gochamps/api-client';
import {
  firstPlayerStats,
  hasAnyColumns,
  playerStatTiles
} from './playerAggregatedStats';
import type { StatColumnView } from './rosterStats';

const log = (
  playerId: string,
  stats: Record<string, string>
): AggregatedPlayerStatsLogEntity => ({
  id: `log-${playerId}`,
  playerId,
  stats
});

const column = (slug: string, label: string, description: string): StatColumnView => ({
  slug,
  label,
  description
});

describe('firstPlayerStats', () => {
  it('reads the stats of the single log the filter can ever return', () => {
    expect(
      firstPlayerStats([log('p1', { points: '10' })])
    ).toEqual({ points: '10' });
  });

  it('answers null when the player has no aggregated log', () => {
    expect(firstPlayerStats([])).toBeNull();
  });
});

describe('playerStatTiles', () => {
  it('builds one tile per column, formatted the way the roster table would', () => {
    const columns = [
      column('points', 'PTS', 'Pontos'),
      column('rebounds', 'REB', 'Rebotes')
    ];

    expect(
      playerStatTiles({ points: '18', rebounds: '7' }, columns)
    ).toEqual([
      { slug: 'points', label: 'PTS', description: 'Pontos', value: '18' },
      { slug: 'rebounds', label: 'REB', description: 'Rebotes', value: '7' }
    ]);
  });

  it('renders a dash for a column the player has no recorded value for', () => {
    const columns = [column('points', 'PTS', 'Pontos')];

    expect(playerStatTiles({}, columns)).toEqual([
      { slug: 'points', label: 'PTS', description: 'Pontos', value: '-' }
    ]);
  });
});

describe('hasAnyColumns', () => {
  it('is true once at least one scope has a column to show', () => {
    expect(
      hasAnyColumns({ aggregate: [column('points', 'PTS', 'Pontos')], per_game: [] })
    ).toBe(true);
  });

  it('is false when every scope came back empty', () => {
    expect(hasAnyColumns({ aggregate: [], per_game: [] })).toBe(false);
  });

  it('is false for a catalogue with no scope at all', () => {
    expect(hasAnyColumns({})).toBe(false);
  });
});
