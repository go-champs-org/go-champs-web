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
  [key: string]: string | number | boolean | GamesFilterOrCondition[] | undefined;
  or?: GamesFilterOrCondition[];
}

const mapGamesRequestFilterToQueryString = (
  filter: GamesRequestFilter
): string => {
  const regularParams: string[] = [];
  const orParams: string[] = [];

  Object.keys(filter).forEach((key: string) => {
    const value = filter[key];

    if (value === undefined) {
      return;
    }

    if (key === 'or' && Array.isArray(value)) {
      value.forEach((condition: GamesFilterOrCondition, index: number) => {
        Object.keys(condition).forEach((conditionKey: string) => {
          const conditionValue =
            condition[conditionKey as keyof GamesFilterOrCondition];

          if (conditionValue === undefined) {
            return;
          }

          orParams.push(
            `where[or][${index}][${conditionKey}]=${encodeURIComponent(conditionValue)}`
          );
        });
      });
      return;
    }

    regularParams.push(`where[${key}]=${encodeURIComponent(String(value))}`);
  });

  return [...regularParams, ...orParams].join('&');
};

export const getGame = async (gameId: string): Promise<GameEntity> => {
  const url = new URL(`v1/games/${gameId}`, getApiHost());
  const { data } = await httpClient.get<ApiGameResponse>(url.toString());
  return mapApiGameToGameEntity(data);
};

export const getGamesByFilter = async (
  filter: GamesRequestFilter
): Promise<GameEntity[]> => {
  const url = new URL('v1/games', getApiHost());
  const queryString = mapGamesRequestFilterToQueryString(filter);

  if (queryString) {
    url.search = queryString;
  }

  const { data } = await httpClient.get<ApiGamesResponse>(url.toString());
  return data.map(mapApiGameToGameEntity);
};
