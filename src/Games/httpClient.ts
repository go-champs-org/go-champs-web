import { DEFAULT_HEADERS, resolveResponse } from '../Shared/httpClient';
import { GameEntity } from './state';

const GAME_API = 'https://yochamps-api.herokuapp.com/api/games';

const deleteRequest = (gameId: string) => {
  const url = `${GAME_API}/${gameId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = () => {
  const url = GAME_API;

  return fetch(url).then(resolveResponse);
};

const patch = (game: GameEntity) => {
  const url = `${GAME_API}/${game.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({
      game: {
        away_score: game.awayScore,
        away_team_name: game.awayTeamName,
        datetime: game.datetime,
        home_score: game.homeScore,
        home_team_name: game.homeTeamName,
        location: game.location
      }
    })
  }).then(resolveResponse);
};

const post = (game: GameEntity) => {
  const url = GAME_API;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({
      game: {
        away_score: game.awayScore,
        away_team_name: game.awayTeamName,
        datetime: game.datetime,
        home_score: game.homeScore,
        home_team_name: game.homeTeamName,
        location: game.location
      }
    })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  patch,
  post
};
