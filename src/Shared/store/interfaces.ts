export interface HttpAction<T, P = any> {
  type: T;
  payload?: P;
}
