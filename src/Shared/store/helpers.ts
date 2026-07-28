export const mapStringOrDefault = (value: string | undefined) =>
  value ? value : '';

export const returnProperty = <K extends string>(key: K) => <
  T extends Record<K, unknown>
>(
  entity: T
): string => String(entity[key]);

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

export const entityById = <T extends { id: string }>(
  currentEntitiesMap: { [key: string]: T },
  id: string
) => (key: string) => {
  return currentEntitiesMap[key].id !== id;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- dynamic action.type -> handler dispatch table; each reducer.ts supplies handlers with its own distinct state/action types
export const createReducer = <T = any>(
  initialState: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see above
  handlers: { [key: string]: any }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see above
) => (state: T = initialState, action: any): T => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};
