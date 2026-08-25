import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiGameToGameEntity, GameEntity } from './dataMappers';
import { ApiGameResponse, ApiGamesResponse } from './apiTypes';

/**
 * A single condition inside the `or` group of a games filter.
 *
 * Only the team keys are needed today: a team's schedule is every game where
 * the team plays either at home or away. `or` is undocumented but verified
 * against the live API — it returns the union of both sides.
 */
export interface GamesFilterOrCondition {
  home_team_id?: string;
  away_team_id?: string;
}

/**
 * Filter accepted by `GET v1/games`.
 *
 * Plain keys are serialized as `where[key]=value` equality checks, the `or`
 * array as `where[or][index][key]=value`. A filter key maps to a column: the
 * API answers 500 for a key that does not exist, and 400 for a list value
 * (neither `a,b` nor repeated `key[]=` is supported), which is why values are
 * scalars.
 */
export interface GamesRequestFilter {
  [key: string]: string | number | boolean | GamesFilterOrCondition[] | undefined;
  or?: GamesFilterOrCondition[];
}

type QueryEntry = [string, string];

const isDefined = ([, value]: [string, unknown]): boolean =>
  value !== undefined;

const equalityEntries = (filter: GamesRequestFilter): QueryEntry[] =>
  Object.entries(filter)
    .filter(([key]) => key !== 'or')
    .filter(isDefined)
    .map(([key, value]) => [`where[${key}]`, String(value)]);

const orConditionEntries = (
  condition: GamesFilterOrCondition,
  index: number
): QueryEntry[] =>
  Object.entries(condition)
    .filter(isDefined)
    .map(([key, value]) => [`where[or][${index}][${key}]`, String(value)]);

// URLSearchParams percent-encodes the brackets, which the API decodes back —
// verified on the live endpoint for both the plain and the `or` form. That is
// also what the other filtered endpoint in this package already sends
// (aggregatedPlayerStats.ts), so the whole client speaks one dialect.
const gamesFilterSearch = (filter: GamesRequestFilter): string =>
  new URLSearchParams([
    ...equalityEntries(filter),
    ...(filter.or || []).flatMap(orConditionEntries)
  ]).toString();

export const getGame = async (gameId: string): Promise<GameEntity> => {
  const url = new URL(`v1/games/${gameId}`, getApiHost());
  const { data } = await httpClient.get<ApiGameResponse>(url.toString());
  return mapApiGameToGameEntity(data);
};

export const getGamesByFilter = async (
  filter: GamesRequestFilter
): Promise<GameEntity[]> => {
  const url = new URL('v1/games', getApiHost());
  url.search = gamesFilterSearch(filter);

  const { data } = await httpClient.get<ApiGamesResponse>(url.toString());
  return data.map(mapApiGameToGameEntity);
};
