import { changeTheme, setThemeLoading } from './actions';
import themeReducer from './reducer';
import { initialState } from './state';
import { THEME_MODES } from './constants';

describe('themeReducer', () => {
  describe('CHANGE_THEME', () => {
    it('updates currentTheme to light', () => {
      const action = changeTheme(THEME_MODES.LIGHT);
      const newState = themeReducer(initialState, action);

      expect(newState.currentTheme).toBe(THEME_MODES.LIGHT);
    });

    it('updates currentTheme to dark', () => {
      const action = changeTheme(THEME_MODES.DARK);
      const newState = themeReducer(initialState, action);

      expect(newState.currentTheme).toBe(THEME_MODES.DARK);
    });

    it('preserves other state properties', () => {
      const stateWithLoading = {
        ...initialState,
        isLoading: true
      };
      const action = changeTheme(THEME_MODES.DARK);
      const newState = themeReducer(stateWithLoading, action);

      expect(newState.isLoading).toBe(true);
      expect(newState.currentTheme).toBe(THEME_MODES.DARK);
    });

    it('does not mutate original state', () => {
      const action = changeTheme(THEME_MODES.DARK);
      const originalState = { ...initialState };

      themeReducer(initialState, action);

      expect(initialState).toEqual(originalState);
    });
  });

  describe('SET_THEME_LOADING', () => {
    it('sets isLoading to true', () => {
      const action = setThemeLoading(true);
      const newState = themeReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
    });

    it('sets isLoading to false', () => {
      const action = setThemeLoading(false);
      const newState = themeReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
    });

    it('preserves other state properties', () => {
      const stateWithDarkTheme = {
        ...initialState,
        currentTheme: THEME_MODES.DARK
      };
      const action = setThemeLoading(true);
      const newState = themeReducer(stateWithDarkTheme, action);

      expect(newState.currentTheme).toBe(THEME_MODES.DARK);
      expect(newState.isLoading).toBe(true);
    });

    it('does not mutate original state', () => {
      const action = setThemeLoading(true);
      const originalState = { ...initialState };

      themeReducer(initialState, action);

      expect(initialState).toEqual(originalState);
    });
  });

  describe('unknown action', () => {
    it('returns the original state unchanged', () => {
      const unknownAction = { type: 'UNKNOWN_ACTION', payload: 'test' };
      const newState = themeReducer(initialState, unknownAction as any);

      expect(newState).toBe(initialState);
    });
  });

  describe('initial state handling', () => {
    it('returns initial state when state is undefined', () => {
      const action = changeTheme(THEME_MODES.DARK);
      const newState = themeReducer(undefined, action);

      expect(newState.currentTheme).toBe(THEME_MODES.DARK);
      expect(newState.isLoading).toBe(false);
    });
  });

  describe('state transitions', () => {
    it('handles multiple actions correctly', () => {
      let state = initialState;

      // Start loading
      state = themeReducer(state, setThemeLoading(true));
      expect(state.isLoading).toBe(true);
      expect(state.currentTheme).toBe(THEME_MODES.LIGHT);

      // Change theme
      state = themeReducer(state, changeTheme(THEME_MODES.DARK));
      expect(state.isLoading).toBe(true);
      expect(state.currentTheme).toBe(THEME_MODES.DARK);

      // Stop loading
      state = themeReducer(state, setThemeLoading(false));
      expect(state.isLoading).toBe(false);
      expect(state.currentTheme).toBe(THEME_MODES.DARK);
    });

    it('handles rapid theme changes', () => {
      let state = initialState;

      state = themeReducer(state, changeTheme(THEME_MODES.DARK));
      expect(state.currentTheme).toBe(THEME_MODES.DARK);

      state = themeReducer(state, changeTheme(THEME_MODES.LIGHT));
      expect(state.currentTheme).toBe(THEME_MODES.LIGHT);

      state = themeReducer(state, changeTheme(THEME_MODES.DARK));
      expect(state.currentTheme).toBe(THEME_MODES.DARK);
    });
  });
});
