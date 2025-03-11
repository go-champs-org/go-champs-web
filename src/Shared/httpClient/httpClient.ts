import ApiError from './ApiError';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../Accounts/constants';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const buildAuthenticationHeader = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  return {
    ...DEFAULT_HEADERS,
    Authorization: `Bearer ${token}`
  };
};

const deleteRequest = async <T>(url: string, data: T): Promise<string> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader(),
    method: 'DELETE',
    body: data && JSON.stringify(data)
  });

  const splittedUrl = response.url.split('/');
  const deletedId = splittedUrl[splittedUrl.length - 1];

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      data: deletedId
    });
  }

  return deletedId;
};

const get = async <R>(url: string): Promise<R> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader()
  });
  const jsonData = await response.json();
  return jsonData;
};

const patch = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader(),
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  const jsonData = (await response.json()) as R;

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      data: jsonData
    });
  }

  return jsonData;
};

const put = async <T, R>(url: string, data?: T): Promise<R> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader(),
    method: 'PUT',
    body: data && JSON.stringify(data)
  });

  const jsonData = (await response.json()) as R;

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      data: jsonData
    });
  }

  return jsonData;
};

const post = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader(),
    method: 'POST',
    body: JSON.stringify(data)
  });

  const jsonText = await response.text();
  const jsonData = jsonText ? (JSON.parse(jsonText) as R) : ({} as R);

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      data: jsonData
    });
  }

  return jsonData;
};

export default {
  delete: deleteRequest,
  get,
  patch,
  put,
  post
};
