// Color mapping from SCSS variables to theme properties
// This ensures consistency between SCSS and theme system

export const scssColorMapping = {
  // SCSS variable -> hex value (from colors.scss)
  $red: '#970c10',
  '$red-light': '#e91919',
  '$red-dark': '#750608',
  $green: '#2b5615',
  '$green-light': '#3d7068',
  $pink: '#fa7c91',
  $purple: '#8a4d76',
  $brown: '#757763',
  '$beige-light': '#dbdbdb',
  '$beige-lighter': '#eff0eb',
  $dark: '#1e1200',
  '$dark-light': '#343434',
  '$orange-light': '#e3c4a8',
  $white: '#fdfdff',
  '$white-dark': '#eeeeee',
  $black: '#1d1d1b'
};

// Theme color definitions using SCSS color names
export const themeColorMapping = {
  lightTheme: {
    primary: '$red', // #970c10
    secondary: '$green', // #2b5615
    accent: '$red-light', // #e91919
    background: '$white', // #fdfdff
    backgroundSecondary: '$white-dark', // #eeeeee
    backgroundTertiary: '$beige-light', // #dbdbdb
    text: '$dark', // #1e1200
    textSecondary: '$dark-light', // #343434
    textInverted: '$white', // #fdfdff
    border: '$beige-light', // #dbdbdb
    navbar: '$black', // #1d1d1b
    navbarText: '$white', // #fdfdff
    navbarHover: '$green', // #2b5615
    button: '$red', // #970c10
    buttonText: '$white', // #fdfdff
    success: '$green', // #2b5615
    warning: '$red-light', // #e91919
    error: '$red-dark', // #750608
    info: '$dark-light', // #343434
    shadow: 'rgba(30, 18, 0, 0.6)', // custom
    shadowLight: 'rgba(30, 18, 0, 0.1)' // custom
  },
  darkTheme: {
    primary: '$red-light', // #e91919
    secondary: '$green-light', // #3d7068
    accent: '$pink', // #fa7c91
    background: '$dark', // #1e1200
    backgroundSecondary: '$dark-light', // #343434
    backgroundTertiary: '$brown', // #757763
    text: '$white', // #fdfdff
    textSecondary: '$white-dark', // #eeeeee
    textInverted: '$dark', // #1e1200
    border: '$brown', // #757763
    navbar: '$dark-light', // #343434
    navbarText: '$white', // #fdfdff
    navbarHover: '$green-light', // #3d7068
    button: '$red-light', // #e91919
    buttonText: '$white', // #fdfdff
    success: '$green-light', // #3d7068
    warning: '$pink', // #fa7c91
    error: '$red-light', // #e91919
    info: '$white-dark', // #eeeeee
    shadow: 'rgba(0, 0, 0, 0.8)', // custom
    shadowLight: 'rgba(0, 0, 0, 0.2)' // custom
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
