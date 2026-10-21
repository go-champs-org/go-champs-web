import {
  playerStatThatIsVisible,
  type PlayerStatEntity,
  type StatLeadersEntity
} from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import { formatStatValue, STAT_SCOPES, type StatScope } from './rosterStats';

interface LeaderStatConfig {
  slug: string;
  scopes: StatScope[];
}

// A count ranks its total and its per-game average. A percentage is worked
// out from the made and missed totals in both scopes, so its per-game ranking
// is the same list: it only offers the total.
const counted = (slug: string): LeaderStatConfig => ({ slug, scopes: STAT_SCOPES });
const percentage = (slug: string): LeaderStatConfig => ({ slug, scopes: ['aggregate'] });

// The statistics the tournament home highlights, per sport, in card order: the
// carousel shows them three at a time on a desktop. A sport that is not here
// gets no highlights section. In 5x5 the field goals are the two-pointers.
const SPORT_LEADER_STATS: Record<string, LeaderStatConfig[]> = {
  basketball_5x5: [
    counted('points'),
    counted('rebounds'),
    counted('assists'),
    counted('plus_minus'),
    counted('steals'),
    counted('blocks'),
    counted('efficiency'),
    percentage('field_goal_percentage'),
    percentage('three_point_field_goal_percentage')
  ]
};

const statKeyInScope = (slug: string, scope: StatScope): string =>
  scope === 'per_game' ? `${slug}_per_game` : slug;

export interface LeaderStat {
  slug: string;
  title: string;
  // The stat key ranked in each scope the card offers, in toggle order.
  statKeys: Partial<Record<StatScope, string>>;
}

type StatsBySlug = Map<string, PlayerStatEntity>;

const visibleStatKey = (bySlug: StatsBySlug, statKey: string): boolean => {
  const stat = bySlug.get(statKey);
  return stat !== undefined && playerStatThatIsVisible(stat);
};

const visibleStatKeys = (
  bySlug: StatsBySlug,
  { slug, scopes }: LeaderStatConfig
): Partial<Record<StatScope, string>> =>
  Object.fromEntries(
    scopes.map(scope => [scope, statKeyInScope(slug, scope)]).filter(
      ([, statKey]) => visibleStatKey(bySlug, statKey)
    )
  );

const tournamentTitle = (bySlug: StatsBySlug, slug: string): string =>
  (bySlug.get(slug) || bySlug.get(statKeyInScope(slug, 'per_game')))?.title || '';

// A scope is offered only for a public statistic the tournament records: a
// ranking of a stat it doesn't have would always be empty, and a private one
// must never reach the public site, even when its per-game average is public.
// The card reads the stat's name in the page's language (`localizedTitles`,
// keyed by slug), and falls back to the title the tournament gave it, from the
// total when the tournament has it.
export const leaderStatsFor = (
  sportSlug: string,
  playerStats: PlayerStatEntity[],
  localizedTitles: Record<string, string> = {}
): LeaderStat[] => {
  const configs = SPORT_LEADER_STATS[sportSlug] || [];

  if (configs.length === 0) return [];

  const bySlug: StatsBySlug = new Map(playerStats.map(stat => [stat.slug, stat]));

  return configs
    .map(config => ({
      slug: config.slug,
      title: localizedTitles[config.slug] || tournamentTitle(bySlug, config.slug),
      statKeys: visibleStatKeys(bySlug, config)
    }))
    .filter(stat => Object.keys(stat.statKeys).length > 0);
};

// Every stat key the cards rank, for the single leaders request.
export const leaderStatKeys = (stats: LeaderStat[]): string[] =>
  stats.flatMap(stat => STAT_SCOPES.flatMap(scope => stat.statKeys[scope] || []));

export interface LeaderRow {
  playerId: string;
  playerName: string;
  photoUrl: string;
  teamName: string;
  value: string;
}

export interface LeaderCardScope {
  scope: StatScope;
  statKey: string;
  leaders: LeaderRow[];
}

export interface LeaderCard {
  slug: string;
  title: string;
  // Toggle order: the total first, so it is the one a card opens on.
  scopes: LeaderCardScope[];
}

// One card per stat, in the order of `stats`, with the first `perCard`
// leaders of each scope. A scope nobody qualified for yet is not offered, and
// a stat with no scope left has no card at all rather than an empty one.
export const leaderCards = (
  stats: LeaderStat[],
  groups: StatLeadersEntity[],
  teams: Pick<TeamEntity, 'id' | 'name'>[],
  perCard: number
): LeaderCard[] => {
  const groupByKey = new Map(groups.map(group => [group.statKey, group]));
  const teamNameById = new Map(teams.map(team => [team.id, team.name]));

  const cardScope = (scope: StatScope, statKey: string): LeaderCardScope[] => {
    const leaders = (groupByKey.get(statKey)?.leaders || []).slice(0, perCard);

    return leaders.length === 0
      ? []
      : [
          {
            scope,
            statKey,
            leaders: leaders.map(leader => ({
              playerId: leader.playerId,
              playerName: leader.playerName,
              photoUrl: leader.photoUrl,
              teamName: teamNameById.get(leader.teamId) || '',
              value: formatStatValue(statKey, String(leader.value))
            }))
          }
        ];
  };

  return stats.flatMap(stat => {
    const scopes = STAT_SCOPES.flatMap(scope => {
      const statKey = stat.statKeys[scope];
      return statKey ? cardScope(scope, statKey) : [];
    });

    return scopes.length > 0 ? [{ slug: stat.slug, title: stat.title, scopes }] : [];
  });
};
