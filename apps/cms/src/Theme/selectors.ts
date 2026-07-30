import { StoreState } from '../store';

export const currentTheme = (state: StoreState) => state.theme.currentTheme;
export const isThemeLoading = (state: StoreState) => state.theme.isLoading;
