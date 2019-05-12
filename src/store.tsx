import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as organizationReducer } from './Organizations/reducer';
import { fetchMiddleware } from './Shared/store/middlewares';

export default createStore(
    combineReducers({
        organizations: organizationReducer,
    }),
    composeWithDevTools(
        applyMiddleware(fetchMiddleware),
    ),
);