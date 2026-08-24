import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiGameToGameEntity, GameEntity } from './dataMappers';
import { ApiGameResponse, ApiGamesResponse } from './apiTypes';

/**
 * A single condition inside the `or` group of a games filter.
 *
 * Only the team keys are needed today: a team's schedule is every game where
 * the team plays either at home or away.
 */
export interface GamesFilterOrCondition {
  home_team_id?: string;
  away_team_id?: string;
}

/**
 * Filter accepted by `GET v1/games`.
 *
 * Plain keys are serialized as `where[key]=value` equality checks. The optional
 * `or` array is serialized as `where[or][index][key]=value`, which is how the
 * backend expects a disjunction.
 */
export interface GamesRequestFilter {
  [key: string]: string | GamesFilterOrCondition[] | undefined;
  or?: GamesFilterOrCondition[];
}

const isDefined = ([, value]: [string, unknown]): boolean =>
  value !== undefined;

// The CMS interpolates filter values into the URL unescaped
// (apps/cms/src/Shared/httpClient/requestFilter.ts); encoding them here is the
// one deliberate difference, and for the ids this endpoint is called with the
// bytes on the wire are identical. Keys keep their literal brackets: the
// backend reads `where[or][0][home_team_id]`, and URLSearchParams would
// percent-encode the brackets into a filter the API does not recognise.
const equalityParam = ([key, value]: [string, unknown]): string =>
  `where[${key}]=${encodeURIComponent(String(value))}`;

const equalityParams = (filter: GamesRequestFilter): string[] =>
  Object.entries(filter)
    .filter(([key]) => key !== 'or')
    .filter(isDefined)
    .map(equalityParam);

const orConditionParams = (
  condition: GamesFilterOrCondition,
  index: number
): string[] =>
  Object.entries(condition)
    .filter(isDefined)
    .map(
      ([key, value]) =>
        `where[or][${index}][${key}]=${encodeURIComponent(String(value))}`
    );

// The CMS emits every plain key before the whole `or` group rather than in the
// order the object was written, and that ordering is visible on the wire.
const mapGamesRequestFilterToQueryString = (
  filter: GamesRequestFilter
): string =>
  [
    ...equalityParams(filter),
    ...(filter.or || []).flatMap(orConditionParams)
  ].join('&');

export const getGame = async (gameId: string): Promise<GameEntity> => {
  const url = new URL(`v1/games/${gameId}`, getApiHost());
  const { data } = await httpClient.get<ApiGameResponse>(url.toString());
  return mapApiGameToGameEntity(data);
};

export const getGamesByFilter = async (
  filter: GamesRequestFilter
): Promise<GameEntity[]> => {
  const url = new URL('v1/games', getApiHost());
  url.search = mapGamesRequestFilterToQueryString(filter);

  const { data } = await httpClient.get<ApiGamesResponse>(url.toString());
  return data.map(mapApiGameToGameEntity);
};
