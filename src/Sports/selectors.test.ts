import { selectPlayerStatisticsByType } from './selectors';
import { initialState, SportEntity, SportState } from './state';

describe('selectPlayerStatisticsByType', () => {
  it('returns all player statistics for a given sport and type', () => {
    const state = {
      ...initialState,
      sports: {
        football: {
          name: 'Football',
          slug: 'football',
          playerStatistics: [
            { name: 'Goals', type: 'logged' },
            { name: 'Assists', type: 'logged' },
            { name: 'Passes', type: 'calculated' }
          ]
        } as SportEntity
      }
    };
    const sportSlug = 'football';
    const result = selectPlayerStatisticsByType(state, sportSlug, 'logged');
    expect(result).toEqual([
      { name: 'Goals', type: 'logged' },
      { name: 'Assists', type: 'logged' }
    ]);
  });
});
