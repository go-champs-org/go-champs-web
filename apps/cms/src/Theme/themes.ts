import { ThemeColors, Theme } from './types';
import { themeColorMapping, resolveThemeColors } from './color-mapping';
import { THEME_MODES } from './constants';

export const lightThemeColors: ThemeColors = (resolveThemeColors(
  themeColorMapping.lightTheme
) as unknown) as ThemeColors;

export const darkThemeColors: ThemeColors = (resolveThemeColors(
  themeColorMapping.darkTheme
) as unknown) as ThemeColors;

export const lightTheme: Theme = {
  mode: THEME_MODES.LIGHT,
  colors: lightThemeColors
};

export const darkTheme: Theme = {
  mode: THEME_MODES.DARK,
  colors: darkThemeColors
};

export const themes = {
  [THEME_MODES.LIGHT]: lightTheme,
  [THEME_MODES.DARK]: darkTheme
};
