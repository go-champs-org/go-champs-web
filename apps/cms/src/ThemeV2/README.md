# ThemeV2 System

A completely new theming system (v2) designed to coexist with the existing theme system (v1). ThemeV2 introduces an **abstract color naming** convention with a minimal palette, providing a scalable and maintainable foundation for new pages.

## Why ThemeV2?

- **Parallel Migration**: Build new pages with v2 while keeping existing pages on v1
- **Abstract Naming**: Color names like `neutral-500` and `accent-a` are brand-agnostic and support easy rebranding
- **Minimal Palette**: Only ~12 core colors reduce decision fatigue and improve consistency
- **Isolated System**: Separate Redux state, CSS variables, and components prevent conflicts

## Key Features

- **Light & Dark Themes**: Pre-configured theme modes with proper contrast ratios
- **Abstract Color System**: Neutral scale (100-900) and accent letters (a-d)
- **CSS Custom Properties**: All colors exposed as `--theme-v2-*` CSS variables
- **Redux Integration**: Full state management with localStorage persistence
- **TypeScript Support**: Comprehensive type definitions
- **Validation Tools**: Built-in script to validate color mappings

## Quick Start

### 1. Wrap Your Page with ThemeV2Provider

```tsx
import { ThemeV2Provider } from '../../ThemeV2';

const MyNewPage: React.FC = () => {
  return (
    <ThemeV2Provider>
      <div>Your page content</div>
    </ThemeV2Provider>
  );
};
```

### 2. Use CSS Custom Properties

```scss
.my-component {
  background-color: var(--theme-v2-background);
  color: var(--theme-v2-text);
  border: 1px solid var(--theme-v2-border);
}
```

### 3. Access Theme in JavaScript

```tsx
import { useThemeV2 } from '../../ThemeV2';

const MyComponent = () => {
  const { theme, currentTheme, toggleTheme } = useThemeV2();

  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      Current theme: {currentTheme}
    </div>
  );
};
```

## Color System

### Neutrals (100-900)

Grayscale from lightest to darkest:

