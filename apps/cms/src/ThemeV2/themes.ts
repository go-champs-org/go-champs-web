import { ThemeColors, Theme } from './types';
import { themeColorMappingV2, resolveThemeColorsV2 } from './color-mapping';
import { THEME_MODES } from './constants';

export const lightThemeColors: ThemeColors = (resolveThemeColorsV2(
  themeColorMappingV2.lightTheme
) as unknown) as ThemeColors;

export const darkThemeColors: ThemeColors = (resolveThemeColorsV2(
  themeColorMappingV2.darkTheme
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
