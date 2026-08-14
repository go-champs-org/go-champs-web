'use client';

import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { THEME_MODES, THEME_STORAGE_KEY, ThemeMode } from '../theme/constants';

function readCurrentTheme(): ThemeMode {
  const stored = document.documentElement.getAttribute('data-theme');
  if (stored === THEME_MODES.LIGHT || stored === THEME_MODES.DARK) {
    return stored;
  }
  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)'
  )?.matches;
  return prefersDark ? THEME_MODES.DARK : THEME_MODES.LIGHT;
}

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setThemeState] = useState<ThemeMode | null>(null);

  useEffect(() => {
    setThemeState(readCurrentTheme());
  }, []);

  const toggle = () => {
    const next =
      readCurrentTheme() === THEME_MODES.LIGHT
        ? THEME_MODES.DARK
        : THEME_MODES.LIGHT;

    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable, theme still applies for this session
    }
    setThemeState(next);
  };

  const isDark = theme === THEME_MODES.DARK;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex size-10 cursor-pointer items-center justify-center rounded-full text-white hover:opacity-80 ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}
