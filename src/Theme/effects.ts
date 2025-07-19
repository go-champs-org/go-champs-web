import { Dispatch } from 'redux';
import { changeTheme, setThemeLoading } from './actions';
import { ThemeMode } from './types';

const THEME_STORAGE_KEY = 'go-champs-theme';

export const initializeTheme = () => (dispatch: Dispatch) => {
  dispatch(setThemeLoading(true));

  try {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      dispatch(changeTheme(savedTheme));
    } else {
      // Check system preference
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(changeTheme(prefersDark ? 'dark' : 'light'));
    }
  } catch (error) {
    console.warn('Theme initialization failed:', error);
    dispatch(changeTheme('light')); // fallback to light theme
  } finally {
    dispatch(setThemeLoading(false));
  }
};

export const toggleTheme = () => (dispatch: Dispatch, getState: () => any) => {
  const currentTheme = getState().theme.currentTheme;
  const newTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';

  try {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    dispatch(changeTheme(newTheme));
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
    // Still change theme even if saving fails
    dispatch(changeTheme(newTheme));
  }
};

export const setTheme = (theme: ThemeMode) => (dispatch: Dispatch) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    dispatch(changeTheme(theme));
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
    // Still change theme even if saving fails
    dispatch(changeTheme(theme));
  }
};
