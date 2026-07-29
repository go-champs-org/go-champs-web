import { ThemeMode } from './types';

export const CHANGE_THEME = 'CHANGE_THEME';
export const SET_THEME_LOADING = 'SET_THEME_LOADING';

export type ActionTypes = typeof CHANGE_THEME | typeof SET_THEME_LOADING;

export interface ChangeThemeAction {
  type: typeof CHANGE_THEME;
  payload: ThemeMode;
}

export interface SetThemeLoadingAction {
  type: typeof SET_THEME_LOADING;
  payload: boolean;
}

export type ThemeAction = ChangeThemeAction | SetThemeLoadingAction;

export const changeTheme = (theme: ThemeMode): ChangeThemeAction => ({
  type: CHANGE_THEME,
  payload: theme
});

export const setThemeLoading = (isLoading: boolean): SetThemeLoadingAction => ({
  type: SET_THEME_LOADING,
  payload: isLoading
});
