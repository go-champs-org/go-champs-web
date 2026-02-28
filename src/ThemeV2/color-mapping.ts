// Color mapping from SCSS variables to theme properties
// This ensures consistency between SCSS and ThemeV2 system

export const scssColorMappingV2 = {
  // Neutrals
  '$neutral-100': '#ffffff',
  '$neutral-300': '#efeae3',
  '$neutral-500': '#4a4a4a',
  '$neutral-700': '#2c2c2c',
  '$neutral-900': '#1d1d1b',
  '$neutral-950': '#12140e',

  // Accents
  '$accent-a': '#a6cd63',
  '$accent-b': '#f4d35e',
  '$accent-c': '#7a9949',
  '$accent-d': '#509187',

  // Status
  '$status-success': '#4caf50',
  '$status-warning': '#ff9800',
  '$status-error': '#f44336',
  '$status-info': '#2196f3'
};

// Theme color definitions using SCSS color names
export const themeColorMappingV2 = {
  lightTheme: {
    primary: '$accent-a',
    secondary: '$accent-c',
    accent: '$accent-b',
    background: '$neutral-300',
    backgroundSecondary: '$neutral-100',
    backgroundTertiary: '$neutral-300',
    text: '$neutral-900',
    textHover: '$accent-c',
    textPlaceholder: '$neutral-500',
    textSecondary: '$neutral-500',
    textInverted: '$neutral-100',
    border: '$neutral-500',
    navbar: '$neutral-950',
    navbarText: '$neutral-100',
    navbarHover: '$accent-a',
    button: '$accent-a',
    buttonText: '$neutral-900',
    success: '$status-success',
    warning: '$status-warning',
    error: '$status-error',
    info: '$status-info',
    shadow: 'rgba(29, 29, 27, 0.15)',
    shadowLight: 'rgba(29, 29, 27, 0.08)'
  },
  darkTheme: {
    primary: '$accent-a',
    secondary: '$accent-c',
    accent: '$accent-b',
    background: '$neutral-900',
    backgroundSecondary: '$neutral-700',
    backgroundTertiary: '$neutral-700',
    text: '$neutral-100',
    textHover: '$accent-a',
    textPlaceholder: '$neutral-500',
    textSecondary: '$neutral-300',
    textInverted: '$neutral-900',
    border: '$neutral-500',
    navbar: '$neutral-900',
    navbarText: '$neutral-100',
    navbarHover: '$accent-a',
    button: '$accent-a',
    buttonText: '$neutral-900',
    success: '$status-success',
    warning: '$status-warning',
    error: '$status-error',
    info: '$status-info',
    shadow: 'rgba(0, 0, 0, 0.5)',
    shadowLight: 'rgba(0, 0, 0, 0.2)'
  }
};

// Helper function to resolve SCSS variables to hex values
export const resolveThemeColorsV2 = (
  themeMapping: typeof themeColorMappingV2.lightTheme
): Record<string, string> => {
  const resolved: Record<string, string> = {};

  Object.entries(themeMapping).forEach(([key, value]) => {
    if (typeof value === 'string' && value.startsWith('$')) {
      resolved[key] =
        scssColorMappingV2[value as keyof typeof scssColorMappingV2] || value;
    } else {
      resolved[key] = value;
    }
  });

  return resolved;
};
