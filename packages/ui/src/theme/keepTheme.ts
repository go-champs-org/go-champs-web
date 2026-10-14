import { THEME_MODES, THEME_STORAGE_KEY } from './constants';

const isThemeMode = (value: string | null): value is string =>
  value === THEME_MODES.LIGHT || value === THEME_MODES.DARK;

type GetStorage = () => Pick<Storage, 'getItem'>;

const readStoredTheme = (getStorage: GetStorage): string | null => {
  try {
    return getStorage().getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const restoreTheme = (
  root: Pick<HTMLElement, 'getAttribute' | 'setAttribute'>,
  getStorage: GetStorage
): void => {
  const stored = readStoredTheme(getStorage);
  const missing = root.getAttribute('data-theme') === null;
  if (missing && isThemeMode(stored)) {
    root.setAttribute('data-theme', stored);
  }
};

export const keepTheme = (root: HTMLElement, getStorage: GetStorage): (() => void) => {
  restoreTheme(root, getStorage);
  const observer = new MutationObserver(() => restoreTheme(root, getStorage));
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
