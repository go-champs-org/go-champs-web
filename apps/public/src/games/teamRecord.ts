import type { GameEntity } from '@gochamps/api-client';

export interface TeamRecord {
  games: number;
  wins: number;
}

export type GameSide = 'home' | 'away';

// A walkover is awarded, not played: the result type names the winner and the
// scoreline says nothing (apps/cms/src/Games/state.ts).
const WALKOVER_WINNER: Record<string, GameSide> = {
  home_team_walkover: 'home',
  away_team_walkover: 'away'
};

const playedWinner = (game: GameEntity): GameSide | undefined => {
  if (game.homeScore === game.awayScore) return undefined;

  return game.homeScore > game.awayScore ? 'home' : 'away';
};

/**
 * Which side won, or undefined while the game is undecided — still to be
 * played, in progress, or drawn.
 */
export const gameWinner = (game: GameEntity): GameSide | undefined => {
  const awarded = WALKOVER_WINNER[game.resultType];

  if (awarded) return awarded;

  // A game in progress already carries a score; it only counts once the
  // organizer closes it.
  return game.isFinished ? playedWinner(game) : undefined;
};

const teamSide = (game: GameEntity, teamId: string): GameSide =>
  game.homeTeam.id === teamId ? 'home' : 'away';

/**
 * How the team's schedule reads at a glance: how many games it holds and how
 * many of them the team won.
 */
export const teamRecord = (
  games: GameEntity[],
  teamId: string
): TeamRecord => ({
  games: games.length,
  wins: games.filter(game => gameWinner(game) === teamSide(game, teamId)).length
});
