import { REACT_APP_API_HOST } from '../env';
import { ApiAboutStatsResponse } from './apiTypes';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const getAboutStats = async (): Promise<ApiAboutStatsResponse> => {
  const url = `${REACT_APP_API_HOST}public/about`;

  const response = await fetch(url, {
    headers: DEFAULT_HEADERS
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const jsonData = await response.json();
  return jsonData;
};

export default {
  getAboutStats
};
