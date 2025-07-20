import { ThemeColors, Theme } from './types';
import { themeColorMapping, resolveThemeColors } from './color-mapping';

export const lightThemeColors: ThemeColors = (resolveThemeColors(
  themeColorMapping.lightTheme
) as unknown) as ThemeColors;

export const darkThemeColors: ThemeColors = (resolveThemeColors(
  themeColorMapping.darkTheme
) as unknown) as ThemeColors;

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightThemeColors
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkThemeColors
};

export const themes = {
  light: lightTheme,
  dark: darkTheme
};
