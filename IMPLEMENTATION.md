# Implementation Guidelines

This document outlines the architectural patterns and implementation practices for the Go Champs front-end application.

## Architecture Philosophy

Our application follows a **business logic separation pattern** where React components are kept as thin as possible, with all business logic extracted into pure functions that can be easily unit tested.

## React Component Guidelines

### Keep Components Thin

React components should primarily handle:
- **Rendering UI** based on props and state
- **Event handling** by calling business logic functions
- **State management** through Redux selectors and actions
- **Side effects** through Redux effects (not directly in components)

### What Components Should NOT Do

❌ **Avoid business logic in components:**
```typescript
// BAD: Business logic in component
const GameForm = ({ game }: Props) => {
  const handleSubmit = (formData: FormData) => {
    // Don't do complex validation here
    if (formData.homeScore < 0 || formData.awayScore < 0) {
      setError('Scores cannot be negative');
      return;
    }
    
    // Don't do data transformation here
    const apiPayload = {
      home_score: formData.homeScore,
      away_score: formData.awayScore,
      is_finished: formData.homeScore > 0 || formData.awayScore > 0
    };
    
    dispatch(updateGame(apiPayload));
  };
};
```

✅ **Extract business logic to pure functions:**
```typescript
// GOOD: Thin component calling business functions
const GameForm = ({ game }: Props) => {
  const handleSubmit = (formData: FormData) => {
    const validationResult = validateGameForm(formData);
    if (!validationResult.isValid) {
      setError(validationResult.error);
      return;
    }
    
    const apiPayload = mapFormDataToApiRequest(formData);
    dispatch(updateGame(apiPayload));
  };
};

// Business logic in separate, testable functions
export const validateGameForm = (formData: FormData): ValidationResult => {
  if (formData.homeScore < 0 || formData.awayScore < 0) {
    return { isValid: false, error: 'Scores cannot be negative' };
  }
  return { isValid: true };
};

export const mapFormDataToApiRequest = (formData: FormData): ApiRequest => ({
  home_score: formData.homeScore,
  away_score: formData.awayScore,
  is_finished: formData.homeScore > 0 || formData.awayScore > 0
});
```

## File Organization Pattern

Each feature follows a consistent structure where business logic is separated from UI:

```
src/FeatureName/
├── components/           # React components (thin)
│   ├── Form.tsx
│   ├── List.tsx
│   └── View.tsx
├── businessLogic/        # Pure functions (heavily tested)
│   ├── validation.ts
│   ├── calculations.ts
│   └── formatting.ts
├── dataMappers.ts        # API ↔ Entity transformations
├── dataMappers.test.ts   # Comprehensive mapping tests
├── effects.ts            # Redux side effects
├── effects.test.ts       # Effect tests
├── actions.ts            # Redux actions
├── reducer.ts            # Redux state management
├── reducer.test.ts       # Reducer tests
├── selectors.ts          # State selection logic
└── state.ts              # Type definitions
```

## Business Logic Extraction Patterns

### 1. Validation Logic

Extract validation into pure functions:

```typescript
// validation.ts
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateTeam = (team: TeamEntity): ValidationResult => {
  const errors: string[] = [];
  
  if (!team.name.trim()) {
    errors.push('Team name is required');
  }
  
  if (team.name.length > 50) {
    errors.push('Team name must be less than 50 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// validation.test.ts
describe('validateTeam', () => {
  it('returns valid result for valid team', () => {
    const validTeam = { name: 'Valid Team', /* other fields */ };
    const result = validateTeam(validTeam);
    
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
  
  it('returns invalid result for empty team name', () => {
    const invalidTeam = { name: '', /* other fields */ };
    const result = validateTeam(invalidTeam);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Team name is required');
  });
});
```

### 2. Calculation Logic

Extract calculations into testable functions:

```typescript
// calculations.ts
export const calculateWinPercentage = (wins: number, totalGames: number): number => {
  if (totalGames === 0) return 0;
  return Math.round((wins / totalGames) * 100);
};

export const calculateTeamStats = (games: GameEntity[]): TeamStats => {
  const wins = games.filter(game => game.isFinished && game.homeScore > game.awayScore).length;
  const losses = games.filter(game => game.isFinished && game.homeScore < game.awayScore).length;
  const draws = games.filter(game => game.isFinished && game.homeScore === game.awayScore).length;
  
  return {
    wins,
    losses,
    draws,
    totalGames: games.length,
    winPercentage: calculateWinPercentage(wins, games.length)
  };
};
```

### 3. Formatting Logic

Extract formatting into pure functions:

```typescript
// formatting.ts
export const formatDateTime = (datetime: string): string => {
  if (!datetime) return 'TBD';
  
  const date = new Date(datetime);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatScore = (homeScore: number, awayScore: number): string => {
  return `${homeScore} - ${awayScore}`;
};
```

## Redux Integration

### Effects for Side Effects

Keep side effects in Redux effects, not in components:

```typescript
// effects.ts
export const submitGameForm = (gameData: GameFormData) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(postGameStart());
  
  try {
    // Validation happens here, not in component
    const validationResult = validateGameForm(gameData);
    if (!validationResult.isValid) {
      dispatch(postGameFailure(validationResult.errors.join(', ')));
      return;
    }
    
    // Data transformation happens here
    const apiPayload = mapGameFormToApiRequest(gameData);
    const response = await gameHttpClient.post(apiPayload);
    
    dispatch(postGameSuccess(response.data));
  } catch (error) {
    dispatch(postGameFailure(error.message));
  }
};
```

### Selectors for Derived State

Use selectors for computed values:

```typescript
// selectors.ts
export const getFinishedGames = (state: RootState): GameEntity[] =>
  Object.values(state.games.games).filter(game => game.isFinished);

export const getGameStats = createSelector(
  [getFinishedGames],
  (finishedGames): GameStats => calculateGameStats(finishedGames)
);
```

## Component Implementation Example

Here's how a component should look following these guidelines:

```typescript
// GameForm.tsx
interface GameFormProps {
  game?: GameEntity;
  onSubmit: (gameData: GameFormData) => void;
}

export const GameForm = ({ game, onSubmit }: GameFormProps) => {
  const [formData, setFormData] = useState(mapGameToFormData(game));
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    // Validation logic extracted to pure function
    const validation = validateGameForm(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    setValidationErrors([]);
    onSubmit(formData);
  };
  
  const handleFieldChange = (field: keyof GameFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {validationErrors.length > 0 && (
        <ErrorList errors={validationErrors} />
      )}
    </form>
  );
};
```

## Testing Strategy

With this architecture:

1. **Business logic functions** get comprehensive unit tests
2. **DataMappers** get comprehensive unit tests  
3. **Effects** get integration tests with mocked HTTP clients
4. **Reducers** get unit tests for state management
5. **Components** don't need tests because they contain no logic

## Benefits

This approach provides:

- **High testability**: Business logic is in pure functions
- **Maintainability**: Logic is separated from UI concerns
- **Reusability**: Business functions can be used across components
- **Performance**: Easier to optimize when logic is separated
- **Debugging**: Easier to isolate issues to specific layers

## Migration Strategy

When working on existing components that have business logic:

1. **Identify business logic** within the component
2. **Extract to pure functions** in separate files
3. **Add comprehensive tests** for the extracted functions
4. **Update component** to use the extracted functions
5. **Remove component tests** if they only tested the extracted logic

This gradual refactoring ensures code quality improves over time while maintaining functionality.