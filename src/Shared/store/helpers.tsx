export const mapEntities = (entitiesMap: { [key: string]: any }, apiData: any) => {
    return {
        ...entitiesMap,
        [apiData.id]: {
            id: apiData.id,
            name: apiData.name,
            slug: apiData.slug,
        },
    };
};

export const createReducer = (initialState: any, handlers: { [key: string]: any }) => (state: any = initialState, action: any) => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    }
    return state;
};
