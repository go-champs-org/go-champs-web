// Mock the env module before importing effects
import { initializeTheme, toggleTheme, setTheme } from './effects';
import { changeTheme, setThemeLoading } from './actions';
import { THEME_MODES, THEME_STORAGE_KEY } from './constants';

jest.mock('../Shared/env', () => ({
  REACT_APP_ENV: 'dev'
}));

// Get reference to the mocked module for manipulation in tests
const mockEnv = require('../Shared/env');

let dispatch: jest.Mock;
let getState: jest.Mock;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

describe('Theme Effects', () => {
  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
    jest.clearAllMocks();

    // Reset window.matchMedia to default mock
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }));
  });

  describe('initializeTheme', () => {
    it('dispatches setThemeLoading(true) at start', () => {
      initializeTheme()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setThemeLoading(true));
    });

    it('dispatches setThemeLoading(false) at end', () => {
      initializeTheme()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setThemeLoading(false));
    });

    describe('when saved theme exists', () => {
      beforeEach(() => {
        mockLocalStorage.getItem.mockReturnValue(THEME_MODES.DARK);
        initializeTheme()(dispatch);
      });

      it('retrieves theme from localStorage', () => {
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
          THEME_STORAGE_KEY
        );
      });

      it('dispatches changeTheme with saved theme', () => {
        expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.DARK));
      });
    });

    describe('when no saved theme exists', () => {
      beforeEach(() => {
        mockLocalStorage.getItem.mockReturnValue(null);
      });

      it('uses system preference when user prefers dark in non-prod environment', () => {
        // Ensure we're in non-prod environment
        mockEnv.REACT_APP_ENV = 'dev';

        const mockMatchMedia = jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn()
        }));

        window.matchMedia = mockMatchMedia;

        initializeTheme()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.DARK));
      });

      it('defaults to light when system does not prefer dark in non-prod environment', () => {
        // Ensure we're in non-prod environment
        mockEnv.REACT_APP_ENV = 'dev';

        const mockMatchMedia = jest.fn().mockImplementation(query => ({
          matches: false, // User does not prefer dark
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn()
        }));

        window.matchMedia = mockMatchMedia;

        initializeTheme()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.LIGHT));
      });

      describe('in production environment', () => {
        beforeEach(() => {
          // Set environment to production
          mockEnv.REACT_APP_ENV = 'prod';
        });

        afterEach(() => {
          // Reset environment to dev
          mockEnv.REACT_APP_ENV = 'dev';
        });

        it('always uses light theme regardless of system preference', () => {
          // Mock localStorage to return null (no saved theme)
          mockLocalStorage.getItem.mockReturnValue(null);

          // Mock system preference to prefer dark (should be ignored)
          const mockMatchMedia = jest.fn().mockImplementation(query => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
          }));

          window.matchMedia = mockMatchMedia;

          initializeTheme()(dispatch);

          // Should always dispatch light theme in production
          expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.LIGHT));
          // matchMedia should not be called in production
          expect(mockMatchMedia).not.toHaveBeenCalled();
        });
      });
    });

    describe('when localStorage access fails', () => {
      beforeEach(() => {
        mockLocalStorage.getItem.mockImplementation(() => {
          throw new Error('localStorage not available');
        });
        jest.spyOn(console, 'warn').mockImplementation(() => {});
      });

      afterEach(() => {
        (console.warn as jest.Mock).mockRestore();
      });

      it('falls back to light theme', () => {
        initializeTheme()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.LIGHT));
      });

      it('logs warning', () => {
        initializeTheme()(dispatch);

        expect(console.warn).toHaveBeenCalledWith(
          'Theme initialization failed:',
          expect.any(Error)
        );
      });
    });
  });

  describe('toggleTheme', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        theme: { currentTheme: THEME_MODES.LIGHT }
      });
    });

    it('toggles from light to dark', () => {
      toggleTheme()(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.DARK));
    });

    it('saves new theme to localStorage', () => {
      toggleTheme()(dispatch, getState);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        THEME_STORAGE_KEY,
        THEME_MODES.DARK
      );
    });

    it('toggles from dark to light', () => {
      getState.mockReturnValue({
        theme: { currentTheme: THEME_MODES.DARK }
      });

      toggleTheme()(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.LIGHT));
    });

    describe('when localStorage save fails', () => {
      beforeEach(() => {
        mockLocalStorage.setItem.mockImplementation(() => {
          throw new Error('localStorage save failed');
        });
        jest.spyOn(console, 'warn').mockImplementation(() => {});
      });

      afterEach(() => {
        (console.warn as jest.Mock).mockRestore();
      });

      it('still changes theme even if saving fails', () => {
        toggleTheme()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.DARK));
      });

      it('logs warning', () => {
        toggleTheme()(dispatch, getState);

        expect(console.warn).toHaveBeenCalledWith(
          'Failed to save theme preference:',
          expect.any(Error)
        );
      });
    });
  });

  describe('setTheme', () => {
    it('dispatches changeTheme with provided theme', () => {
      setTheme(THEME_MODES.DARK)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.DARK));
    });

    it('saves theme to localStorage', () => {
      setTheme(THEME_MODES.DARK)(dispatch);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        THEME_STORAGE_KEY,
        THEME_MODES.DARK
      );
    });

    describe('when localStorage save fails', () => {
      beforeEach(() => {
        mockLocalStorage.setItem.mockImplementation(() => {
          throw new Error('localStorage save failed');
        });
        jest.spyOn(console, 'warn').mockImplementation(() => {});
      });

      afterEach(() => {
        (console.warn as jest.Mock).mockRestore();
      });

      it('still changes theme even if saving fails', () => {
        setTheme(THEME_MODES.DARK)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(changeTheme(THEME_MODES.DARK));
      });

      it('logs warning', () => {
        setTheme(THEME_MODES.DARK)(dispatch);

        expect(console.warn).toHaveBeenCalledWith(
          'Failed to save theme preference:',
          expect.any(Error)
        );
      });
    });
  });
});
