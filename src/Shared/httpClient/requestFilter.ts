export interface RequestFilter {
  [key: string]: string;
}

export const mapRequestFilterToQueryString = (filter: RequestFilter) => {
  return Object.keys(filter)
    .map((key: string) => `where[${key}]=${filter[key]}`)
    .join('&');
};
