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

type ThemeV2ProviderProps = ConnectedProps<typeof connector> & {
  children: React.ReactNode;
};

const ThemeV2Provider: React.FC<ThemeV2ProviderProps> = ({
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

    // Apply all theme colors as CSS custom properties with v2 prefix
    if (theme && theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--theme-v2-${key}`, value);
      });
    }
  }, [currentThemeMode]);

  return (
    <div
      data-theme-v2={currentThemeMode}
      className={`theme-v2-root theme-v2-${currentThemeMode}`}
    >
      {children}
    </div>
  );
};

export default connector(ThemeV2Provider);
