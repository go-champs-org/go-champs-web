import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as organizationReducer } from './Organizations/reducer';
import { default as tournamentGameReducer } from './Tournaments/Games/reducer';
import { default as tournamentGroupReducer } from './Tournaments/Groups/reducer';
import { default as tournamentPhaseReducer } from './Tournaments/Phases/reducer';
import { default as tournamentReducer } from './Tournaments/reducer';
import { default as tournamentStatReducer } from './Tournaments/Stats/reducer';
import { default as tournamentTeamReducer } from './Tournaments/Teams/reducer';

export default createStore(
  combineReducers({
    organizations: organizationReducer,
    tournaments: tournamentReducer,
    tournamentGames: tournamentGameReducer,
    tournamentGroups: tournamentGroupReducer,
    tournamentPhases: tournamentPhaseReducer,
    tournamentTeams: tournamentTeamReducer,
    tournamentStats: tournamentStatReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
