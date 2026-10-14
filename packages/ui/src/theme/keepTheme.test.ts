import { THEME_STORAGE_KEY } from './constants';
import { keepTheme, restoreTheme } from './keepTheme';

const storageWith = (value: string | null) => ({ getItem: () => value });

describe('restoreTheme', () => {
  beforeEach(() => document.documentElement.removeAttribute('data-theme'));

  it('restores the stored theme when the attribute is missing', () => {
    restoreTheme(document.documentElement, storageWith('light'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('keeps an existing attribute', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    restoreTheme(document.documentElement, storageWith('light'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('ignores invalid stored values', () => {
    restoreTheme(document.documentElement, storageWith('purple'));
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('ignores unavailable storage', () => {
    const storage = {
      getItem: () => {
        throw new Error('denied');
      }
    };
    restoreTheme(document.documentElement, storage);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});

describe('keepTheme', () => {
  it('reapplies the theme after the attribute is removed', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    const stop = keepTheme(document.documentElement, localStorage);

    document.documentElement.removeAttribute('data-theme');
    await Promise.resolve();

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    stop();
    localStorage.clear();
  });
});
