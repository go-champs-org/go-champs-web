import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../store';
import { currentTheme } from './selectors';
import { initializeTheme } from './effects';
import { themes } from './themes';

const mapStateToProps = (state: StoreState) => ({
  currentTheme: currentTheme(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      initializeTheme
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type ThemeProviderProps = ConnectedProps<typeof connector> & {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  currentTheme: currentThemeMode,
  initializeTheme
}) => {
  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Apply theme CSS custom properties whenever theme changes
  useEffect(() => {
    const theme = themes[currentThemeMode];
    const root = document.documentElement;

    // Apply all theme colors as CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Apply theme mode class to body for conditional styling
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${currentThemeMode}`);

    // Set data attribute for easier CSS targeting
    document.documentElement.setAttribute('data-theme', currentThemeMode);
  }, [currentThemeMode]);

  return <>{children}</>;
};

export default connector(ThemeProvider);
