import billingContractHttpClient from './billingContractHttpClient';
import httpClient from '../Shared/httpClient/httpClient';

// Mock environment variable
jest.mock('../Shared/env', () => ({
  REACT_APP_API_HOST: 'http://localhost:4000/'
}));

jest.mock('../Shared/httpClient/httpClient');

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

describe('billingContractHttpClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    const mockBillingContractsResponse = {
      data: [
        {
          content:
            'BILLING AGREEMENT - STANDARD TERMS v2.0\n\nThis Billing Agreement...',
          slug: 'standard-terms-v2'
        }
      ]
    };

    it('makes GET request to correct URL', async () => {
      mockHttpClient.get.mockResolvedValue(mockBillingContractsResponse);

      await billingContractHttpClient.getAll();

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'http://localhost:4000/v1/billing-contracts'
      );
    });

    it('returns billing contracts data from API response', async () => {
      mockHttpClient.get.mockResolvedValue(mockBillingContractsResponse);

      const result = await billingContractHttpClient.getAll();

      expect(result).toEqual([
        {
          content:
            'BILLING AGREEMENT - STANDARD TERMS v2.0\n\nThis Billing Agreement...',
          slug: 'standard-terms-v2'
        }
      ]);
    });

    it('throws API errors', async () => {
      const apiError = new Error('API Error');
      mockHttpClient.get.mockRejectedValue(apiError);

      await expect(billingContractHttpClient.getAll()).rejects.toThrow(
        'API Error'
      );
    });

    it('handles empty response', async () => {
      const emptyResponse = { data: [] };
      mockHttpClient.get.mockResolvedValue(emptyResponse);

      const result = await billingContractHttpClient.getAll();

      expect(result).toEqual([]);
    });
  });
});
