import { TeamEntity } from '@gochamps/domain-types';
import {
  mapApiOrganizationToOrganizationEntity,
  OrganizationEntity
} from '../organizations/dataMappers';
import { mapApiPhaseToPhaseEntity, PhaseEntity } from '../phases/dataMappers';
import { mapApiPlayerToPlayerEntity, PlayerEntity } from '../players/dataMappers';
import { mapApiTeamToTeamEntity } from '../teams/dataMappers';
import {
  ApiPlayerStat,
  ApiScoreboardSetting,
  ApiTournamentWithTeams
} from './apiTypes';

// The API has no visibility flag on a stat: the CMS decides it from the slug,
// and the public site must hide exactly the same ones
// (apps/cms/src/Tournaments/dataMappers.ts).
export const PRIVATE_STAT_SLUGS = [
  'disqualifications',
  'ejections',
  'efficiency',
  'field_goals_attempted',
  'field_goals_missed',
  'fouls_flagrant',
  'fouls_personal',
  'fouls_technical',
  'free_throws_attempted',
  'free_throws_missed',
  'game_played',
  'game_started',
  'minutes_played',
  'plus_minus',
  'three_point_field_goals_attempted',
  'three_point_field_goals_missed'
];

export type PlayerStatVisibility = 'public' | 'private';

export interface PlayerStatEntity {
  id: string;
  title: string;
  slug: string;
  visibility: PlayerStatVisibility;
}

// How much of a game in progress the scoreboard app is allowed to publish on
// the public site.
export type LiveSiteUpdate =
  | 'no-live-update'
  | 'team-score-live-update'
  | 'full-live-update';

const LIVE_SITE_UPDATES: LiveSiteUpdate[] = [
  'no-live-update',
  'team-score-live-update',
  'full-live-update'
];

export interface ScoreboardSettingEntity {
  liveSiteUpdate: LiveSiteUpdate;
}

// A tournament with no scoreboard settings behaves as fully live, same
// default the CMS applies. Built per call so two mapped tournaments never
// share one settings object.
const defaultScoreboardSetting = (): ScoreboardSettingEntity => ({
  liveSiteUpdate: 'full-live-update'
});

export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
}

// No known real tournament lacks an organization — this exists only so a
// malformed payload degrades to blank fields instead of a crash.
const DEFAULT_ORGANIZATION: OrganizationEntity = {
  id: '',
  name: '',
  slug: '',
  logoUrl: ''
};

export interface TournamentWithTeamsEntity extends TournamentEntity {
  teams: TeamEntity[];
  organization: OrganizationEntity;
  // Every player in the tournament, each carrying its own teamId: a team's
  // roster is this list filtered, not a request of its own.
  players: PlayerEntity[];
  // The tournament's phases in order, so the player profile can label and
  // sort its per-phase stats without a request of its own.
  phases: PhaseEntity[];
  sportSlug: string;
  sportName: string;
  playerStats: PlayerStatEntity[];
  scoreboardSetting: ScoreboardSettingEntity;
}

const statVisibility = (slug: string): PlayerStatVisibility =>
  PRIVATE_STAT_SLUGS.includes(slug) ? 'private' : 'public';

export const mapApiPlayerStatToEntity = (
  apiPlayerStat: ApiPlayerStat
): PlayerStatEntity => {
  const slug = apiPlayerStat.slug || '';

  return {
    id: apiPlayerStat.id,
    title: apiPlayerStat.title,
    slug,
    visibility: statVisibility(slug)
  };
};

// A mode this release does not know about is treated as the default rather
// than trusted into the union, where it would match no branch of the box
// score gate and fail silently.
const toLiveSiteUpdate = (value: string): LiveSiteUpdate =>
  LIVE_SITE_UPDATES.find(mode => mode === value) ||
  defaultScoreboardSetting().liveSiteUpdate;

export const mapApiScoreboardSettingToEntity = (
  apiScoreboardSetting?: ApiScoreboardSetting
): ScoreboardSettingEntity =>
  apiScoreboardSetting
    ? { liveSiteUpdate: toLiveSiteUpdate(apiScoreboardSetting.live_site_update) }
    : defaultScoreboardSetting();

export const playerStatThatIsVisible = (playerStat: PlayerStatEntity): boolean =>
  playerStat.visibility === 'public';

export const mapApiTournamentToTournamentWithTeamsEntity = (
  apiTournament: ApiTournamentWithTeams
): TournamentWithTeamsEntity => ({
  id: apiTournament.id,
  name: apiTournament.name,
  slug: apiTournament.slug,
  logoUrl: apiTournament.logo_url || '',
  organization: apiTournament.organization
    ? mapApiOrganizationToOrganizationEntity(apiTournament.organization)
    : DEFAULT_ORGANIZATION,
  teams: apiTournament.teams.map(mapApiTeamToTeamEntity),
  players: (apiTournament.players || []).map(mapApiPlayerToPlayerEntity),
  phases: (apiTournament.phases || []).map(mapApiPhaseToPhaseEntity),
  sportSlug: apiTournament.sport_slug || '',
  sportName: apiTournament.sport_name || '',
  playerStats: (apiTournament.player_stats || []).map(mapApiPlayerStatToEntity),
  scoreboardSetting: mapApiScoreboardSettingToEntity(
    apiTournament.scoreboard_setting
  )
});
