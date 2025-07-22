# Color Validation Scripts

This directory contains scripts to validate and maintain consistency between SCSS color variables and the theme system.

## Files

- **`validate-colors.js`** - Main validation script

## Scripts

### `yarn validate-colors`

Validates that all SCSS color variables in `src/Shared/styles/colors.scss` are properly mapped in `src/Theme/color-mapping.ts`.

**Example output:**
```
🔍 Validating SCSS color mapping...

📊 Found 16 SCSS variables
📊 Found 16 mapped variables

📋 VALIDATION RESULTS:
==================================================
✅ 16 variables correctly mapped

==================================================
✅ VALIDATION PASSED - All colors are correctly mapped!
```

### `yarn validate-colors:generate`

Generates missing color mapping entries that need to be added to `color-mapping.ts`.

**Example output:**
```
📝 Missing entries for scssColorMapping:

  '$new-color': '#123456',
  '$another-color': '#789abc',
```

## CI/CD Integration

The validation runs automatically in GitHub Actions:

1. **Pull Request CI** (`main.yml`) - Runs on all PRs
2. **Master CI** (`master-ci.yml`) - Runs on master branch pushes  
3. **Theme Validation** (`theme-validation.yml`) - Runs when theme files change

## Manual Usage

```bash
# Validate colors
yarn validate-colors

# Generate missing entries
yarn validate-colors:generate

# Get help
node scripts/validate-colors.js help
```

## Adding New Colors

1. Add the color to `src/Shared/styles/colors.scss`:
   ```scss
   $my-new-color: #123456;
   ```

2. Run validation to see what's missing:
   ```bash
   yarn validate-colors:generate
   ```

3. Add the mapping to `src/Theme/color-mapping.ts`:
   ```typescript
   export const scssColorMapping = {
     // ... existing colors
     '$my-new-color': '#123456',
   };
   ```

4. Use the color in your theme definitions:
   ```typescript
   lightTheme: {
     someProperty: '$my-new-color',
     // ...
   }
   ```

## Troubleshooting

### Validation fails with "Missing variables"

Add the missing variables to `scssColorMapping` in `color-mapping.ts`.

### Validation fails with "Mismatched values"  

Update the hex values in `color-mapping.ts` to match `colors.scss`.

### Build fails after adding colors

Make sure the new colors are properly mapped and used in theme definitions.

## How It Works

1. **Parses SCSS**: Extracts `$variable: value;` definitions from `colors.scss`
2. **Parses TypeScript**: Extracts mappings from `scssColorMapping` object
3. **Compares**: Ensures every SCSS variable has a corresponding mapping
4. **Validates Values**: Checks that hex values match between files
5. **Reports**: Shows missing, extra, or mismatched color definitions

This ensures a single source of truth for colors across SCSS and TypeScript theme systems.
