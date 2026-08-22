import { ApiError } from '@gochamps/api-client';
import { isNotFoundError } from './isNotFoundError';

describe('isNotFoundError', () => {
  it('is true for an API 404', () => {
    expect(isNotFoundError(new ApiError({ status: 404, data: 'missing' }))).toBe(
      true
    );
  });

  it('is false for any other API failure', () => {
    expect(isNotFoundError(new ApiError({ status: 500, data: 'boom' }))).toBe(
      false
    );
  });

  it('is false for a plain error', () => {
    expect(isNotFoundError(new Error('offline'))).toBe(false);
  });
});
