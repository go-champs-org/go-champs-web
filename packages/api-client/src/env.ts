export const API_HOST = process.env.API_HOST;

export const getApiHost = (): string => {
  if (!API_HOST) {
    throw new Error('API_HOST environment variable is not configured');
  }
  return API_HOST.endsWith('/') ? API_HOST : `${API_HOST}/`;
};
