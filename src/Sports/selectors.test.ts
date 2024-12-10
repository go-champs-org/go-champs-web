import { selectPlayerStatisticsByLevel } from './selectors';
import { initialState, SportEntity } from './state';

describe('selectPlayerStatisticsByLevel', () => {
  it('returns all player statistics for a given sport and level', () => {
    const state = {
      ...initialState,
      sports: {
        football: {
          name: 'Football',
          slug: 'football',
          playerStatistics: [
            { name: 'Goals', level: 'game' },
            { name: 'Assists', level: 'game' },
            { name: 'Passes', level: 'tournament' }
          ]
        } as SportEntity
      }
    };
    const sportSlug = 'football';
    const result = selectPlayerStatisticsByLevel(state, sportSlug, 'game');
    expect(result).toEqual([
      { name: 'Goals', level: 'game' },
      { name: 'Assists', level: 'game' }
    ]);
  });
});
