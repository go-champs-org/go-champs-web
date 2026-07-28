export interface HttpAction<T, P = unknown> {
  type: T;
  payload?: P;
}
