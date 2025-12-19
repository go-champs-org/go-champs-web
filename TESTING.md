# Testing Guidelines

This document outlines the testing practices and conventions for the Go Champs front-end application.

## Running Tests

We use **Yarn** as our package manager for running tests:

```bash
# Run all tests
yarn test

# Run tests in watch mode (default for development)
yarn test --watchAll

# Run tests for a specific file
yarn test -- --testPathPattern=Games/dataMappers.test.ts

# Run tests without watch mode
yarn test --watchAll=false

# Run tests with coverage
yarn test --coverage
```

## Testing Conventions

### Test Structure

- **Organize tests by feature**: Each module should have its corresponding test file (e.g., `dataMappers.ts` → `dataMappers.test.ts`)
- **Use descriptive describe blocks**: Group related tests using `describe()` blocks
- **Use imperative test names**: Write test names in imperative form, not "should" statements

#### ✅ Good Test Names
```javascript
describe('mapApiGameToGameEntity', () => {
  it('maps complete API game to game entity', () => { ... });
  it('handles missing optional fields with default values', () => { ... });
  it('uses DEFAULT_TEAM when away_team is null', () => { ... });
});
```

#### ❌ Bad Test Names
```javascript
describe('mapApiGameToGameEntity', () => {
  it('should map complete API game to game entity', () => { ... });
  it('should handle missing optional fields with default values', () => { ... });
  it('should use DEFAULT_TEAM when away_team is null', () => { ... });
});
```

### Test Categories

#### Unit Tests
- Test individual functions and components in isolation
- Mock external dependencies
- Focus on business logic and edge cases
- Use descriptive mock data

#### Integration Tests
- Test how different parts work together
- Test Redux actions, effects, and reducers
- Test API integration with HTTP clients

#### React Component Testing
- **We don't write tests for React components** in this codebase
- Components should contain **minimal business logic**
- Business logic should be extracted into **pure functions** that are unit tested
- Components should primarily handle:
  - Rendering UI based on props/state
  - Calling business logic functions
  - Event handling (calling functions, not implementing logic)
- See [IMPLEMENTATION.md](IMPLEMENTATION.md) for architectural guidelines

#### Data Mapper Tests
- Test all mapping functions between API and entity types
- Cover edge cases like null/undefined values
- Test default value assignments
- Verify type transformations

### Mock Data

- **Create realistic mock data**: Use data that represents actual use cases
- **Define mocks at the top**: Place mock objects at the top of test files for reusability
- **Use factory functions**: For complex mock data, consider factory functions

```javascript
const mockTeamEntity: TeamEntity = {
  id: 'team-1',
  name: 'Team One',
  logoUrl: 'https://example.com/logo.png',
  triCode: 'T1',
  coaches: []
};
```

### Testing Best Practices

1. **Test behavior, not implementation**: Focus on what the function does, not how it does it
2. **Cover edge cases**: Test null values, empty strings, missing properties
3. **One assertion per test**: Keep tests focused and clear
4. **Use meaningful assertions**: Prefer specific assertions over broad ones
5. **Test all code paths**: Ensure complete coverage of conditional logic

### Coverage Guidelines

- Aim for high coverage on business logic
- DataMappers should have near 100% coverage
- Effects and reducers should be thoroughly tested
- Focus on critical user flows

### File Organization

```
src/
├── FeatureName/
│   ├── component.tsx
│   ├── component.test.tsx
│   ├── dataMappers.ts
│   ├── dataMappers.test.ts
│   ├── effects.ts
│   ├── effects.test.ts
│   ├── reducer.ts
│   └── reducer.test.ts
```

### Common Testing Patterns

#### Testing DataMappers
```javascript
it('maps API response to entity', () => {
  const apiResponse = { /* mock API data */ };
  const result = mapApiToEntity(apiResponse);
  
  expect(result).toEqual({
    // expected entity structure
  });
});

it('handles missing optional fields', () => {
  const incompleteApiResponse = { /* minimal required fields */ };
  const result = mapApiToEntity(incompleteApiResponse);
  
  expect(result.optionalField).toBe(''); // or appropriate default
});
```

#### Testing Effects
```javascript
it('dispatches success action on successful API call', async () => {
  const mockDispatch = jest.fn();
  const mockGetState = jest.fn();
  
  // Mock successful API response
  jest.spyOn(httpClient, 'get').mockResolvedValue(mockApiResponse);
  
  await effect()(mockDispatch, mockGetState);
  
  expect(mockDispatch).toHaveBeenCalledWith(successAction(expectedData));
});
```

#### Testing Reducers
```javascript
it('updates state on successful action', () => {
  const initialState = { /* initial state */ };
  const action = successAction(mockData);
  
  const newState = reducer(initialState, action);
  
  expect(newState.data).toEqual(mockData);
  expect(newState.isLoading).toBe(false);
});
```

## Tools and Libraries

- **Jest**: Testing framework
- **React Testing Library**: For component testing
- **MSW (Mock Service Worker)**: For API mocking in tests
- **TypeScript**: Full type safety in tests

## Continuous Integration

Tests are automatically run on:
- Pull requests
- Commits to main branch
- Release builds

All tests must pass before merging code to main branch.