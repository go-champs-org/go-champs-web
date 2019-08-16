import { DEFAULT_HEADERS, resolveResponse } from '../../Shared/httpClient';
import { TournamentPhaseEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentPhasesApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/phases`;

const deleteRequest = (tournamentId: string, tournamentPhaseId: string) => {
  const url = `${tournamentPhasesApi(tournamentId)}/${tournamentPhaseId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = (tournamentId: string) => {
  const url = `${tournamentPhasesApi(tournamentId)}`;

  return fetch(url).then(resolveResponse);
};

const patch = (
  tournamentId: string,
  tournamentPhase: TournamentPhaseEntity
) => {
  const url = `${tournamentPhasesApi(tournamentId)}/${tournamentPhase.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({ tournament_group: tournamentPhase })
  }).then(resolveResponse);
};

const post = (tournamentId: string, tournamentPhase: TournamentPhaseEntity) => {
  const url = `${tournamentPhasesApi(tournamentId)}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({ tournament_group: tournamentPhase })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  patch,
  post
};
