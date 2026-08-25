import type { PlayerEntity } from '@gochamps/api-client';

// The API gives every player a shirt number as free text, and plenty of
// amateur rosters leave it blank. Numbered players come first in numeric
// order; the rest fall to the end sorted by name, the way a printed roster
// reads.
const NO_NUMBER = Number.POSITIVE_INFINITY;

const shirtNumberOrder = (shirtNumber: string): number => {
  const parsed = Number.parseInt(shirtNumber, 10);
  return Number.isNaN(parsed) ? NO_NUMBER : parsed;
};

// Subtracting would give NaN for two unnumbered players and leave them in
// whatever order the API sent.
const byShirtNumberThenName = (
  left: PlayerEntity,
  right: PlayerEntity
): number => {
  const leftOrder = shirtNumberOrder(left.shirtNumber);
  const rightOrder = shirtNumberOrder(right.shirtNumber);

  if (leftOrder === rightOrder) return left.name.localeCompare(right.name);
  return leftOrder < rightOrder ? -1 : 1;
};

// A team's roster is the tournament roster filtered: the API exposes no
// players-by-team endpoint, and the players already ride along with the
// tournament payload.
export const teamRoster = (
  players: PlayerEntity[],
  teamId: string
): PlayerEntity[] =>
  players
    .filter(player => player.teamId === teamId)
    .sort(byShirtNumberThenName);
