import {
  ApiGameRequest,
  ApiGameWithDepedencies
} from '../Shared/httpClient/apiTypes';
import { mapApiTeamToTeamEntity } from '../Tournaments/Teams/dataMappers';
import { DEFAULT_TEAM_ENTITY } from '../Tournaments/Teams/state';
import { TournamentGameEntity } from './state';

export const mapApiGameToGameEntity = (
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

export const mapGameEntityToApiGameRequest = (
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
