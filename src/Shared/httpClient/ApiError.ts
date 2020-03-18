export interface ApiDataError {
  status: number;
  data: any;
}

export default class ApiError extends Error {
  readonly payload: ApiDataError;

  constructor(data: ApiDataError) {
    super('Api error');
    this.payload = data;
  }
}
