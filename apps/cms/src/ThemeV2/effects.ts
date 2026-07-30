import { Dispatch } from 'redux';
import { changeTheme, setThemeLoading } from './actions';
import { ThemeMode } from './types';
import { THEME_MODES, THEME_STORAGE_KEY } from './constants';
import { StoreState } from '../store';

export const initializeTheme = () => (dispatch: Dispatch) => {
  dispatch(setThemeLoading(true));

  try {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;

    if (
      savedTheme &&
      (savedTheme === THEME_MODES.LIGHT || savedTheme === THEME_MODES.DARK)
    ) {
      dispatch(changeTheme(savedTheme));
    } else {
      // Default to light theme for v2 pages
      dispatch(changeTheme(THEME_MODES.LIGHT));
    }
  } catch (error) {
    console.warn('ThemeV2 initialization failed:', error);
    dispatch(changeTheme(THEME_MODES.LIGHT)); // fallback to light theme
  } finally {
    dispatch(setThemeLoading(false));
  }
};

export const toggleTheme = () => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  const currentTheme = getState().themeV2.currentTheme;
  const newTheme: ThemeMode =
    currentTheme === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    dispatch(changeTheme(newTheme));
  } catch (error) {
    console.warn('Failed to save ThemeV2 preference:', error);
    // Still change theme even if saving fails
    dispatch(changeTheme(newTheme));
  }
};

export const setTheme = (theme: ThemeMode) => (dispatch: Dispatch) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    dispatch(changeTheme(theme));
  } catch (error) {
    console.warn('Failed to save ThemeV2 preference:', error);
    // Still change theme even if saving fails
    dispatch(changeTheme(theme));
  }
};
