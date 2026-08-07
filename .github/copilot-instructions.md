# Copilot Review Instructions

## Functional programming
- Prefer functional style: no mutations, pure functions (same input → same output).

## Modern JavaScript
- Use array functions (map/filter/reduce/etc), not `for` loops.
- No lodash — use native JS/array methods instead.

## Components
- Component names/declarations start with `function` (not arrow, not class).
- Components stay dumb: delegate logic to plain functions that are unit-testable.
- Plain helper functions use arrow syntax.
- Max 2 return statements per component, unless it's a switch/dispatcher component rendering different components per key.
- Never return `null` or `<>...</>` (empty fragment) from a component — decide whether to render in the parent instead.

## Complexity
- Functions are capped at cognitive complexity 3 (`sonarjs/cognitive-complexity` in apps/cms, Biome's `noExcessiveCognitiveComplexity` in apps/public) — a chain of 4+ if/else-if branches trips it; a switch or lookup object/dictionary doesn't (it counts as one unit regardless of case count).
- The lint rule only warns, it doesn't fail CI — so flag it yourself: if a new or changed function in the diff crosses complexity 3, call it out and suggest a switch/dictionary refactor.
- Don't flag existing violations outside the diff — those are known tech debt, not something this PR introduced.

## Testing
- Components: no unit tests required.
- Helper/logic functions: unit test them.
- Cypress E2E: keep low count, only add when dev explicitly wants one.
