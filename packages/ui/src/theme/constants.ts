export const THEME_STORAGE_KEY = 'go-champs-theme';

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export const noFlashThemeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;
