import { DEFAULT_HEADERS, resolveResponse } from '../../Shared/httpClient';
import { TournamentPhaseEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const deleteRequest = (tournamentPhaseId: string) => {
  const url = `${PHASE_API}/${tournamentPhaseId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const get = (tournamentPhaseId: string) => {
  const url = `${PHASE_API}/${tournamentPhaseId}`;

  return fetch(url).then(resolveResponse);
};

const getAll = () => {
  const url = `${PHASE_API}`;

  return fetch(url).then(resolveResponse);
};

const patch = (tournamentPhase: TournamentPhaseEntity) => {
  const url = `${PHASE_API}/${tournamentPhase.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({ tournament_phase: tournamentPhase })
  }).then(resolveResponse);
};

const post = (tournamentPhase: TournamentPhaseEntity) => {
  const url = `${PHASE_API}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({ tournament_phase: tournamentPhase })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  get,
  getAll,
  patch,
  post
};
