import ApiError from './ApiError';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const get = async <R>(url: string): Promise<R> => {
  // A signal opts out of Next.js fetch dedupe, whose shared Response breaks across Workers requests.
  const response = await fetch(url, {
    headers: DEFAULT_HEADERS,
    signal: new AbortController().signal
  });

  if (!response.ok) {
    throw new ApiError({ status: response.status, data: await response.text() });
  }

  return (await response.json()) as R;
};

export default { get };
