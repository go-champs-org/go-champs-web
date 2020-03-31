export const mapStringOrDefault = (value: string | undefined) =>
  value ? value : '';

export const returnProperty = (key: string) => (entity: {
  [key: string]: any;
}) => entity[key];

export const apiDataToEntitiesOverride = <T, E>(
  mapFunc: (apiData: T) => E,
  mapKey: (entity: E) => string
) => (currentEntities: { [key: string]: E }, apiData: T) => {
  const entity = mapFunc(apiData);
  const key = mapKey(entity);

  return {
    ...currentEntities,
    [key]: entity
  };
};

export const apiDataToEntities = <T, E>(
  mapFunc: (apiData: T) => E,
  mapKey: (entity: E) => string
) => (stateEntities: { [key: string]: E }) => (
  currentEntities: { [key: string]: E },
  apiData: T
) => {
  const entity = mapFunc(apiData);
  const key = mapKey(entity);

  if (stateEntities[key]) {
    return {
      ...currentEntities,
      [key]: stateEntities[key]
    };
  }

  return {
    ...currentEntities,
    [key]: entity
  };
};

export const mapEntities = <T>(keyFunction: (obj: T) => string) => (
  entitiesMap: { [key: string]: T },
  entity: T | undefined
) => {
  if (!entity) {
    return entitiesMap;
  }
  const key = keyFunction(entity);
  return {
    ...entitiesMap,
    [key]: {
      ...entitiesMap[key],
      ...entity
    }
  };
};

export const mapEntitiesByKey = <T>(currentEntitiesMap: {
  [key: string]: T;
}) => (entitiesMap: { [key: string]: T }, key: string) => {
  return {
    ...entitiesMap,
    [key]: currentEntitiesMap[key]
  };
};

export const entityById = (
  currentEntitiesMap: { [key: string]: any },
  id: string
) => (key: string) => {
  return currentEntitiesMap[key].id !== id;
};

export const createReducer = <T = any>(
  initialState: T,
  handlers: { [key: string]: any }
) => (state: T = initialState, action: any): T => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};
