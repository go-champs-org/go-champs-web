import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as organizationReducer } from './Organizations/reducer';

const fetchMiddleware = (store: any) => (next: any) => (action: any) => {
    if (!action.type.startsWith('API')) {
        return next(action);
    }

    const { url, requestConfig } = action.payload;
    const successAction = `${action.type}_SUCCESS`;
    const errorAction = `${action.type}_FAILURE`;

    next(action);

    return fetch(url, requestConfig)
        .then((response) => response.json())
        .then((data) => next({ type: successAction, payload: data }))
        .catch((error) => next({ type: errorAction, payload: error }));
}

export default createStore(
    combineReducers({
        organizations: organizationReducer,
    }),
    composeWithDevTools(
        applyMiddleware(fetchMiddleware),
    ),
);