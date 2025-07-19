import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../store';
import { currentTheme, isThemeLoading } from './selectors';
import { toggleTheme, setTheme } from './effects';
import { ThemeMode } from './types';

const mapStateToProps = (state: StoreState) => ({
  currentTheme: currentTheme(state),
  isLoading: isThemeLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      toggleTheme,
      setTheme
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type ThemeSwitcherProps = ConnectedProps<typeof connector> & {
  variant?: 'toggle' | 'select' | 'buttons';
  className?: string;
  showLabel?: boolean;
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme: currentThemeMode,
  isLoading,
  toggleTheme,
  setTheme,
  variant = 'toggle',
  className = '',
  showLabel = true
}) => {
  const handleToggle = () => {
    if (!isLoading) {
      toggleTheme();
    }
  };

  const handleSetTheme = (theme: ThemeMode) => {
    if (!isLoading) {
      setTheme(theme);
    }
  };

  if (variant === 'toggle') {
    return (
      <div className={`theme-switcher ${className}`}>
        {showLabel && <span className="theme-switcher-label">Theme:</span>}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`theme-toggle-button button is-small ${
            isLoading ? 'is-loading' : ''
          }`}
          title={`Switch to ${
            currentThemeMode === 'light' ? 'dark' : 'light'
          } theme`}
          aria-label={`Switch to ${
            currentThemeMode === 'light' ? 'dark' : 'light'
          } theme`}
        >
          <span className="icon">
            <i
              className={`fas ${
                currentThemeMode === 'light' ? 'fa-moon' : 'fa-sun'
              }`}
            ></i>
          </span>
        </button>
      </div>
    );
  }

  if (variant === 'select') {
    return (
      <div className={`theme-switcher ${className}`}>
        {showLabel && (
          <label htmlFor="theme-select" className="theme-switcher-label">
            Theme:
          </label>
        )}
        <div className="select is-small">
          <select
            id="theme-select"
            value={currentThemeMode}
            onChange={e => handleSetTheme(e.target.value as ThemeMode)}
            disabled={isLoading}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={`theme-switcher theme-buttons ${className}`}>
        {showLabel && <span className="theme-switcher-label">Theme:</span>}
        <div className="buttons are-small">
          <button
            onClick={() => handleSetTheme('light')}
            disabled={isLoading}
            className={`button ${
              currentThemeMode === 'light' ? 'is-primary' : ''
            }`}
          >
            <span className="icon">
              <i className="fas fa-sun"></i>
            </span>
            <span>Light</span>
          </button>
          <button
            onClick={() => handleSetTheme('dark')}
            disabled={isLoading}
            className={`button ${
              currentThemeMode === 'dark' ? 'is-primary' : ''
            }`}
          >
            <span className="icon">
              <i className="fas fa-moon"></i>
            </span>
            <span>Dark</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default connector(ThemeSwitcher);
