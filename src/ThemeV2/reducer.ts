import { createReducer } from '../Shared/store/helpers';
import { CHANGE_THEME_V2, SET_THEME_LOADING_V2 } from './actions';
import { ThemeState, ThemeMode } from './types';
import { initialState } from './state';

const changeTheme = (
  state: ThemeState,
  action: { payload: ThemeMode }
): ThemeState => ({
  ...state,
  currentTheme: action.payload
});

const setThemeLoading = (
  state: ThemeState,
  action: { payload: boolean }
): ThemeState => ({
  ...state,
  isLoading: action.payload
});

export default createReducer<ThemeState>(initialState, {
  [CHANGE_THEME_V2]: changeTheme,
  [SET_THEME_LOADING_V2]: setThemeLoading
});
