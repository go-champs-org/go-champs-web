import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as drawsReducer } from './Draws/reducer';
import { DrawState } from './Draws/state';
import { default as eliminationsReducer } from './Eliminations/reducer';
import { EliminationState } from './Eliminations/state';
import { default as tournamentGameReducer } from './Games/reducer';
import { GameState } from './Games/state';
import { default as organizationReducer } from './Organizations/reducer';
import { OrganizationState } from './Organizations/state';
import { default as eliminationStatReducer } from './Phases/EliminationStats/reducer';
import { PhaseEliminationStatState } from './Phases/EliminationStats/state';
import { default as tournamentPhaseReducer } from './Phases/reducer';
import { PhaseState } from './Phases/state';
import { default as tournamentTeamReducer } from './Teams/reducer';
import { TeamState } from './Teams/state';
import { default as tournamentReducer } from './Tournaments/reducer';
import { PhaseEliminationState } from './Tournaments/state';

export interface StoreState {
  draws: DrawState;
  eliminations: EliminationState;
  eliminationStats: PhaseEliminationStatState;
  games: GameState;
  organizations: OrganizationState;
  phases: PhaseState;
  teams: TeamState;
  tournaments: PhaseEliminationState;
}

export default createStore(
  combineReducers({
    draws: drawsReducer,
    eliminations: eliminationsReducer,
    eliminationStats: eliminationStatReducer,
    games: tournamentGameReducer,
    organizations: organizationReducer,
    phases: tournamentPhaseReducer,
    teams: tournamentTeamReducer,
    tournaments: tournamentReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
