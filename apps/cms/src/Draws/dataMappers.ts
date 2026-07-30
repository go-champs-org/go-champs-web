import {
  ApiDraw,
  ApiDrawMatch,
  ApiDrawPatchRequest,
  ApiDrawPostRequest,
  ApiPatchAndPostDrawMatch,
  ApiDrawBatchPatchRequest
} from '../Shared/httpClient/apiTypes';
import { DrawEntity, DrawMatchEntity } from './state';
import { mapStringOrDefault } from '../Shared/store/helpers';

const mapApiDrawToDrawMatch = (
  apiDrawMatch: ApiDrawMatch
): DrawMatchEntity => ({
  id: apiDrawMatch.id,
  firstTeamId: mapStringOrDefault(apiDrawMatch.first_team_id),
  firstTeamParentMatchId: mapStringOrDefault(apiDrawMatch.first_team_parent_id),
  firstTeamPlaceholder: mapStringOrDefault(apiDrawMatch.first_team_placeholder),
  firstTeamScore: mapStringOrDefault(apiDrawMatch.first_team_score),
  info: mapStringOrDefault(apiDrawMatch.info),
  name: mapStringOrDefault(apiDrawMatch.name),
  secondTeamId: mapStringOrDefault(apiDrawMatch.second_team_id),
  secondTeamParentMatchId: mapStringOrDefault(
    apiDrawMatch.second_team_parent_id
  ),
  secondTeamPlaceholder: mapStringOrDefault(
    apiDrawMatch.second_team_placeholder
  ),
  secondTeamScore: mapStringOrDefault(apiDrawMatch.second_team_score)
});

const mapDrawMatchToApiDraw = (
  drawMatch: DrawMatchEntity
): ApiPatchAndPostDrawMatch => ({
  first_team_id: mapStringOrDefault(drawMatch.firstTeamId),
  first_team_parent_id: mapStringOrDefault(drawMatch.firstTeamParentMatchId),
  first_team_placeholder: mapStringOrDefault(drawMatch.firstTeamPlaceholder),
  first_team_score: mapStringOrDefault(drawMatch.firstTeamScore),
  info: mapStringOrDefault(drawMatch.info),
  name: mapStringOrDefault(drawMatch.name),
  second_team_id: mapStringOrDefault(drawMatch.secondTeamId),
  second_team_parent_id: mapStringOrDefault(drawMatch.secondTeamParentMatchId),
  second_team_placeholder: mapStringOrDefault(drawMatch.secondTeamPlaceholder),
  second_team_score: mapStringOrDefault(drawMatch.secondTeamScore)
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

export const mapDrawEntitiesToApiDrawPatchBatchRequest = (
  draws: DrawEntity[]
): ApiDrawBatchPatchRequest => ({
  draws: draws.map(draw => ({
    id: draw.id,
    matches: draw.matches.map(mapDrawMatchToApiDraw),
    order: draw.order || undefined,
    title: draw.title
  }))
});

export const mapDrawOrderByIndex = (draw: DrawEntity, index: number) => ({
  ...draw,
  order: index + 1
});

export const mapDrawsOrderByIndex = (draws: DrawEntity[]) =>
  draws.map(mapDrawOrderByIndex);
