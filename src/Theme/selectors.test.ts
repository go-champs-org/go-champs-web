import { currentTheme, isThemeLoading } from './selectors';
import { initialState } from './state';
import { THEME_MODES } from './constants';
import { StoreState } from '../store';

describe('Theme Selectors', () => {
  describe('currentTheme', () => {
    it('returns the current theme from state', () => {
      const state = {
        theme: {
          ...initialState,
          currentTheme: THEME_MODES.DARK
        }
      } as StoreState;

      const result = currentTheme(state);

      expect(result).toBe(THEME_MODES.DARK);
    });

    it('returns light theme when state has light theme', () => {
      const state = {
        theme: {
          ...initialState,
          currentTheme: THEME_MODES.LIGHT
        }
      } as StoreState;

      const result = currentTheme(state);

      expect(result).toBe(THEME_MODES.LIGHT);
    });

    it('returns initial state theme by default', () => {
      const state = {
        theme: initialState
      } as StoreState;

      const result = currentTheme(state);

      expect(result).toBe(THEME_MODES.LIGHT);
    });

    it('handles state with additional properties', () => {
      const state = {
        theme: {
          ...initialState,
          currentTheme: THEME_MODES.DARK,
          extraProperty: 'should not affect selector'
        },
        otherModule: {
          someData: 'test'
        }
      } as any;

      const result = currentTheme(state);

      expect(result).toBe(THEME_MODES.DARK);
    });
  });

  describe('isThemeLoading', () => {
    it('returns false when theme is not loading', () => {
      const state = {
        theme: {
          ...initialState,
          isLoading: false
        }
      } as StoreState;

      const result = isThemeLoading(state);

      expect(result).toBe(false);
    });

    it('returns true when theme is loading', () => {
      const state = {
        theme: {
          ...initialState,
          isLoading: true
        }
      } as StoreState;

      const result = isThemeLoading(state);

      expect(result).toBe(true);
    });

    it('returns initial state loading by default', () => {
      const state = {
        theme: initialState
      } as StoreState;

      const result = isThemeLoading(state);

      expect(result).toBe(false);
    });

    it('handles state with additional properties', () => {
      const state = {
        theme: {
          ...initialState,
          isLoading: true,
          extraProperty: 'should not affect selector'
        },
        otherModule: {
          someData: 'test'
        }
      } as any;

      const result = isThemeLoading(state);

      expect(result).toBe(true);
    });
  });

  describe('selector consistency', () => {
    it('selectors work together correctly', () => {
      const state = {
        theme: {
          currentTheme: THEME_MODES.DARK,
          isLoading: true
        }
      } as StoreState;

      expect(currentTheme(state)).toBe(THEME_MODES.DARK);
      expect(isThemeLoading(state)).toBe(true);
    });

    it('selectors return different values for different states', () => {
      const lightLoadingState = {
        theme: {
          currentTheme: THEME_MODES.LIGHT,
          isLoading: true
        }
      } as StoreState;

      const darkNotLoadingState = {
        theme: {
          currentTheme: THEME_MODES.DARK,
          isLoading: false
        }
      } as StoreState;

      expect(currentTheme(lightLoadingState)).toBe(THEME_MODES.LIGHT);
      expect(isThemeLoading(lightLoadingState)).toBe(true);

      expect(currentTheme(darkNotLoadingState)).toBe(THEME_MODES.DARK);
      expect(isThemeLoading(darkNotLoadingState)).toBe(false);
    });
  });

  describe('selector performance', () => {
    it('selectors are reference-stable for same input', () => {
      const state = {
        theme: {
          currentTheme: THEME_MODES.DARK,
          isLoading: false
        }
      } as StoreState;

      const result1 = currentTheme(state);
      const result2 = currentTheme(state);

      expect(result1).toBe(result2);
    });

    it('selectors handle undefined theme state gracefully', () => {
      const stateWithUndefinedTheme = {} as StoreState;

      expect(() => {
        currentTheme(stateWithUndefinedTheme);
      }).toThrow();

      expect(() => {
        isThemeLoading(stateWithUndefinedTheme);
      }).toThrow();
    });
  });

  describe('type safety', () => {
    it('selector returns correct types', () => {
      const state = {
        theme: {
          currentTheme: THEME_MODES.DARK,
          isLoading: true
        }
      } as StoreState;

      const themeResult = currentTheme(state);
      const loadingResult = isThemeLoading(state);

      // TypeScript should infer these types correctly
      expect(typeof themeResult).toBe('string');
      expect(typeof loadingResult).toBe('boolean');

      // Theme should be one of the valid theme modes
      expect([THEME_MODES.LIGHT, THEME_MODES.DARK]).toContain(themeResult);
    });
  });
});
