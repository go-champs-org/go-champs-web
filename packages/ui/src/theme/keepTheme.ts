import { THEME_MODES, THEME_STORAGE_KEY } from './constants';

const isThemeMode = (value: string | null): value is string =>
  value === THEME_MODES.LIGHT || value === THEME_MODES.DARK;

const readStoredTheme = (storage: Pick<Storage, 'getItem'>): string | null => {
  try {
    return storage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const restoreTheme = (
  root: Pick<HTMLElement, 'getAttribute' | 'setAttribute'>,
  storage: Pick<Storage, 'getItem'>
): void => {
  const stored = readStoredTheme(storage);
  const missing = root.getAttribute('data-theme') === null;
  if (missing && isThemeMode(stored)) {
    root.setAttribute('data-theme', stored);
  }
};

export const keepTheme = (root: HTMLElement, storage: Storage): (() => void) => {
  restoreTheme(root, storage);
  const observer = new MutationObserver(() => restoreTheme(root, storage));
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
