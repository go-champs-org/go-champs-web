# Theme Switcher System

A comprehensive theming system for the Go Champs web application that supports light and dark themes with smooth transitions and persistent user preferences.

## Features

- **Light and Dark Themes**: Pre-built themes optimized for readability and accessibility
- **Persistent Preferences**: User theme choice is saved in localStorage
- **System Preference Detection**: Automatically detects user's system preference on first visit
- **CSS Custom Properties**: Modern CSS-based theming for easy maintenance
- **Multiple Switcher Variants**: Toggle button, dropdown, and button group options
- **Redux Integration**: Fully integrated with the existing Redux store
- **Smooth Transitions**: Elegant transitions between themes
- **TypeScript Support**: Fully typed for better developer experience

## Components

### ThemeProvider

Wraps the entire application and manages theme state and CSS custom properties.

```tsx
import { ThemeProvider } from './Theme';

<ThemeProvider>
  <App />
</ThemeProvider>;
```

### ThemeSwitcher

A flexible component for switching between themes with multiple variants:

```tsx
import { ThemeSwitcher } from './Theme';

// Toggle button (default)
<ThemeSwitcher />

// Dropdown select
<ThemeSwitcher variant="select" />

// Button group
<ThemeSwitcher variant="buttons" />

// With custom styling
<ThemeSwitcher
  variant="toggle"
  className="my-custom-class"
  showLabel={false}
/>
```

### useTheme Hook

A React hook for accessing theme information and controls:

```tsx
import { useTheme } from './Theme';

const MyComponent = () => {
  const { theme, currentTheme, toggleTheme, setTheme, isLoading } = useTheme();

  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      <p>Current theme: {currentTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

## CSS Custom Properties

The theme system uses CSS custom properties that are automatically updated when the theme changes:

```css
.my-component {
  background-color: var(--theme-background);
  color: var(--theme-text);
  border: 1px solid var(--theme-border);
}
```

### Available CSS Variables

#### Colors

- `--theme-primary`: Primary brand color
- `--theme-secondary`: Secondary brand color
- `--theme-accent`: Accent color for highlights

#### Backgrounds

- `--theme-background`: Main background color
- `--theme-backgroundSecondary`: Secondary background color
- `--theme-backgroundTertiary`: Tertiary background color

#### Text

- `--theme-text`: Primary text color
- `--theme-textSecondary`: Secondary text color
- `--theme-textInverted`: Inverted text color (for dark backgrounds)

#### UI Elements

- `--theme-border`: Border color
- `--theme-navbar`: Navbar background color
- `--theme-navbarText`: Navbar text color
- `--theme-navbarHover`: Navbar hover color
- `--theme-button`: Button background color
- `--theme-buttonText`: Button text color

#### Status Colors

- `--theme-success`: Success state color
- `--theme-warning`: Warning state color
- `--theme-error`: Error state color
- `--theme-info`: Info state color

#### Effects

- `--theme-shadow`: Box shadow color
- `--theme-shadowLight`: Light shadow color

## Utility Classes

Predefined utility classes for common theming needs:

```css
.themed-bg {
  background-color: var(--theme-background);
}
.themed-bg-secondary {
  background-color: var(--theme-backgroundSecondary);
}
.themed-text {
  color: var(--theme-text);
}
.themed-text-secondary {
  color: var(--theme-textSecondary);
}
.themed-border {
  border-color: var(--theme-border);
}
.themed-shadow {
  box-shadow: themed shadow;
}
```

## Theme Data Structure

```typescript
import { ThemeMode } from './Theme/types';

interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    text: string;
    textSecondary: string;
    textInverted: string;
    border: string;
    navbar: string;
    navbarText: string;
    navbarHover: string;
    button: string;
    buttonText: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    shadow: string;
    shadowLight: string;
  };
}
```

## Redux Actions

### Change Theme

```typescript
import { changeTheme } from './Theme/actions';
import { THEME_MODES } from './Theme/constants';

dispatch(changeTheme(THEME_MODES.DARK));
```

### Toggle Theme

```typescript
import { toggleTheme } from './Theme/effects';

dispatch(toggleTheme());
```

### Initialize Theme

```typescript
import { initializeTheme } from './Theme/effects';

// Called automatically by ThemeProvider
dispatch(initializeTheme());
```

## Browser Support

- All modern browsers supporting CSS custom properties
- Graceful fallback for older browsers
- localStorage support for persistence

## Accessibility

- Respects user's system theme preference
- High contrast ratios in both themes
- Keyboard navigation support for all switcher variants
- ARIA labels and descriptions

## File Structure

```
src/Theme/
├── index.ts           # Main exports
├── types.ts           # TypeScript interfaces
├── themes.ts          # Theme definitions
├── actions.ts         # Redux actions
├── reducer.ts         # Redux reducer
├── selectors.ts       # Redux selectors
├── effects.ts         # Async actions and persistence
├── state.ts           # Initial state
├── ThemeProvider.tsx  # Theme provider component
├── ThemeSwitcher.tsx  # Theme switcher component
├── useTheme.ts        # React hook
└── theme.scss         # CSS styles and variables
```

## Customization

### Adding New Themes

1. Define new theme colors in `themes.ts`
2. Add theme to the themes object
3. Update TypeScript types if needed

### Customizing Colors

Modify the color definitions in `themes.ts`:

```typescript
export const myCustomTheme: Theme = {
  mode: 'custom',
  colors: {
    primary: '#your-color'
    // ... other colors
  }
};
```

### Adding Custom CSS Properties

Add new properties to the theme application logic in `ThemeProvider.tsx` and update the CSS accordingly.

## Performance

- Minimal runtime overhead
- CSS custom properties for efficient style updates
- Debounced localStorage operations
- No unnecessary re-renders

## Testing

The theme system includes comprehensive error handling:

- Graceful fallbacks for localStorage issues
- Default theme when preferences are unavailable
- Console warnings for debugging

## Migration

To migrate existing components to use theming:

1. Replace hardcoded colors with CSS custom properties
2. Add themed utility classes where appropriate
3. Test both light and dark themes
4. Ensure sufficient contrast ratios
