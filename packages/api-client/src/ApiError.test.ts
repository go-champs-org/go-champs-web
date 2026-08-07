import ApiError from './ApiError';

describe('ApiError', () => {
  it('carries status/data and is a proper Error instance', () => {
    const error = new ApiError({ status: 500, data: { message: 'boom' } });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ApiError');
    expect(error.status).toBe(500);
    expect(error.data).toEqual({ message: 'boom' });
    expect(error.message).toBe('API error with status 500');
  });
});
