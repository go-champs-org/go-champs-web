import {
  ApiGameWithDepedencies,
  ApiGamePostRequest,
  ApiGamePatchRequest
} from '../Shared/httpClient/apiTypes';
import { mapApiTeamToTeamEntity } from '../Teams/dataMappers';
import { DEFAULT_TEAM } from '../Teams/state';
import { GameEntity } from './state';

export const mapApiGameToGameEntity = (
  apiGame: ApiGameWithDepedencies
): GameEntity => ({
  id: apiGame.id,
  awayScore: apiGame.away_score,
  awayTeam: apiGame.away_team
    ? mapApiTeamToTeamEntity(apiGame.away_team)
    : DEFAULT_TEAM,
  datetime: apiGame.datetime,
  homeScore: apiGame.home_score,
  homeTeam: apiGame.home_team
    ? mapApiTeamToTeamEntity(apiGame.home_team)
    : DEFAULT_TEAM,
  location: apiGame.location
});

export const mapGameEntityToApiGamePostRequest = (
  game: GameEntity,
  phaseId: string
): ApiGamePostRequest => ({
  game: {
    id: game.id,
    away_score: game.awayScore,
    away_team_id: game.awayTeam.id && game.awayTeam.id,
    datetime: game.datetime,
    home_score: game.homeScore,
    home_team_id: game.homeTeam.id && game.homeTeam.id,
    location: game.location,
    phase_id: phaseId
  }
});

export const mapGameEntityToApiGamePatchRequest = (
  game: GameEntity
): ApiGamePatchRequest => ({
  game: {
    id: game.id,
    away_score: game.awayScore,
    away_team_id: game.awayTeam.id && game.awayTeam.id,
    datetime: game.datetime,
    home_score: game.homeScore,
    home_team_id: game.homeTeam.id && game.homeTeam.id,
    location: game.location
  }
});
