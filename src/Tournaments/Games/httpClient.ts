import { DEFAULT_HEADERS, resolveResponse } from '../../Shared/httpClient';
import { TournamentGameEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const tournamentGamesApi = (phaseId: string) => `${PHASE_API}/${phaseId}/games`;

const deleteRequest = (phaseId: string, tournamentGameId: string) => {
  const url = `${tournamentGamesApi(phaseId)}/${tournamentGameId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = (phaseId: string) => {
  const url = `${tournamentGamesApi(phaseId)}`;

  return fetch(url).then(resolveResponse);
};

const getOne = (phaseId: string, tournamentGameId: string) => {
  const url = `${tournamentGamesApi(phaseId)}/${tournamentGameId}`;

  return fetch(url).then(resolveResponse);
};

const patch = (phaseId: string, tournamentGame: TournamentGameEntity) => {
  const url = `${tournamentGamesApi(phaseId)}/${tournamentGame.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({
      tournament_game: {
        away_score: tournamentGame.awayScore,
        away_team_id: tournamentGame.awayTeam && tournamentGame.awayTeam.id,
        datetime: tournamentGame.datetime,
        home_score: tournamentGame.homeScore,
        home_team_id: tournamentGame.homeTeam && tournamentGame.homeTeam.id,
        location: tournamentGame.location
      }
    })
  }).then(resolveResponse);
};

const post = (phaseId: string, tournamentGame: TournamentGameEntity) => {
  const url = `${tournamentGamesApi(phaseId)}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({
      tournament_game: {
        away_score: tournamentGame.awayScore,
        away_team_id: tournamentGame.awayTeam && tournamentGame.awayTeam.id,
        datetime: tournamentGame.datetime,
        home_score: tournamentGame.homeScore,
        home_team_id: tournamentGame.homeTeam && tournamentGame.homeTeam.id,
        location: tournamentGame.location
      }
    })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  getOne,
  patch,
  post
};
