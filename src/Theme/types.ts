export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Primary colors
  primary: string;
  secondary: string;
  accent: string;

  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  // Text colors
  text: string;
  textHover: string;
  textPlaceholder: string;
  textSecondary: string;
  textInverted: string;

  // UI element colors
  border: string;
  navbar: string;
  navbarText: string;
  navbarHover: string;
  button: string;
  buttonText: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Shadows
  shadow: string;
  shadowLight: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export interface ThemeState {
  currentTheme: ThemeMode;
  isLoading: boolean;
}
