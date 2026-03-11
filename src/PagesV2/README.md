# PagesV2

New pages built with the ThemeV2 system. This folder contains pages that use the abstract color naming system and are completely isolated from v1 pages.

## Architecture

All v2 pages follow a consistent pattern:

1. **ThemeV2Provider wrapper** - Enables v2 theme system
2. **Shared components** - Common NavBar and Footer
3. **Isolated styles** - Use CSS custom properties with `--theme-v2-` prefix
4. **Separate routing** - Dedicated routes (e.g., `/AboutV2`)

## Folder Structure

```
src/PagesV2/
├── README.md                # This file
├── Shared/                  # Shared v2 components
│   ├── NavBar.tsx
│   ├── NavBar.scss
│   ├── Footer.tsx
│   └── Footer.scss
└── About/                   # Example v2 page
    ├── AboutV2.tsx
    ├── AboutV2.scss
    └── AboutIllustration.tsx
```

## Shared Components

### NavBar

Fixed-top navigation bar for all v2 pages.

**Features:**

- Dark background (`--theme-v2-navbar`)
- Logo and site title
- Navigation links (Sobre nós, Perguntas Frequentes, Fale com a gente)
- Primary CTA button (Fazer login)
- Responsive hamburger menu on mobile

**Usage:**

```tsx
import NavBar from '../Shared/NavBar';

<NavBar />;
```

**Customization:**

Update navigation links in [`NavBar.tsx`](./Shared/NavBar.tsx):

```tsx
<a href="/AboutV2" className="navbar-v2-link">
  Sobre nós
</a>
```

### Footer

Consistent footer for all v2 pages.

**Features:**

- Social media icons (Instagram, Facebook, Twitter, LinkedIn)
- Copyright attribution with animated heart
- License information (MIT + CC BY SA 4.0)
- Build number display

**Usage:**

```tsx
import Footer from '../Shared/Footer';

<Footer />;
```

**Social Links:**

Update social media URLs in [`Footer.tsx`](./Shared/Footer.tsx):

```tsx
<a
  href="https://instagram.com/yourhandle"
  target="_blank"
  rel="noopener noreferrer"
  className="footer-v2-social-link"
>
  <i className="fab fa-instagram"></i>
</a>
```

## Creating a New V2 Page

### Step 1: Create Page Folder

```bash
mkdir src/PagesV2/MyFeature
```

### Step 2: Create Component File

```tsx
// src/PagesV2/MyFeature/MyFeatureV2.tsx
import React from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import './MyFeatureV2.scss';

const MyFeatureV2: React.FC = () => {
  return (
    <ThemeV2Provider>
      <div className="myfeature-v2-wrapper">
        <NavBar />
        <main className="myfeature-v2-page">
          <div className="myfeature-v2-container">
            {/* Your content here */}
            <h1>My Feature</h1>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
};

export default MyFeatureV2;
```

### Step 3: Create Styles

```scss
// src/PagesV2/MyFeature/MyFeatureV2.scss
@import '../../Shared/styles/colorsV2.scss';

.myfeature-v2-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--theme-v2-background);
}

.myfeature-v2-page {
  flex: 1;
  margin-top: 64px; // Height of navbar
  padding: 4rem 2rem;
}

.myfeature-v2-container {
  max-width: 1200px;
  margin: 0 auto;
}

// Mobile responsive
@media (max-width: 768px) {
  .myfeature-v2-page {
    padding: 2rem 1rem;
  }
}
```

### Step 4: Add Route

```tsx
// src/App.tsx
import MyFeatureV2 from './PagesV2/MyFeature/MyFeatureV2';

// In the Switch statement:
<Route path="/MyFeatureV2" component={MyFeatureV2} />;
```

### Step 5: Import Styles

```scss
// src/index.scss
@import './PagesV2/MyFeature/MyFeatureV2.scss';
```

## Page Layout Pattern

All v2 pages follow this structure:

```tsx
<ThemeV2Provider>
  <div className="[page]-v2-wrapper">
    {' '}
    {/* Flex container */}
    <NavBar /> {/* Fixed top */}
    <main className="[page]-v2-page">
      {' '}
      {/* Flex: 1, margin-top: 64px */}
      <div className="[page]-v2-container">
        {' '}
        {/* Max-width: 1200px */}
        {/* Page content */}
      </div>
    </main>
    <Footer /> {/* Margin-top: auto */}
  </div>
</ThemeV2Provider>
```

## Styling Guidelines

### Use CSS Custom Properties

```scss
// ✅ Good
.my-element {
  background-color: var(--theme-v2-background);
  color: var(--theme-v2-text);
}

// ❌ Bad - hardcoded colors
.my-element {
  background-color: #efeae3;
  color: #1d1d1b;
}
```

### Reference Abstract Color Names

