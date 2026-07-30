import { ThemeState } from './types';
import { THEME_MODES } from './constants';

export const initialState: ThemeState = {
  currentTheme: THEME_MODES.LIGHT,
  isLoading: false
};
