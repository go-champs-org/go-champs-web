import { visibleEliminationStats } from './selectors';
import { RakingCriteria, StatEntity } from './state';

const makeStat = (
  id: string,
  rankingCriteria: StatEntity['rankingCriteria']
): StatEntity => ({
  id,
  title: `Stat ${id}`,
  teamStatSource: '',
  rankingOrder: 0,
  rankingCriteria
});

describe('visibleEliminationStats', () => {
  it('returns empty array when input is empty', () => {
    expect(visibleEliminationStats([])).toEqual([]);
  });

  it('keeps stat with rankingCriteria overall', () => {
    const stat = makeStat('1', RakingCriteria.overall);
    expect(visibleEliminationStats([stat])).toEqual([stat]);
  });

  it('keeps stat with rankingCriteria undefined', () => {
    const stat = makeStat('2', undefined as any);
    expect(visibleEliminationStats([stat])).toEqual([stat]);
  });

  it('filters out stat with rankingCriteria head_to_head', () => {
    const stat = makeStat('3', RakingCriteria.headToHead);
    expect(visibleEliminationStats([stat])).toEqual([]);
  });

  it('handles mixed array keeping only overall and undefined criteria', () => {
    const overall = makeStat('1', RakingCriteria.overall);
    const h2h = makeStat('2', RakingCriteria.headToHead);
    const noValue = makeStat('3', undefined as any);

    expect(visibleEliminationStats([overall, h2h, noValue])).toEqual([
      overall,
      noValue
    ]);
  });
});
