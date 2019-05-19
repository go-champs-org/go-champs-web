import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as organizationReducer } from './Organizations/reducer';
import { fetchMiddleware } from './Shared/store/middlewares';
import { default as tournamentReducer } from './Tournaments/reducer';
import { default as tournamentTeamReducer } from './Tournaments/Teams/reducer';

export default createStore(
	combineReducers({
		organizations: organizationReducer,
		tournaments: tournamentReducer,
		tournamentTeams: tournamentTeamReducer,
	}),
	composeWithDevTools(
		applyMiddleware(fetchMiddleware),
	),
);