- `$neutral-100` (#ffffff) - Pure white, cards, light backgrounds
- `$neutral-300` (#efeae3) - Warm cream, page backgrounds
- `$neutral-500` (#4a4a4a) - Medium gray, secondary text, borders
- `$neutral-700` (#2c2c2c) - Dark charcoal, navbar, dark UI elements
- `$neutral-900` (#1d1d1b) - Near black, primary text

### Accents (a-d)

Brand and highlight colors:

- `$accent-a` (#a6cd63) - Primary green, main brand color
- `$accent-b` (#f4d35e) - Golden yellow, illustrations, highlights
- `$accent-c` (#7a9949) - Dark green, secondary brand
- `$accent-d` (#509187) - Teal/cyan, tertiary accent

### Status Colors

Feedback and alerts:

- `$status-success` (#4caf50) - Green
- `$status-warning` (#ff9800) - Orange
- `$status-error` (#f44336) - Red
- `$status-info` (#2196f3) - Blue

## Available CSS Variables

All theme properties are available as CSS custom properties with the `--theme-v2-` prefix:

### Colors

- `--theme-v2-primary`
- `--theme-v2-secondary`
- `--theme-v2-accent`

### Backgrounds

- `--theme-v2-background`
- `--theme-v2-backgroundSecondary`
- `--theme-v2-backgroundTertiary`

### Text

- `--theme-v2-text`
- `--theme-v2-textSecondary`
- `--theme-v2-textInverted`
- `--theme-v2-textHover`
- `--theme-v2-textPlaceholder`

### UI Elements

- `--theme-v2-border`
- `--theme-v2-navbar`
- `--theme-v2-navbarText`
- `--theme-v2-navbarHover`
- `--theme-v2-button`
- `--theme-v2-buttonText`

### Status

- `--theme-v2-success`
- `--theme-v2-warning`
- `--theme-v2-error`
- `--theme-v2-info`

### Effects

- `--theme-v2-shadow`
- `--theme-v2-shadowLight`

## Utility Classes

Pre-built utility classes for common patterns:

```scss
// Backgrounds
.themed-v2-bg
.themed-v2-bg-secondary
.themed-v2-bg-tertiary

// Text
.themed-v2-text
.themed-v2-text-secondary
.themed-v2-text-inverted

// Borders & Shadows
.themed-v2-border
.themed-v2-shadow
.themed-v2-shadow-light

// Buttons
.button-v2
.button-v2-outline
.button-v2-secondary
.button-v2-small
.button-v2-large

// Cards
.card-v2
.card-v2-bordered

// Status
.status-v2-success
.status-v2-warning
.status-v2-error
.status-v2-info
```

## Light vs Dark Theme Mappings

### Light Theme

- Background: `neutral-300` (cream)
- Surface: `neutral-100` (white)
- Text: `neutral-900` (near black)
- Secondary text: `neutral-500` (gray)

### Dark Theme

- Background: `neutral-900` (near black)
- Surface: `neutral-700` (dark charcoal)
- Text: `neutral-100` (white)
- Secondary text: `neutral-300` (light gray)

## Redux State Management

ThemeV2 uses a separate Redux slice (`themeV2`) from the original theme system:

```typescript
// State shape
{
  themeV2: {
    currentTheme: 'light' | 'dark',
    isLoading: boolean
  }
}

// Actions
changeTheme(theme: ThemeMode)
setThemeLoading(isLoading: boolean)

// Effects (thunks)
initializeTheme() // Called automatically by ThemeV2Provider
toggleTheme()     // Switch between light/dark
setTheme(theme)   // Set specific theme
```

### LocalStorage

Theme preference is saved separately as `'go-champs-theme-v2'` (different from v1's `'go-champs-theme'`).

## File Structure

```
src/ThemeV2/
├── index.ts                 # Public exports
├── types.ts                 # TypeScript interfaces
├── constants.ts             # Theme modes, storage key
├── themes.ts                # Theme definitions
├── color-mapping.ts         # SCSS → hex mappings
├── color-names.ts           # Color system documentation
├── actions.ts               # Redux actions
├── reducer.ts               # Redux reducer
├── selectors.ts             # Redux selectors
├── effects.ts               # Redux thunks
├── state.ts                 # Initial state
├── ThemeV2Provider.tsx      # Provider component
├── useThemeV2.ts            # React hook
└── theme.scss               # Base styles & utilities
```

## Validation

Ensure color consistency between SCSS and TypeScript:

```bash
# Validate both v1 and v2
npm run validate-colors

# Validate v2 only
npm run validate-colors -- v2

# Or directly
node scripts/validate-colors.js validate v2
```

## Example: AboutV2 Page

Reference implementation at [`src/PagesV2/About/AboutV2.tsx`](../PagesV2/About/AboutV2.tsx):

```tsx
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';

const AboutV2: React.FC = () => {
  return (
    <ThemeV2Provider>
      <div className="about-v2-wrapper">
        <NavBar />
        <main className="about-v2-page">{/* Content with v2 styles */}</main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
};
```

## Migration Guide

### Creating a New V2 Page

1. **Create page component** in `src/PagesV2/[Feature]/`
2. **Wrap with ThemeV2Provider**
3. **Use v2 NavBar and Footer** from `PagesV2/Shared/`
4. **Style with CSS custom properties** (`--theme-v2-*`)
5. **Add route** in `App.tsx`
6. **Import SCSS** in `index.scss`

### Do's and Don'ts

✅ **DO:**

- Use CSS custom properties for all colors
- Reference abstract color names in SCSS
- Keep v2 pages completely isolated from v1
- Test both light and dark themes

❌ **DON'T:**

- Mix v1 and v2 theme systems on the same page
- Hardcode color values
- Import v1 Theme components in v2 pages
- Modify existing v1 pages during migration

## Browser Support

- All modern browsers with CSS custom property support
- Graceful fallback for browsers without localStorage
- High contrast ratios for accessibility (WCAG AA compliant)

## Accessibility

All color combinations meet WCAG AA standards:

- Normal text: 4.5:1 contrast ratio minimum
- Large text: 3:1 contrast ratio minimum
- Interactive elements: clearly distinguishable focus states

## Performance

- Minimal runtime overhead
- CSS custom properties for efficient updates
- Debounced localStorage operations
- Separate Redux state prevents v1/v2 interference

## Troubleshooting

**Colors not applying:**

- Ensure ThemeV2Provider wraps your component
- Check that CSS custom properties use `--theme-v2-` prefix
- Verify SCSS imports in index.scss

**Theme not persisting:**

- Check browser localStorage permissions
- Verify storage key is `'go-champs-theme-v2'`

**Validation errors:**

- Run `npm run validate-colors -- v2`
- Ensure all SCSS variables in colorsV2.scss are mapped in color-mapping.ts
- Check hex values match exactly

## Future Enhancements

Potential improvements for ThemeV2:

- [ ] Auto dark mode based on system preference
- [ ] Additional theme modes (high contrast, compact)
- [ ] Color blindness simulation tools
- [ ] Automatic contrast checking
- [ ] Theme customization UI
- [ ] Per-page theme overrides

## See Also

- [PagesV2 README](../PagesV2/README.md) - V2 pages architecture
- [Color Names Documentation](./color-names.ts) - Detailed color system guide
- [AboutV2 Example](../PagesV2/About/AboutV2.tsx) - Reference implementation
