import planHttpClient from './planHttpClient';
import httpClient from '../Shared/httpClient/httpClient';

// Mock environment variable
jest.mock('../Shared/env', () => ({
  REACT_APP_API_HOST: 'http://localhost:4000/'
}));

jest.mock('../Shared/httpClient/httpClient');

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

describe('planHttpClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByFilter', () => {
    const mockPlansResponse = {
      data: [
        {
          slug: 'premium-monthly',
          amount: 30
        },
        {
          slug: 'basic-monthly',
          amount: 15
        }
      ]
    };

    it('makes GET request to correct URL with query string', async () => {
      mockHttpClient.get.mockResolvedValue(mockPlansResponse);

      const filter = { sport_slug: 'basketball' };
      await planHttpClient.getByFilter(filter);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'http://localhost:4000/v1/plans?where[sport_slug]=basketball'
      );
    });

    it('returns plans data from API response', async () => {
      mockHttpClient.get.mockResolvedValue(mockPlansResponse);

      const filter = { sport_slug: 'basketball' };
      const result = await planHttpClient.getByFilter(filter);

      expect(result).toEqual([
        {
          slug: 'premium-monthly',
          amount: 30
        },
        {
          slug: 'basic-monthly',
          amount: 15
        }
      ]);
    });

    it('throws API errors', async () => {
      const apiError = new Error('API Error');
      mockHttpClient.get.mockRejectedValue(apiError);

      const filter = { sport_slug: 'basketball' };

      await expect(planHttpClient.getByFilter(filter)).rejects.toThrow(
        'API Error'
      );
    });

    it('formats complex query parameters correctly', async () => {
      mockHttpClient.get.mockResolvedValue(mockPlansResponse);

      const filter = { sport_slug: 'basketball', active: 'true' };
      await planHttpClient.getByFilter(filter);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'http://localhost:4000/v1/plans?where[sport_slug]=basketball&where[active]=true'
      );
    });
  });
});
