import {
  ApiDraw,
  ApiDrawMatch,
  ApiDrawPatchRequest,
  ApiDrawPostRequest,
  ApiPatchAndPostDrawMatch
} from '../Shared/httpClient/apiTypes';
import { DrawEntity, DrawMatchEntity } from './state';

const mapApiDrawToDrawMatch = (
  apiDrawMatch: ApiDrawMatch
): DrawMatchEntity => ({
  id: apiDrawMatch.id,
  firstTeamId: apiDrawMatch.first_team_id,
  firstTeamParentMatchId: apiDrawMatch.first_team_parent_id,
  firstTeamPlaceholder: apiDrawMatch.first_team_placeholder,
  firstTeamScore: apiDrawMatch.first_team_score,
  secondTeamId: apiDrawMatch.second_team_id,
  secondTeamParentMatchId: apiDrawMatch.second_team_parent_id,
  secondTeamPlaceholder: apiDrawMatch.second_team_placeholder,
  secondTeamScore: apiDrawMatch.second_team_score
});

const mapDrawMatchToApiDraw = (
  drawMatch: DrawMatchEntity
): ApiPatchAndPostDrawMatch => ({
  first_team_id: drawMatch.firstTeamId,
  first_team_parent_id: drawMatch.firstTeamParentMatchId,
  first_team_placeholder: drawMatch.firstTeamPlaceholder,
  first_team_score: drawMatch.firstTeamScore,
  second_team_id: drawMatch.secondTeamId,
  second_team_parent_id: drawMatch.secondTeamParentMatchId,
  second_team_placeholder: drawMatch.secondTeamPlaceholder,
  second_team_score: drawMatch.secondTeamScore
});

export const mapApiDrawToDrawEntity = (apiDraw: ApiDraw): DrawEntity => ({
  id: apiDraw.id,
  matches: apiDraw.matches.map(mapApiDrawToDrawMatch),
  order: apiDraw.order || 1,
  title: apiDraw.title || ''
});

export const mapDrawEntityToApiDrawPatchRequest = (
  draw: DrawEntity
): ApiDrawPatchRequest => ({
  draw: {
    id: draw.id,
    matches: draw.matches.map(mapDrawMatchToApiDraw),
    order: draw.order || undefined,
    title: draw.title
  }
});

export const mapDrawEntityToApiDrawPostRequest = (
  draw: DrawEntity,
  phaseId: string
): ApiDrawPostRequest => ({
  draw: {
    id: draw.id,
    matches: draw.matches.map(mapDrawMatchToApiDraw),
    order: draw.order || undefined,
    title: draw.title,
    phase_id: phaseId
  }
});
