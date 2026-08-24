import type { GameEntity } from '@gochamps/api-client';
import type { GameTeamNames } from './gameTeams';

// Search engines read a game page as a fixture between two competitors, so the
// schema mirrors what the scoreboard already shows: who plays, when and where.
const SPORTS_EVENT_STATUS = 'https://schema.org/EventScheduled';

interface GameStructuredDataInput {
  game: GameEntity;
  names: GameTeamNames;
  url: string;
  venue: string;
}

const sportsTeam = (name: string) => ({
  '@type': 'SportsTeam',
  name
});

// Schema.org rejects an empty startDate outright, and a game in a bracket can
// still be waiting for one, so an absent value drops the field entirely.
const startDateField = (datetime: string) =>
  datetime ? { startDate: datetime } : {};

const locationField = (venue: string) =>
  venue ? { location: { '@type': 'Place', name: venue } } : {};

const descriptionField = (info: string) =>
  info ? { description: info } : {};

export const gameStructuredData = ({
  game,
  names,
  url,
  venue
}: GameStructuredDataInput) => ({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: `${names.homeTeam} x ${names.awayTeam}`,
  url,
  eventStatus: SPORTS_EVENT_STATUS,
  homeTeam: sportsTeam(names.homeTeam),
  awayTeam: sportsTeam(names.awayTeam),
  competitor: [sportsTeam(names.homeTeam), sportsTeam(names.awayTeam)],
  ...startDateField(game.datetime),
  ...locationField(venue),
  ...descriptionField(game.info)
});

// JSON.stringify leaves "</script>" intact, which would close the tag early if
// a team name or a game note ever contained one.
export const serializeStructuredData = (schema: object): string =>
  JSON.stringify(schema).replace(/</g, '\\u003c');
