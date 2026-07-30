import { visibleEliminationStats } from './selectors';
import { RankingCriteria, StatEntity } from './state';

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
    const stat = makeStat('1', RankingCriteria.overall);
    expect(visibleEliminationStats([stat])).toEqual([stat]);
  });

  it('filters out stat with rankingCriteria head_to_head', () => {
    const stat = makeStat('3', RankingCriteria.headToHead);
    expect(visibleEliminationStats([stat])).toEqual([]);
  });

  it('handles mixed array keeping only overall criteria', () => {
    const overall = makeStat('1', RankingCriteria.overall);
    const h2h = makeStat('2', RankingCriteria.headToHead);

    expect(visibleEliminationStats([overall, h2h])).toEqual([overall]);
  });
});
