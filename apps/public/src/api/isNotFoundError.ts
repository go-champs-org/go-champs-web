import { ApiError } from '@gochamps/api-client';

// A missing game is a 404 page; anything else (a 500, a network failure) must
// keep bubbling so it is not silently reported as "does not exist".
export const isNotFoundError = (error: unknown): boolean =>
  error instanceof ApiError && error.status === 404;
