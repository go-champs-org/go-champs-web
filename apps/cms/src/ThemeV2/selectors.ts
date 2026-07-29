import { StoreState } from '../store';

export const currentTheme = (state: StoreState) => state.themeV2.currentTheme;
export const isThemeLoading = (state: StoreState) => state.themeV2.isLoading;
