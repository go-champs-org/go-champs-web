import type { GameSide } from './teamRecord';

/**
 * How a side of a game reads once the result is known: the winner is the one
 * the row leads with, the side it beat steps back, and an undecided game — one
 * still to be played, in progress or drawn — leaves both as they are.
 */
export type SideEmphasis = 'winner' | 'loser' | 'neutral';

export const sideEmphasis = (
  winner: GameSide | undefined,
  side: GameSide
): SideEmphasis => {
  if (!winner) return 'neutral';

  return winner === side ? 'winner' : 'loser';
};
