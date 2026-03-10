import { REACT_APP_API_HOST } from '../Shared/env';
import { ApiBillingContractsResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';

const BILLING_CONTRACTS_API = `${REACT_APP_API_HOST}v1/billing-contracts`;

const getAll = async () => {
  const { data } = await httpClient.get<ApiBillingContractsResponse>(
    BILLING_CONTRACTS_API
  );
  return data;
};

const billingContractHttpClient = {
  getAll
};

export default billingContractHttpClient;
