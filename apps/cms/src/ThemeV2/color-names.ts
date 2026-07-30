/**
 * ThemeV2 Color Naming System
 *
 * Abstract color naming for scalable, maintainable, and brand-agnostic theming.
 *
 * PHILOSOPHY:
 * - Abstract names avoid color-specific assumptions (e.g., "neutral" vs "gray")
 * - Numeric scales provide clear hierarchy and relationships
 * - Letter-based accents are neutral and don't imply visual characteristics
 * - This system supports theme switching and rebranding without name changes
 *
 * NEUTRAL SCALE (100 - 900):
 * - 100: Lightest - Use for cards, modals, light backgrounds
 * - 300: Light - Use for page backgrounds, subtle differentiation
 * - 500: Mid-tone - Use for secondary text, borders, disabled states
 * - 700: Dark - Use for inverted UI elements, dark surfaces
 * - 900: Darkest - Use for primary text, strong contrast elements
 *
 * ACCENT SYSTEM (a - d):
 * - accent-a: Primary brand color - Use for CTAs, primary actions, key highlights
 * - accent-b: Secondary accent - Use for illustrations, visual interest, variety
 * - accent-c: Tertiary brand color - Use for hover states, secondary actions
 * - accent-d: Quaternary accent - Use sparingly for additional variety
 *
 * STATUS COLORS:
 * - status-success: Positive feedback, successful operations
 * - status-warning: Caution, potentially problematic states
 * - status-error: Errors, destructive actions, critical feedback
 * - status-info: Informational messages, neutral notifications
 *
 * USAGE GUIDELINES:
 *
 * Background Colors:
 * - Page backgrounds: neutral-300 (light mode), neutral-900 (dark mode)
 * - Card backgrounds: neutral-100 (light mode), neutral-700 (dark mode)
 * - Elevated surfaces: neutral-100 with shadow (light mode)
 *
 * Text Colors:
 * - Primary text: neutral-900 (light mode), neutral-100 (dark mode)
 * - Secondary text: neutral-500 (both modes, good mid-contrast)
 * - Placeholder text: neutral-500 with reduced opacity
 *
 * Interactive Elements:
 * - Primary buttons: accent-a background, neutral-100 text
 * - Secondary buttons: neutral-100 background, accent-a text (with accent-a border)
 * - Links: accent-a color, accent-c on hover
 * - Focus states: accent-a outline
 *
 * Borders & Dividers:
 * - Strong borders: neutral-500
 * - Subtle dividers: neutral-300 (light mode), neutral-700 (dark mode)
 * - Focus/active borders: accent-a
 *
 * ACCESSIBILITY:
 * - Ensure WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
 * - Test all color combinations in both light and dark modes
 * - Use accent colors purposefully to maintain visual hierarchy
 */

export const COLOR_USAGE = {
  neutrals: {
    100: 'Cards, modals, light backgrounds',
    300: 'Page backgrounds, subtle surfaces',
    500: 'Secondary text, borders, disabled states',
    700: 'Dark surfaces, inverted UI',
    900: 'Primary text, high contrast elements'
  },
  accents: {
    a: 'Primary brand - CTAs, primary actions',
    b: 'Secondary accent - illustrations, highlights',
    c: 'Tertiary brand - hover states, secondary actions',
    d: 'Quaternary accent - additional variety'
  },
  status: {
    success: 'Positive feedback, successful operations',
    warning: 'Caution, warnings, potentially problematic states',
    error: 'Errors, destructive actions, critical feedback',
    info: 'Informational messages, neutral notifications'
  }
};
