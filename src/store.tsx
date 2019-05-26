import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as gameReducer } from './Games/reducer';
import { default as organizationReducer } from './Organizations/reducer';
import { fetchMiddleware } from './Shared/store/middlewares';
import { default as tournamentGameReducer } from './Tournaments/Games/reducer';
import { default as tournamentGroupReducer } from './Tournaments/Groups/reducer';
import { default as tournamentReducer } from './Tournaments/reducer';
import { default as tournamentTeamReducer } from './Tournaments/Teams/reducer';

export default createStore(
	combineReducers({
		games: gameReducer,
		organizations: organizationReducer,
		tournaments: tournamentReducer,
		tournamentGames: tournamentGameReducer,
		tournamentGroups: tournamentGroupReducer,
		tournamentTeams: tournamentTeamReducer,
	}),
	composeWithDevTools(
		applyMiddleware(fetchMiddleware),
	),
);