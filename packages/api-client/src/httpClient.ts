import ApiError from './ApiError';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const get = async <R>(url: string): Promise<R> => {
  const response = await fetch(url, { headers: DEFAULT_HEADERS });

  if (!response.ok) {
    throw new ApiError({ status: response.status, data: await response.text() });
  }

  return (await response.json()) as R;
};

export default { get };
