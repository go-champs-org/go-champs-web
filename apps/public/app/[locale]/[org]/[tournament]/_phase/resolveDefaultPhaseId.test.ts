import type { TournamentWithTeamsEntity } from '@gochamps/api-client';
import { resolveDefaultPhaseId } from './PhaseView';

const phase = (
  id: string,
  order: number,
  isInProgress = false
): TournamentWithTeamsEntity['phases'][number] =>
  ({ id, order, isInProgress, title: id }) as TournamentWithTeamsEntity['phases'][number];

const tournament = (
  phases: TournamentWithTeamsEntity['phases']
): TournamentWithTeamsEntity =>
  ({ phases }) as TournamentWithTeamsEntity;

describe('resolveDefaultPhaseId', () => {
  it('prefers the phase in progress', () => {
    expect(
      resolveDefaultPhaseId(
        tournament([phase('first', 1), phase('running', 2, true)])
      )
    ).toBe('running');
  });

  it('falls back to the lowest-order phase when none is in progress', () => {
    // the API's order is what the CMS's phase tabs sort by, and it need not
    // match the order the phases arrive in
    expect(
      resolveDefaultPhaseId(
        tournament([phase('second', 2), phase('first', 1), phase('third', 3)])
      )
    ).toBe('first');
  });

  it('takes the first phase in progress when the data has more than one', () => {
    expect(
      resolveDefaultPhaseId(
        tournament([phase('a', 1, true), phase('b', 2, true)])
      )
    ).toBe('a');
  });

  it('has no phase to show for a tournament with none', () => {
    expect(resolveDefaultPhaseId(tournament([]))).toBeNull();
  });

  it('has no phase to show when the tournament itself is missing', () => {
    expect(resolveDefaultPhaseId(null)).toBeNull();
  });

  it('leaves the tournament it was given untouched', () => {
    const phases = [phase('second', 2), phase('first', 1)];
    resolveDefaultPhaseId(tournament(phases));
    expect(phases.map(p => p.id)).toEqual(['second', 'first']);
  });
});
