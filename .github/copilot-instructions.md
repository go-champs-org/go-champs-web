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

## Testing
- Components: no unit tests required.
- Helper/logic functions: unit test them.
- Cypress E2E: keep low count, only add when dev explicitly wants one.
