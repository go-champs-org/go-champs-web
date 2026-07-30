import httpClient from './httpClient';
import { REACT_APP_SCOREBOARD_APP_URL } from '../env';
import { ApiGameGetResponse } from './scoreboardApiTypes';

const GAMES_API = `${REACT_APP_SCOREBOARD_APP_URL}v1/games`;

const getGame = async (gameId: string) => {
  const { data } = await httpClient.get<ApiGameGetResponse>(
    `${GAMES_API}/${gameId}`
  );
  return data;
};

export default {
  getGame
};
