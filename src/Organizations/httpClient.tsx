import { OrganizationEntity } from './state';

const ORGANIZATION_API = 'https://yochamps-api.herokuapp.com/api/organizations';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const resolveResponse = (response: any) => {
  if (response.status === 204) {
    const splittedUrl = response.url.split('/');
    return splittedUrl[splittedUrl.length - 1];
  }

  return response.json();
};

const deleteRequest = (organizationId: string) => {
  const url = `${ORGANIZATION_API}/${organizationId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = () => {
  const url = ORGANIZATION_API;

  return fetch(url).then(resolveResponse);
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
  patch,
  post
};