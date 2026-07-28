export interface ApiDataError {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- API error body shape varies per endpoint (errors.base, errors.response, field-keyed errors, ...)
  data: any;
}

export default class ApiError extends Error {
  readonly payload: ApiDataError;

  constructor(data: ApiDataError) {
    super('Api error');
    this.payload = data;
  }
}
