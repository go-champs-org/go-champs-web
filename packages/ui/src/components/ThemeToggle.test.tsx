import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { THEME_STORAGE_KEY } from '../theme/constants';

describe('ThemeToggle', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('toggles data-theme and persists the choice', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button'));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('toggles back to light on a second click', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });
});
