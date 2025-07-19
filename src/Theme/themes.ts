import { ThemeColors, Theme } from './types';

export const lightThemeColors: ThemeColors = {
  // Primary colors
  primary: '#970c10',
  secondary: '#2b5615',
  accent: '#e91919',

  // Background colors
  background: '#fdfdff',
  backgroundSecondary: '#eeeeee',
  backgroundTertiary: '#dbdbdb',

  // Text colors
  text: '#1e1200',
  textSecondary: '#343434',
  textInverted: '#fdfdff',

  // UI element colors
  border: '#dbdbdb',
  navbar: '#970c10',
  navbarText: '#fdfdff',
  navbarHover: '#2b5615',
  button: '#970c10',
  buttonText: '#fdfdff',

  // Status colors
  success: '#2b5615',
  warning: '#e91919',
  error: '#750608',
  info: '#343434',

  // Shadows
  shadow: 'rgba(30, 18, 0, 0.6)',
  shadowLight: 'rgba(30, 18, 0, 0.1)'
};

export const darkThemeColors: ThemeColors = {
  // Primary colors
  primary: '#e91919',
  secondary: '#3d7068',
  accent: '#fa7c91',

  // Background colors
  background: '#1e1200',
  backgroundSecondary: '#343434',
  backgroundTertiary: '#757763',

  // Text colors
  text: '#fdfdff',
  textSecondary: '#eeeeee',
  textInverted: '#1e1200',

  // UI element colors
  border: '#757763',
  navbar: '#343434',
  navbarText: '#fdfdff',
  navbarHover: '#3d7068',
  button: '#e91919',
  buttonText: '#fdfdff',

  // Status colors
  success: '#3d7068',
  warning: '#fa7c91',
  error: '#e91919',
  info: '#eeeeee',

  // Shadows
  shadow: 'rgba(0, 0, 0, 0.8)',
  shadowLight: 'rgba(0, 0, 0, 0.2)'
};

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
