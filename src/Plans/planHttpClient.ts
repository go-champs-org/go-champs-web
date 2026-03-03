import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiPlansResponse,
  ApiCampaignValidationResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapRequestFilterToQueryString,
  RequestFilter
} from '../Shared/httpClient/requestFilter';

const PLANS_API = `${REACT_APP_API_HOST}v1/plans`;

const getByFilter = async (where: RequestFilter) => {
  const url = `${PLANS_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiPlansResponse>(url);
  return data;
};

const validateCampaign = async (planSlug: string, campaignSlug: string) => {
  const url = `${PLANS_API}/${planSlug}/campaigns/${campaignSlug}/validate`;

  const { data } = await httpClient.get<ApiCampaignValidationResponse>(url);
  return data; // Return the inner data object
};

const planHttpClient = {
  getByFilter,
  validateCampaign
};

export default planHttpClient;
