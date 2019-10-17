import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as drawsReducer } from './Draws/reducer';
import { DrawState } from './Draws/state';
import { default as eliminationsReducer } from './Eliminations/reducer';
import { EliminationState } from './Eliminations/state';
import { default as tournamentGameReducer } from './Games/reducer';
import { TournamentGameState } from './Games/state';
import { default as organizationReducer } from './Organizations/reducer';
import { OrganizationState } from './Organizations/state';
import { default as eliminationStatReducer } from './Phases/EliminationStats/reducer';
import { PhaseEliminationStatState } from './Phases/EliminationStats/state';
import { default as tournamentPhaseReducer } from './Phases/reducer';
import { TournamentPhaseState } from './Phases/state';
import { default as tournamentTeamReducer } from './Teams/reducer';
import { TournamentTeamState } from './Teams/state';
import { default as tournamentReducer } from './Tournaments/reducer';
import { PhaseEliminationState } from './Tournaments/state';

export interface StoreState {
  organizations: OrganizationState;
  draws: DrawState;
  eliminations: EliminationState;
  tournaments: PhaseEliminationState;
  tournamentGames: TournamentGameState;
  tournamentPhases: TournamentPhaseState;
  tournamentTeams: TournamentTeamState;
  eliminationStats: PhaseEliminationStatState;
}

export default createStore(
  combineReducers({
    organizations: organizationReducer,
    draws: drawsReducer,
    eliminations: eliminationsReducer,
    eliminationStats: eliminationStatReducer,
    tournaments: tournamentReducer,
    tournamentGames: tournamentGameReducer,
    tournamentPhases: tournamentPhaseReducer,
    tournamentTeams: tournamentTeamReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
