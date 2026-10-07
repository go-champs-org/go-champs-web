import type { GameEntity } from '@gochamps/api-client';

// A bracket match carries no game id: the organizer names it after the number
// of the game that plays it out.
export const gameIdsByNumber = (
  games: Pick<GameEntity, 'id' | 'number'>[]
): Record<string, string> =>
  Object.fromEntries(
    games.filter(game => game.number).map(game => [game.number, game.id])
  );
