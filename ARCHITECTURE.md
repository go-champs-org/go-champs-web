# Go Champs Architecture

This document outlines the architectural patterns and folder organization for the Go Champs front-end application.

## Domain-Driven Architecture

The application follows a **domain-driven design** where each business domain has its own self-contained folder with all related functionality. This promotes modularity, maintainability, and clear separation of concerns.

## Domain Folder Structure

Each domain (e.g., `Games/`, `Players/`, `Teams/`, `Tournaments/`) follows a consistent structure:

### Example: Games Domain

```
src/Games/
├── components/          # UI Components (Presentational)
│   ├── Card.tsx
│   ├── Form.tsx
│   ├── List.tsx
│   └── TeamAndScore.tsx
├── state management/    # Redux Layer
│   ├── actions.ts       # Action creators
│   ├── reducer.ts       # Redux reducer
│   ├── selectors.ts     # State selectors
│   ├── effects.ts       # Side effects (async operations)
│   └── state.ts         # Type definitions & initial state
├── data layer/          # Data Transformation
│   ├── dataMappers.ts   # API ↔ Entity transformations
│   └── gameHttpClient.ts # HTTP client for API calls
└── tests/               # Unit Tests
    ├── effects.test.ts
    ├── reducer.test.ts
    └── dataMappers.test.ts
```

### Component Philosophy

**All components within domain folders are "dummy" (presentational) components:**

- ✅ **Do**: Handle UI rendering, user interactions, form inputs
- ✅ **Do**: Accept data via props
- ✅ **Do**: Call callback functions passed via props
- ❌ **Don't**: Connect to Redux directly
- ❌ **Don't**: Make HTTP calls
- ❌ **Don't**: Contain business logic

**Example of a good domain component:**
```typescript
// src/Games/Form.tsx
interface GameFormProps {
  game: GameEntity;
  onSubmit: (game: GameEntity) => void;
  isLoading: boolean;
}

const GameForm: React.FC<GameFormProps> = ({ game, onSubmit, isLoading }) => {
  // Only UI logic - no business logic or side effects
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## State Management Layer

Each domain implements Redux patterns:

### Actions (`actions.ts`)
```typescript
// Action creators for the domain
export const getGameStart = () => ({ type: 'GET_GAME_START' });
export const getGameSuccess = (game: GameEntity) => ({ 
  type: 'GET_GAME_SUCCESS', 
  payload: game 
});
```

### Reducers (`reducer.ts`)
```typescript
// Pure functions that update domain state
export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'GET_GAME_SUCCESS':
      return { ...state, games: { ...state.games, [action.payload.id]: action.payload } };
    default:
      return state;
  }
};
```

### Selectors (`selectors.ts`)
```typescript
// Functions to extract data from Redux state
export const gameById = (state: GameState, gameId: string) => 
  state.games[gameId] || DEFAULT_GAME;
  
export const gamesLoading = (state: GameState) => state.isLoadingRequestGames;
```

### Effects (`effects.ts`)
```typescript
// Side effects and async operations
export const getGame = (gameId: string) => async (dispatch: Dispatch) => {
  dispatch(getGameStart());
  try {
    const response = await gameHttpClient.get(gameId);
    dispatch(getGameSuccess(response.data));
  } catch (error) {
    dispatch(getGameFailure(error.message));
  }
};
```

### Data Mappers (`dataMappers.ts`)
```typescript
// Transform data between API and entity formats
export const mapApiGameToGameEntity = (apiGame: ApiGame): GameEntity => ({
  id: apiGame.id,
  homeScore: apiGame.home_score,
  awayScore: apiGame.away_score,
  // ... other transformations
});
```

## Pages Folder - Smart Components

The `Pages/` folder contains **smart/container components** that:

- ✅ **Handle routing** - Each page corresponds to a URL route
- ✅ **Connect to Redux** - Use `connect()` or hooks to access state
- ✅ **Orchestrate domains** - Combine multiple domain components
- ✅ **Handle side effects** - Dispatch actions, trigger API calls
- ✅ **Manage component lifecycle** - useEffect, componentDidMount, etc.

### Example: GameNew Page
```typescript
// src/Pages/GameNew.tsx
const GameNew: React.FC = () => {
  // Smart component responsibilities:
  const dispatch = useDispatch();
  const games = useSelector(gamesSelector);
  const teams = useSelector(teamsSelector);
  
  const handleSubmit = (gameData: GameEntity) => {
    dispatch(postGame(gameData)); // Business logic
  };
  
  return (
    <GameForm 
      game={DEFAULT_GAME}
      teams={teams}
      onSubmit={handleSubmit}  // Pass callbacks
      isLoading={isLoading}    // Pass state
    />
  );
};
```

## URL Structure & Routing

Pages map directly to application URLs:
- `/GameNew` → `Pages/GameNew.tsx`
- `/GameEdit/:id` → `Pages/GameEdit.tsx`
- `/PlayerList` → `Pages/PlayerList.tsx`

## Benefits of This Architecture

### 1. **Separation of Concerns**
- UI components focus solely on presentation
- Business logic lives in effects and selectors
- Data transformation is centralized in dataMappers

### 2. **Reusability**
- Domain components can be used across multiple pages
- Pure components are easy to test and reason about

### 3. **Maintainability**
- Each domain is self-contained
- Clear boundaries between UI and business logic
- Consistent patterns across all domains

### 4. **Testability**
- Pure components are easy to unit test
- Business logic in effects/selectors can be tested independently
- DataMappers ensure consistent API transformations

## Testing Strategy

- **Domain Components**: Test props, rendering, user interactions
- **Effects**: Test async operations, success/failure cases
- **Reducers**: Test state transformations
- **DataMappers**: Test API ↔ Entity transformations
- **Selectors**: Test data extraction and computation
- **Pages**: Integration tests focusing on user workflows

This architecture ensures scalability, maintainability, and clear separation between UI presentation and business logic, making the codebase easier to understand and extend.