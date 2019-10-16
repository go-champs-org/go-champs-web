import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as drawsReducer } from './Draws/reducer';
import { DrawState } from './Draws/state';
import { default as phaseStandingsReducer } from './Eliminations/reducer';
import { EliminationState } from './Eliminations/state';
import { default as tournamentGameReducer } from './Games/reducer';
import { TournamentGameState } from './Games/state';
import { default as organizationReducer } from './Organizations/reducer';
import { OrganizationState } from './Organizations/state';
import { default as tournamentPhaseReducer } from './Tournaments/Phases/reducer';
import { TournamentPhaseState } from './Tournaments/Phases/state';
import { default as tournamentReducer } from './Tournaments/reducer';
import { TournamentState } from './Tournaments/state';
import { default as tournamentStatReducer } from './Tournaments/Stats/reducer';
import { TournamentStatState } from './Tournaments/Stats/state';
import { default as tournamentTeamReducer } from './Tournaments/Teams/reducer';
import { TournamentTeamState } from './Tournaments/Teams/state';

export interface StoreState {
  organizations: OrganizationState;
  draws: DrawState;
  phaseStandings: EliminationState;
  tournaments: TournamentState;
  tournamentGames: TournamentGameState;
  tournamentPhases: TournamentPhaseState;
  tournamentTeams: TournamentTeamState;
  tournamentStats: TournamentStatState;
}

export default createStore(
  combineReducers({
    organizations: organizationReducer,
    draws: drawsReducer,
    phaseStandings: phaseStandingsReducer,
    tournaments: tournamentReducer,
    tournamentGames: tournamentGameReducer,
    tournamentPhases: tournamentPhaseReducer,
    tournamentTeams: tournamentTeamReducer,
    tournamentStats: tournamentStatReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
