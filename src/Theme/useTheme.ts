import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../store';
import { currentTheme, isThemeLoading } from './selectors';
import { toggleTheme, setTheme } from './effects';
import { themes } from './themes';
import { ThemeMode } from './types';

export const useTheme = () => {
  const dispatch = useDispatch();
  const currentThemeMode = useSelector((state: StoreState) =>
    currentTheme(state)
  );
  const isLoading = useSelector((state: StoreState) => isThemeLoading(state));

  const theme = themes[currentThemeMode];

  const handleToggleTheme = () => {
    dispatch(toggleTheme() as any);
  };

  const handleSetTheme = (newTheme: ThemeMode) => {
    dispatch(setTheme(newTheme) as any);
  };

  return {
    theme,
    currentTheme: currentThemeMode,
    isLoading,
    toggleTheme: handleToggleTheme,
    setTheme: handleSetTheme
  };
};
