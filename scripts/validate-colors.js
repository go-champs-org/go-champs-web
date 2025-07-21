#!/usr/bin/env node

/**
 * Validation script for SCSS color mapping
 * 
 * This script:
 * 1. Parses colors.scss to extract all SCSS variables
 * 2. Checks if all SCSS variables are defined in color-mapping.ts
 * 3. Validates that hex values match between files
 * 4. Reports missing or mismatched colors
 */

const fs = require('fs');
const path = require('path');

// File paths
const COLORS_SCSS_PATH = path.join(__dirname, '../src/Shared/styles/colors.scss');
const COLOR_MAPPING_PATH = path.join(__dirname, '../src/Theme/color-mapping.ts');

/**
 * Parse SCSS file to extract variable definitions
 * @param {string} scssContent - Content of the SCSS file
 * @returns {Object} Map of variable names to values
 */
function parseScssVariables(scssContent) {
  const variables = {};
  
  // Regex to match SCSS variable definitions: $variable-name: #value;
  const variableRegex = /\$([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  
  let match;
  while ((match = variableRegex.exec(scssContent)) !== null) {
    const varName = `$${match[1]}`;
    const value = match[2].trim();
    variables[varName] = value;
  }
  
  return variables;
}

/**
 * Parse TypeScript color mapping file
 * @param {string} tsContent - Content of the TypeScript file
 * @returns {Object} Map of variable names to values
 */
function parseColorMapping(tsContent) {
  const mapping = {};
  
  // Extract the scssColorMapping object content more precisely
  const mappingMatch = tsContent.match(/export const scssColorMapping = \{([\s\S]*?)\n\};/);
  if (!mappingMatch) {
    throw new Error('Could not find scssColorMapping in color-mapping.ts');
  }

  const mappingContent = mappingMatch[1];
  
  // Regex to match mapping entries: '$variable': '#value', 
  // Only match lines that are actual mapping entries (not comments)
  const lines = mappingContent.split('\n');

  lines.forEach(line => {
    // Skip comments and empty lines
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed === '' || trimmed.startsWith('/*')) {
      return;
    }
    
    // Match the mapping pattern - handle both quoted and unquoted keys
    // Pattern 1: quoted keys '$variable': '#value'
    let entryMatch = trimmed.match(/['"](\$[a-zA-Z0-9_-]+)['"]\s*:\s*['"]([^'"]+)['"],?/);

    // Pattern 2: unquoted keys $variable: '#value'
    if (!entryMatch) {
      entryMatch = trimmed.match(/(\$[a-zA-Z0-9_-]+)\s*:\s*['"]([^'"]+)['"],?/);
    }

    if (entryMatch) {
      const varName = entryMatch[1];
      const value = entryMatch[2];
      mapping[varName] = value;
    }
  });
  
  return mapping;
}

/**
 * Validate color mapping against SCSS variables
 */
function validateColorMapping() {
  console.log('🔍 Validating SCSS color mapping...\n');
  
  try {
    // Read files
    const scssContent = fs.readFileSync(COLORS_SCSS_PATH, 'utf8');
    const tsContent = fs.readFileSync(COLOR_MAPPING_PATH, 'utf8');
    
    // Parse variables
    const scssVariables = parseScssVariables(scssContent);
    const colorMapping = parseColorMapping(tsContent);
    
    console.log(`📊 Found ${Object.keys(scssVariables).length} SCSS variables`);
    console.log(`📊 Found ${Object.keys(colorMapping).length} mapped variables\n`);
    
    // Validation results
    const results = {
      missing: [],
      mismatched: [],
      extra: [],
      valid: 0
    };
    
    // Check for missing and mismatched variables
    Object.entries(scssVariables).forEach(([varName, scssValue]) => {
      if (!colorMapping[varName]) {
        results.missing.push({ varName, scssValue });
      } else if (colorMapping[varName] !== scssValue) {
        results.mismatched.push({
          varName,
          scssValue,
          mappingValue: colorMapping[varName]
        });
      } else {
        results.valid++;
      }
    });
    
    // Check for extra variables in mapping
    Object.entries(colorMapping).forEach(([varName, mappingValue]) => {
      if (!scssVariables[varName]) {
        results.extra.push({ varName, mappingValue });
      }
    });
    
    // Report results
    console.log('📋 VALIDATION RESULTS:');
    console.log('='.repeat(50));
    
    if (results.valid > 0) {
      console.log(`✅ ${results.valid} variables correctly mapped`);
    }
    
    if (results.missing.length > 0) {
      console.log(`\n❌ ${results.missing.length} MISSING variables in color-mapping.ts:`);
      results.missing.forEach(({ varName, scssValue }) => {
        console.log(`   ${varName}: '${scssValue}',`);
      });
      
      console.log('\n📝 Add these to scssColorMapping:');
      results.missing.forEach(({ varName, scssValue }) => {
        console.log(`  '${varName}': '${scssValue}',`);
      });
    }
    
    if (results.mismatched.length > 0) {
      console.log(`\n⚠️  ${results.mismatched.length} MISMATCHED values:`);
      results.mismatched.forEach(({ varName, scssValue, mappingValue }) => {
        console.log(`   ${varName}:`);
        console.log(`     SCSS: ${scssValue}`);
        console.log(`     Mapping: ${mappingValue}`);
      });
    }
    
    if (results.extra.length > 0) {
      console.log(`\n🔍 ${results.extra.length} EXTRA variables in mapping (not in SCSS):`);
      results.extra.forEach(({ varName, mappingValue }) => {
        console.log(`   ${varName}: ${mappingValue}`);
      });
    }
    
    // Summary
    const hasErrors = results.missing.length > 0 || results.mismatched.length > 0;
    
    console.log('\n' + '='.repeat(50));
    if (hasErrors) {
      console.log('❌ VALIDATION FAILED - Please fix the issues above');
      process.exit(1);
    } else {
      console.log('✅ VALIDATION PASSED - All colors are correctly mapped!');
      
      if (results.extra.length > 0) {
        console.log('ℹ️  Note: Extra variables in mapping are not necessarily errors');
      }
    }
    
  } catch (error) {
    console.error('💥 Error during validation:', error.message);
    process.exit(1);
  }
}

/**
 * Generate missing color mapping entries
 */
function generateMissingEntries() {
  try {
    const scssContent = fs.readFileSync(COLORS_SCSS_PATH, 'utf8');
    const tsContent = fs.readFileSync(COLOR_MAPPING_PATH, 'utf8');
    
    const scssVariables = parseScssVariables(scssContent);
    const colorMapping = parseColorMapping(tsContent);
    
    const missing = Object.entries(scssVariables)
      .filter(([varName]) => !colorMapping[varName])
      .map(([varName, value]) => `  '${varName}': '${value}',`)
      .join('\n');
    
    if (missing) {
      console.log('📝 Missing entries for scssColorMapping:');
      console.log('');
      console.log(missing);
    } else {
      console.log('✅ No missing entries - all SCSS variables are mapped!');
    }
    
  } catch (error) {
    console.error('💥 Error generating entries:', error.message);
    process.exit(1);
  }
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'validate':
  case undefined:
    validateColorMapping();
    break;
  case 'generate':
    generateMissingEntries();
    break;
  case 'help':
    console.log(`
SCSS Color Mapping Validator

Usage:
  node validate-colors.js [command]

Commands:
  validate (default)  - Validate color mapping against SCSS
  generate           - Generate missing mapping entries
  help              - Show this help message

Examples:
  node validate-colors.js
  node validate-colors.js validate
  node validate-colors.js generate
`);
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.log('Use "node validate-colors.js help" for usage information');
    process.exit(1);
}
