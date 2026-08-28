import type {
  PhaseEntity,
  PlayerStatEntity,
  PlayerStatsLogEntity,
  SportEntity
} from '@gochamps/api-client';
import {
  phaseCellValue,
  playerPhaseTable,
  playerProfileColumns,
  type PhaseStatRow
} from './playerPhaseStats';

const stat = (
  slug: string,
  visibility: 'public' | 'private' = 'public'
): PlayerStatEntity => ({ id: `s-${slug}`, title: slug, slug, visibility });

const basketball = (): SportEntity => ({
  slug: 'basketball_5x5',
  name: 'Basquete',
  playerStatistics: []
});

const phase = (id: string, title: string, order: number): PhaseEntity => ({
  id,
  title,
  type: 'elimination',
  order,
  isInProgress: false,
  draws: [],
  eliminationStats: [],
  eliminations: []
});

const log = (
  phaseId: string,
  stats: Record<string, string>
): PlayerStatsLogEntity => ({
  id: `log-${phaseId}-${Object.values(stats).join('-')}`,
  gameId: 'g',
  phaseId,
  playerId: 'p1',
  teamId: 't1',
  tournamentId: 'tour1',
  stats
});

const row = (over: Partial<PhaseStatRow> = {}): PhaseStatRow => ({
  phaseId: 'ph',
  label: 'Fase',
  games: 2,
  sums: { points: 30, free_throw_percentage: 160 },
  counts: { points: 2, free_throw_percentage: 2 },
  ...over
});

describe('playerPhaseTable', () => {
  const phases = [
    phase('classif', 'Classificação', 1),
    phase('playoff', 'Playoff', 3),
    phase('empty', 'Sem jogos', 2)
  ];

  it('sums each stat per phase and orders the phases the player has games in', () => {
    const table = playerPhaseTable(
      [
        log('classif', { points: '10' }),
        log('classif', { points: '12' }),
        log('playoff', { points: '20' })
      ],
      phases
    );

    // Ordered by phase order; the phase with no games is left out entirely.
    expect(table.rows.map(r => r.label)).toEqual(['Classificação', 'Playoff']);
    expect(table.rows[0]).toMatchObject({ games: 2, sums: { points: 22 } });
    expect(table.rows[1]).toMatchObject({ games: 1, sums: { points: 20 } });
  });

  it('totals every phase together across all logs', () => {
    const table = playerPhaseTable(
      [log('classif', { points: '10' }), log('playoff', { points: '20' })],
      phases
    );

    expect(table.total).toMatchObject({ games: 2, sums: { points: 30 } });
  });

  it('returns no rows when the player has never played', () => {
    const table = playerPhaseTable([], phases);

    expect(table.rows).toEqual([]);
    expect(table.total.games).toBe(0);
  });
});

describe('playerProfileColumns', () => {
  it('keeps only the curated basketball stats the tournament publishes, in order', () => {
    const columns = playerProfileColumns(
      [
        stat('turnovers'),
        stat('rebounds'),
        stat('points'),
        stat('minutes_played', 'private')
      ],
      basketball()
    );

    // Curated order (points before rebounds); turnovers is not curated and the
    // private stat is dropped.
    expect(columns.map(column => column.slug)).toEqual(['points', 'rebounds']);
  });

  it('falls back to every visible statistic for a sport with no curated set', () => {
    const columns = playerProfileColumns(
      [stat('points'), stat('custom'), stat('secret', 'private')],
      null
    );

    expect(columns.map(column => column.slug)).toEqual(['points', 'custom']);
  });
});

describe('phaseCellValue', () => {
  it('shows a whole count in the aggregate scope', () => {
    expect(phaseCellValue('points', row(), 'aggregate')).toBe('30');
  });

  it('divides a count by games played in the per game scope', () => {
    expect(phaseCellValue('points', row({ games: 2 }), 'per_game')).toBe('15.0');
  });

  it('averages a percentage rather than adding it, in either scope', () => {
    expect(phaseCellValue('free_throw_percentage', row(), 'aggregate')).toBe('80%');
    expect(phaseCellValue('free_throw_percentage', row(), 'per_game')).toBe('80%');
  });

  it('reads a dash for a column the row has no value for', () => {
    expect(phaseCellValue('rebounds', row(), 'aggregate')).toBe('-');
  });
});
