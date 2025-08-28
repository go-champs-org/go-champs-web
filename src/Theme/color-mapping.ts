// Color mapping from SCSS variables to theme properties
// This ensures consistency between SCSS and theme system

export const scssColorMapping = {
  $red: '#a72608',
  '$red-light': '#e91919',
  '$red-dark': '#750608',
  $green: '#a6cd63',
  '$green-dark': '#7a9949',
  '$green-light': '#3d7068',
  $pink: '#fa7c91',
  $purple: '#7b4b94',
  $brown: '#757763',
  '$beige-light': '#dbdbdb',
  '$beige-lighter': '#eff0eb',
  $dark: '#1e1200',
  '$dark-light': '#343434',
  '$orange-light': '#e3c4a8',
  $white: '#f8f4f9',
  '$white-dark': '#eeeeee',
  $black: '#1d1d1b',
  '$black-light': '#2c2c2c',
};

// Theme color definitions using SCSS color names
export const themeColorMapping = {
  lightTheme: {
    primary: '$green',
    secondary: '$green-dark',
    accent: '$black',
    background: '$white',
    backgroundSecondary: '$white-dark',
    backgroundTertiary: '$beige-light',
    cardBackground: '$white',
    cardBackgroundHover: '$white-dark',
    text: '$black',
    textHover: '$dark-light',
    textPlaceholder: '$dark-light',
    textSecondary: '$green-dark',
    textInverted: '$white',
    border: '$green-dark',
    navbar: '$black',
    navbarText: '$white',
    navbarHover: '$green',
    button: '$green',
    buttonText: '$white',
    success: '$green',
    warning: '$red',
    error: '$red',
    info: '$black',
    shadow: 'rgba(30, 18, 0, 0.6)',
    shadowLight: 'rgba(30, 18, 0, 0.1)'
  },
  darkTheme: {
    primary: '$green',
    secondary: '$red',
    accent: '$white',
    background: '$black',
    backgroundSecondary: '$black-light',
    backgroundTertiary: '$brown',
    cardBackground: '$green-dark',
    cardBackgroundHover: '$green',
    text: '$white',
    textHover: '$white-dark',
    textPlaceholder: '$beige-light',
    textSecondary: '$white-dark',
    textInverted: '$white',
    border: '$brown',
    navbar: '$black',
    navbarText: '$white',
    navbarHover: '$green',
    button: '$green',
    buttonText: '$dark',
    success: '$green',
    warning: '$red',
    error: '$red',
    info: '$black',
    shadow: 'rgba(255, 255, 255, 0.15)',
    shadowLight: 'rgba(255, 255, 255, 0.08)'
  }
};

// Helper function to resolve SCSS variables to hex values
export const resolveThemeColors = (
  themeMapping: typeof themeColorMapping.lightTheme
): Record<string, string> => {
  const resolved: Record<string, string> = {};

  Object.entries(themeMapping).forEach(([key, value]) => {
    if (typeof value === 'string' && value.startsWith('$')) {
      resolved[key] =
        scssColorMapping[value as keyof typeof scssColorMapping] || value;
    } else {
      resolved[key] = value;
    }
  });

  return resolved;
};
