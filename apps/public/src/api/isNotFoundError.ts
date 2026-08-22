import { ApiError } from '@gochamps/api-client';

export const isNotFoundError = (error: unknown): boolean =>
  error instanceof ApiError && error.status === 404;
