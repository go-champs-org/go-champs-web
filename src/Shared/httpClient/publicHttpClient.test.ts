import publicHttpClient from './publicHttpClient';

// Mock environment variable
jest.mock('../env', () => ({
  REACT_APP_API_HOST: 'http://localhost:4000/'
}));

// Mock global fetch
global.fetch = jest.fn();

describe('publicHttpClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAboutStats', () => {
    const mockAboutStatsResponse = {
      data: {
        public_games_count: 3247,
        public_tournaments_count: 315,
        organizations_with_public_tournaments_count: 127
      }
    };

    it('makes GET request to correct URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockAboutStatsResponse
      });

      await publicHttpClient.getAboutStats();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/public/about',
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    });

    it('returns data from API response', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockAboutStatsResponse
      });

      const result = await publicHttpClient.getAboutStats();

      expect(result).toEqual(mockAboutStatsResponse);
    });

    it('parses JSON response correctly', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockAboutStatsResponse
      });

      const result = await publicHttpClient.getAboutStats();

      expect(result.data.public_games_count).toBe(3247);
      expect(result.data.public_tournaments_count).toBe(315);
      expect(result.data.organizations_with_public_tournaments_count).toBe(127);
    });

    it('throws error on fetch failure', async () => {
      const fetchError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(fetchError);

      await expect(publicHttpClient.getAboutStats()).rejects.toThrow(
        'Network error'
      );
    });

    it('throws error on non-ok response status', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({})
      });

      await expect(publicHttpClient.getAboutStats()).rejects.toThrow(
        'HTTP error! status: 404'
      );
    });

    it('throws error on 500 response status', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({})
      });

      await expect(publicHttpClient.getAboutStats()).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });
  });
});
