export interface ApiErrorParams<T = unknown> {
  status: number;
  data: T;
}

export default class ApiError<T = unknown> extends Error {
  status: number;
  data: T;

  constructor({ status, data }: ApiErrorParams<T>) {
    super(`API error with status ${status}`);
    this.status = status;
    this.data = data;
  }
}