```scss
// ✅ Good - semantic/abstract
.my-card {
  background: var(--theme-v2-backgroundSecondary); // neutral-100
  border: 1px solid var(--theme-v2-border); // neutral-500
}

// ❌ Bad - visual descriptions
.my-card {
  background: var(--white);
  border: 1px solid var(--gray);
}
```

### Use Utility Classes

```tsx
// ✅ Good - utility classes
<div className="card-v2 themed-v2-shadow">
  <p className="text-v2-secondary">Content</p>
</div>

// ⚠️ OK but verbose - inline styles
<div style={{
  backgroundColor: theme.colors.backgroundSecondary,
  boxShadow: `0 4px 20px ${theme.colors.shadow}`
}}>
  <p style={{ color: theme.colors.textSecondary }}>Content</p>
</div>
```

## Responsive Design

All v2 pages should be mobile-responsive:

```scss
// Desktop first
.myfeature-v2-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

// Tablet
@media (max-width: 1024px) {
  .myfeature-v2-container {
    gap: 3rem;
  }
}

// Mobile
@media (max-width: 768px) {
  .myfeature-v2-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

// Small mobile
@media (max-width: 480px) {
  .myfeature-v2-container {
    gap: 1rem;
  }
}
```

## Common Breakpoints

- **Desktop**: 1200px+ (default)
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: < 480px

## Example Pages

### AboutV2

Reference implementation showcasing:

- Two-column responsive layout
- SVG illustration component
- Content card with proper spacing
- Full ThemeV2 integration

See: [`src/PagesV2/About/AboutV2.tsx`](./About/AboutV2.tsx)

## Naming Conventions

- **Files**: `[Feature]V2.tsx`, `[Feature]V2.scss`
- **Routes**: `/[Feature]V2` (e.g., `/AboutV2`)
- **CSS Classes**: `[feature]-v2-[element]` (e.g., `about-v2-container`)
- **Components**: Named exports with `V2` suffix (e.g., `AboutV2`)

## Best Practices

### ✅ Do

- Wrap every v2 page with `<ThemeV2Provider>`
- Use shared NavBar and Footer components
- Style with CSS custom properties
- Follow mobile-first responsive design
- Test both light and dark themes
- Keep max-width: 1200px for content
- Use semantic HTML (main, article, section, etc.)

### ❌ Don't

- Mix v1 and v2 components on the same page
- Hardcode color values in styles
- Use v1 theme utilities (--theme-\* without v2)
- Create custom headers/footers per page
- Exceed 1440px container width
- Rely on global v1 styles

## TypeScript

All v2 page components should be typed:

```tsx
import React from 'react';

interface MyFeatureV2Props {
  // Props if needed
}

const MyFeatureV2: React.FC<MyFeatureV2Props> = (props) => {
  return (
    // Component JSX
  );
};

export default MyFeatureV2;
```

## Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Test with screen readers
- Maintain WCAG AA contrast ratios
- Add ARIA labels where needed

## SEO

Consider adding React Helmet for metadata:

```tsx
import { Helmet } from 'react-helmet';

<Helmet>
  <title>About | Go Champs</title>
  <meta name="description" content="Learn about Go Champs platform" />
</Helmet>;
```

## Testing Checklist

Before deploying a new v2 page:

- [ ] Page loads without errors
- [ ] Responsive on mobile, tablet, desktop
- [ ] ThemeV2 colors apply correctly
- [ ] NavBar and Footer render properly
- [ ] Links and buttons work
- [ ] Forms validate correctly (if applicable)
- [ ] Accessibility checks pass
- [ ] No console errors or warnings
- [ ] Build succeeds (`npm run build`)
- [ ] Colors validated (`npm run validate-colors -- v2`)

## Migration Path

To migrate existing v1 pages:

1. Create new folder in `PagesV2/`
2. Copy component structure from v1
3. Wrap with `ThemeV2Provider`
4. Replace hardcoded colors with v2 variables
5. Use v2 NavBar and Footer
6. Update route (e.g., `/Feature` → `/FeatureV2`)
7. Test thoroughly
8. Deploy v2 alongside v1
9. Gradually redirect traffic
10. Deprecate v1 version

## Troubleshooting

**Styles not applying:**

- Check SCSS import in index.scss
- Verify CSS custom properties use `--theme-v2-` prefix
- Ensure ThemeV2Provider wraps component

**NavBar/Footer not rendering:**

- Check import paths (relative to PagesV2/)
- Verify SCSS files imported in index.scss

**Page not loading:**

- Check route configuration in App.tsx
- Verify component export is default export
- Look for import errors in browser console

## Future Plans

- [ ] Page transition animations
- [ ] Skeleton loaders for async content
- [ ] Error boundary components
- [ ] Loading states
- [ ] SEO optimizations
- [ ] Progressive enhancement
- [ ] Code splitting per page

## See Also

- [ThemeV2 README](../ThemeV2/README.md) - Theme system documentation
- [Color Names Guide](../ThemeV2/color-names.ts) - Color system philosophy
- [Validation Script](../../scripts/validate-colors.js) - Color validation tool
