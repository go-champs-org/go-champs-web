import { REACT_APP_API_HOST } from '../Shared/env';
import { ApiPlansResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapRequestFilterToQueryString,
  RequestFilter
} from '../Shared/httpClient/requestFilter';

const PLANS_API = `${REACT_APP_API_HOST}v1/plans`;

interface CampaignValidationResponse {
  valid: boolean;
}

const getByFilter = async (where: RequestFilter) => {
  const url = `${PLANS_API}?${mapRequestFilterToQueryString(where)}`;

  const { data } = await httpClient.get<ApiPlansResponse>(url);
  return data;
};

const validateCampaign = async (planSlug: string, campaignSlug: string) => {
  const url = `${PLANS_API}/${planSlug}/campaigns/${campaignSlug}/validate`;

  const { data } = await httpClient.get<CampaignValidationResponse>(url);
  return data;
};

const planHttpClient = {
  getByFilter,
  validateCampaign
};

export default planHttpClient;
