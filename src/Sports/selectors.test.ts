import {
  selectPlayerStatisticsByLevel,
  selectPlayerStatisticsByScope,
  selectDefaultGame
} from './selectors';
import { initialState, SportEntity } from './state';
import { DEFAULT_GAME, GAME_RESULT_TYPE } from '../Games/state';

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

describe('selectPlayerStatisticsByScope', () => {
  it('returns all player statistics for a given sport and scope', () => {
    const state = {
      ...initialState,
      sports: {
        football: {
          name: 'Football',
          slug: 'football',
          playerStatistics: [
            { name: 'Goals', scope: 'per_game' },
            { name: 'Assists', scope: 'per_game' },
            { name: 'Passes', scope: 'aggregate' }
          ]
        } as SportEntity
      }
    };
    const sportSlug = 'football';
    const result = selectPlayerStatisticsByScope(state, sportSlug, 'per_game');
    expect(result).toEqual([
      { name: 'Goals', scope: 'per_game' },
      { name: 'Assists', scope: 'per_game' }
    ]);
  });
});

describe('selectDefaultGame', () => {
  it('returns default game with manual result type for unknown sports', () => {
    const result = selectDefaultGame('unknown_sport');

    expect(result).toEqual({
      ...DEFAULT_GAME,
      resultType: GAME_RESULT_TYPE.MANUAL
    });
    expect(result.resultType).toBe('manual');
  });

  it('returns default game with manual result type for empty sport slug', () => {
    const result = selectDefaultGame('');

    expect(result).toEqual({
      ...DEFAULT_GAME,
      resultType: GAME_RESULT_TYPE.MANUAL
    });
    expect(result.resultType).toBe('manual');
  });

  it('returns default game with automatic result type for basketball_5x5', () => {
    const result = selectDefaultGame('basketball_5x5');

    expect(result).toEqual({
      ...DEFAULT_GAME,
      resultType: GAME_RESULT_TYPE.AUTOMATIC
    });
    expect(result.resultType).toBe('automatic');
  });

  it('does not modify the original DEFAULT_GAME when returning sport-specific defaults', () => {
    const originalResultType = DEFAULT_GAME.resultType;

    selectDefaultGame('basketball_5x5');

    expect(DEFAULT_GAME.resultType).toBe(originalResultType);
  });
});
