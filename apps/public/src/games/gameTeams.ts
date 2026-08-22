import type { TeamEntity } from '@gochamps/domain-types';
import type { GameEntity } from '@gochamps/api-client';

// A game in a bracket exists before its teams are known: until then the API
// carries only the placeholder the organizer wrote ("Vencedor do jogo 3").
export const teamDisplayName = (
  team: TeamEntity,
  placeholder: string,
  fallback: string
): string => team.name || placeholder || fallback;

// The index signature is what lets these names be handed straight to
// next-intl as message values, which are typed as a plain string record.
export interface GameTeamNames {
  [name: string]: string;
  homeTeam: string;
  awayTeam: string;
}

export const gameTeamNames = (
  game: GameEntity | null,
  fallback: string
): GameTeamNames => ({
  homeTeam: game
    ? teamDisplayName(game.homeTeam, game.homePlaceholder, fallback)
    : fallback,
  awayTeam: game
    ? teamDisplayName(game.awayTeam, game.awayPlaceholder, fallback)
    : fallback
});
