import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { default as organizationReducer } from './Organizations/reducer';

const simpleReducer = (state = {}, action = {}) => {
    return state;
}

export default createStore(
    combineReducers({
        simpleReducer,
        organizationReducer,
    }),
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);