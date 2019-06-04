import { DEFAULT_HEADERS, resolveResponse } from '../../Shared/httpClient';
import { TournamentTeamEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentTeamsApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/teams`;

const deleteRequest = (tournamentId: string, tournamentTeamId: string) => {
  const url = `${tournamentTeamsApi(tournamentId)}/${tournamentTeamId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = (tournamentId: string) => {
  const url = `${tournamentTeamsApi(tournamentId)}`;

  return fetch(url).then(resolveResponse);
};

const patch = (tournamentId: string, tournamentTeam: TournamentTeamEntity) => {
  const url = `${tournamentTeamsApi(tournamentId)}/${tournamentTeam.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({ tournament_team: tournamentTeam })
  }).then(resolveResponse);
};

const post = (tournamentId: string, tournamentTeam: TournamentTeamEntity) => {
  const url = `${tournamentTeamsApi(tournamentId)}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({ tournament_team: tournamentTeam })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  patch,
  post
};
