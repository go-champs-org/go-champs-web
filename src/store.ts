import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as organizationReducer } from './Organizations/reducer';
import { OrganizationState } from './Organizations/state';
import { default as tournamentGameReducer } from './Tournaments/Games/reducer';
import { TournamentGameState } from './Tournaments/Games/state';
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
  tournaments: TournamentState;
  tournamentGames: TournamentGameState;
  tournamentPhases: TournamentPhaseState;
  tournamentTeams: TournamentTeamState;
  tournamentStats: TournamentStatState;
}

export default createStore(
  combineReducers({
    organizations: organizationReducer,
    tournaments: tournamentReducer,
    tournamentGames: tournamentGameReducer,
    tournamentPhases: tournamentPhaseReducer,
    tournamentTeams: tournamentTeamReducer,
    tournamentStats: tournamentStatReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
