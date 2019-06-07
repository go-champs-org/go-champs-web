import { DEFAULT_HEADERS, resolveResponse } from '../Shared/httpClient';
import { OrganizationEntity } from './state';

const ORGANIZATION_API = 'https://yochamps-api.herokuapp.com/api/organizations';

const deleteRequest = (organizationId: string) => {
  const url = `${ORGANIZATION_API}/${organizationId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = () => {
  const url = ORGANIZATION_API;

  return fetch(url).then(resolveResponse);
};

const getOne = (organizationId: string) => {
  const url = ORGANIZATION_API;

  return fetch(`${url}/${organizationId}`).then(resolveResponse);
};

const patch = (organization: OrganizationEntity) => {
  const url = `${ORGANIZATION_API}/${organization.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({ organization })
  }).then(resolveResponse);
};

const post = (organization: OrganizationEntity) => {
  const url = ORGANIZATION_API;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({ organization })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  getOne,
  patch,
  post
};
