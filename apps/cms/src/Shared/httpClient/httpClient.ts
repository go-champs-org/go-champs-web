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

const deleteRequest = async <T>(url: string, data?: T): Promise<string> => {
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

const downloadCsv = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader()
  });
  const textData = await response.text();
  const blob = new Blob([textData], { type: 'text/csv;charset=utf-8;' });
  const urlBlob = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = urlBlob;
  a.setAttribute('download', 'export.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(urlBlob);
  return textData;
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
  downloadCsv,
  patch,
  put,
  post
};
