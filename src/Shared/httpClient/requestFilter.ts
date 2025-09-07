export interface RequestFilter {
  [key: string]: string;
}

export interface OrCondition {
  [key: string]: string;
}

export interface ExtendedRequestFilter extends Record<string, any> {
  or?: OrCondition[];
}

export const mapRequestFilterToQueryString = (
  filter: RequestFilter | ExtendedRequestFilter
) => {
  const regularParams: string[] = [];
  const orParams: string[] = [];

  Object.keys(filter).forEach((key: string) => {
    if (key === 'or' && Array.isArray((filter as ExtendedRequestFilter)[key])) {
      const orConditions = (filter as ExtendedRequestFilter)[
        key
      ] as OrCondition[];
      orConditions.forEach((condition: OrCondition, index: number) => {
        Object.keys(condition).forEach((conditionKey: string) => {
          orParams.push(
            `where[or][${index}][${conditionKey}]=${condition[conditionKey]}`
          );
        });
      });
    } else {
      regularParams.push(`where[${key}]=${filter[key]}`);
    }
  });

  return [...regularParams, ...orParams].join('&');
};
