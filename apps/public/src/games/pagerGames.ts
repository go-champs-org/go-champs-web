import type { GameEntity } from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import type { GameDay } from './gamesByDate';

type PagerTeam = Pick<TeamEntity, 'id' | 'name'>;

// The phase pager is a client island: a full GameEntity (both teams' coaches,
// assets, free-text info...) would ride in the RSC payload for nothing.
export type PagerGame = Pick<
  GameEntity,
  | 'id'
  | 'datetime'
  | 'location'
  | 'homeScore'
  | 'awayScore'
  | 'homePlaceholder'
  | 'awayPlaceholder'
  | 'isFinished'
  | 'resultType'
> & { homeTeam: PagerTeam; awayTeam: PagerTeam };

export interface PagerDay {
  key: string;
  label: string;
  games: PagerGame[];
}

const pagerTeam = ({ id, name }: TeamEntity): PagerTeam => ({ id, name });

const toPagerGame = (game: GameEntity): PagerGame => ({
  id: game.id,
  datetime: game.datetime,
  location: game.location,
  homeScore: game.homeScore,
  awayScore: game.awayScore,
  homePlaceholder: game.homePlaceholder,
  awayPlaceholder: game.awayPlaceholder,
  isFinished: game.isFinished,
  resultType: game.resultType,
  homeTeam: pagerTeam(game.homeTeam),
  awayTeam: pagerTeam(game.awayTeam)
});

export const toPagerDays = (days: GameDay[]): PagerDay[] =>
  days.map(day => ({ ...day, games: day.games.map(toPagerGame) }));
