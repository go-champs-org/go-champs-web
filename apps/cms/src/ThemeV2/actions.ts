import { ThemeMode } from './types';

export const CHANGE_THEME_V2 = 'CHANGE_THEME_V2';
export const SET_THEME_LOADING_V2 = 'SET_THEME_LOADING_V2';

export type ActionTypes = typeof CHANGE_THEME_V2 | typeof SET_THEME_LOADING_V2;

export interface ChangeThemeAction {
  type: typeof CHANGE_THEME_V2;
  payload: ThemeMode;
}

export interface SetThemeLoadingAction {
  type: typeof SET_THEME_LOADING_V2;
  payload: boolean;
}

export type ThemeAction = ChangeThemeAction | SetThemeLoadingAction;

export const changeTheme = (theme: ThemeMode): ChangeThemeAction => ({
  type: CHANGE_THEME_V2,
  payload: theme
});

export const setThemeLoading = (isLoading: boolean): SetThemeLoadingAction => ({
  type: SET_THEME_LOADING_V2,
  payload: isLoading
});
