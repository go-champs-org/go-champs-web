import {
  ApiGameRequest,
  ApiGameResponse,
  ApiGamesResponse,
  ApiGameWithDepedencies
} from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import { DEFAULT_TEAM_ENTITY } from '../Teams/state';
import { mapApiTeamToTeamEntity } from '../Teams/teamHttpClient';
import { TournamentGameEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseGamesApi = (phaseId: string) => `${PHASE_API}/${phaseId}/games`;

const mapApiGameToGameEntity = (
  apiGame: ApiGameWithDepedencies
): TournamentGameEntity => ({
  id: apiGame.id,
  awayScore: apiGame.away_score,
  awayTeam: apiGame.away_team
    ? mapApiTeamToTeamEntity(apiGame.away_team)
    : DEFAULT_TEAM_ENTITY,
  datetime: apiGame.datetime,
  homeScore: apiGame.home_score,
  homeTeam: apiGame.home_team
    ? mapApiTeamToTeamEntity(apiGame.home_team)
    : DEFAULT_TEAM_ENTITY,
  location: apiGame.location
});

const mapGameEntityToApiGameRequest = (
  game: TournamentGameEntity
): ApiGameRequest => ({
  tournament_game: {
    id: game.id,
    away_score: game.awayScore,
    away_team_id: game.awayTeam.id && game.awayTeam.id,
    datetime: game.datetime,
    home_score: game.homeScore,
    home_team_id: game.homeTeam.id && game.homeTeam.id,
    location: game.location
  }
});

const deleteRequest = (
  phaseId: string,
  tournamentGameId: string
): Promise<string> => {
  const url = `${phaseGamesApi(phaseId)}/${tournamentGameId}`;

  return httpClient.delete(url);
};

const get = async (
  phaseId: string,
  tournamentGameId: string
): Promise<TournamentGameEntity> => {
  const url = `${phaseGamesApi(phaseId)}/${tournamentGameId}`;

  const { data } = await httpClient.get<ApiGameResponse>(url);
  return mapApiGameToGameEntity(data);
};

const getAll = async (phaseId: string): Promise<TournamentGameEntity[]> => {
  const url = `${phaseGamesApi(phaseId)}`;

  const { data } = await httpClient.get<ApiGamesResponse>(url);
  return data.map(mapApiGameToGameEntity);
};

const patch = async (
  phaseId: string,
  tournamentGame: TournamentGameEntity
): Promise<TournamentGameEntity> => {
  const url = `${phaseGamesApi(phaseId)}/${tournamentGame.id}`;
  const body = mapGameEntityToApiGameRequest(tournamentGame);

  const { data } = await httpClient.patch<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

const post = async (
  phaseId: string,
  tournamentGame: TournamentGameEntity
): Promise<TournamentGameEntity> => {
  const url = `${phaseGamesApi(phaseId)}`;
  const body = mapGameEntityToApiGameRequest(tournamentGame);

  const { data } = await httpClient.post<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

export default {
  delete: deleteRequest,
  getAll,
  get,
  patch,
  post
};
