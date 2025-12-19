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
  awayPlaceholder: apiGame.away_placeholder ? apiGame.away_placeholder : '',
  awayScore: apiGame.away_score,
  awayTeam: apiGame.away_team
    ? mapApiTeamToTeamEntity(apiGame.away_team)
    : DEFAULT_TEAM,
  datetime: apiGame.datetime ? apiGame.datetime : '',
  homePlaceholder: apiGame.home_placeholder ? apiGame.home_placeholder : '',
  homeScore: apiGame.home_score,
  homeTeam: apiGame.home_team
    ? mapApiTeamToTeamEntity(apiGame.home_team)
    : DEFAULT_TEAM,
  info: apiGame.info ? apiGame.info : '',
  isFinished: apiGame.is_finished,
  location: apiGame.location,
  phaseId: apiGame.phase_id,
  youTubeCode: apiGame.youtube_code ? apiGame.youtube_code : '',
  liveState: apiGame.live_state,
  resultType: apiGame.result_type
});

export const mapGameEntityToApiGamePostRequest = (
  game: GameEntity,
  phaseId: string
): ApiGamePostRequest => ({
  game: {
    id: game.id,
    away_placeholder: game.awayPlaceholder && game.awayPlaceholder,
    away_score: game.awayScore,
    away_team_id: game.awayTeam.id && game.awayTeam.id,
    datetime: game.datetime ? game.datetime : '',
    home_placeholder: game.homePlaceholder && game.homePlaceholder,
    home_score: game.homeScore,
    home_team_id: game.homeTeam.id && game.homeTeam.id,
    info: game.info ? game.info : '',
    is_finished: game.isFinished,
    location: game.location ? game.location : '',
    phase_id: phaseId,
    youtube_code: game.youTubeCode && game.youTubeCode,
    live_state: game.liveState,
    result_type: game.resultType
  }
});

export const mapGameEntityToApiGamePatchRequest = (
  game: GameEntity
): ApiGamePatchRequest => ({
  game: {
    id: game.id,
    away_placeholder: game.awayPlaceholder && game.awayPlaceholder,
    away_score: game.awayScore,
    away_team_id: game.awayTeam.id && game.awayTeam.id,
    datetime: game.datetime ? game.datetime : '',
    home_placeholder: game.homePlaceholder && game.homePlaceholder,
    home_score: game.homeScore,
    home_team_id: game.homeTeam.id && game.homeTeam.id,
    info: game.info ? game.info : '',
    is_finished: game.isFinished,
    location: game.location ? game.location : '',
    youtube_code: game.youTubeCode && game.youTubeCode,
    live_state: game.liveState,
    result_type: game.resultType
  }
});
