import ApiError from './ApiError';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const buildAuthenticationHeader = () => {
  const token = localStorage.getItem('token');
  return {
    ...DEFAULT_HEADERS,
    Authorization: `Bearer ${token}`
  };
};

const deleteRequest = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader(),
    method: 'DELETE'
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
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
};

const patch = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await fetch(url, {
    headers: buildAuthenticationHeader(),
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  const jsonData = await response.json();

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

  const jsonData = await response.json();

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
  post
};
