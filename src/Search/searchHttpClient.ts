import {
  ApiSearchTournamentsResponse,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';

const SEARCH_API = `${process.env.REACT_APP_API_HOST}v1/search`;

const getAll = async (
  searchTerm: string
): Promise<ApiTournamentWithDependecies[]> => {
  const url = `${SEARCH_API}?term=${searchTerm}`;

  const { data } = await httpClient.get<ApiSearchTournamentsResponse>(url);
  return data;
};

export default {
  getAll
};
