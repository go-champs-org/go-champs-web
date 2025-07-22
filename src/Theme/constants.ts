export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export const THEME_STORAGE_KEY = 'go-champs-theme';

export type ThemeModeValue = typeof THEME_MODES[keyof typeof THEME_MODES];
