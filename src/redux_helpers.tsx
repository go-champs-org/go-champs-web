export interface DispatchFromProps {
    dispatch: (func: any) => void;
}

export const createReducer = (initialState: any, handlers: { [key: string]: any }) => (state: any = initialState, action: any) => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    }
    return state;
};

export const fetchMiddleware = (store: any) => (next: any) => (action: any) => {
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
};
