import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { default as organizationReducer } from './Organizations/reducer';

const simpleReducer = (state = {}, action = {}) => {
    return state;
}

export default createStore(combineReducers({
    simpleReducer,
    organizationReducer,
}), applyMiddleware(thunkMiddleware));