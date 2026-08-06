import { httpClient, ApiError } from '@gochamps/api-client';

describe('httpClient.get', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('makes a GET request with the default headers and returns parsed JSON', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: ['a'] })
    }) as unknown as typeof fetch;

    const result = await httpClient.get<{ data: string[] }>(
      'https://api.example.com/v1/things'
    );

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/things',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result).toEqual({ data: ['a'] });
  });

  it('throws an ApiError with the status and body text on a non-ok response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not Found'
    }) as unknown as typeof fetch;

    await expect(
      httpClient.get('https://api.example.com/v1/missing')
    ).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      data: 'Not Found'
    });
  });
});

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
