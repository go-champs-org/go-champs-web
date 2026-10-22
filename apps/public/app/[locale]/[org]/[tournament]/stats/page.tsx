import type { Metadata } from 'next';
import Link from 'next/link';
import { ManageButton } from '@/src/components/ManageButton';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getAggregatedPlayerStatsByFilter,
  getSportBySlug,
  getTournamentBySlug,
  type AggregatedPlayerStatsLogEntity,
  type SportEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import { Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { buildPageMetadata } from '@/src/seo/metadata';
import { publicPath } from '@/src/i18n/publicPath';
import {
  availableScopes,
  columnViewsByScope,
  statColumnsByScope,
  type StatColumnView,
  type StatScope
} from '@/src/stats/rosterStats';
import {
  pickPlayers,
  pickTeams,
  tournamentStatRows,
  type PickedPlayer,
  type PickedTeam,
  type TournamentStatRow
} from '@/src/stats/tournamentStats';
import { defaultSortSlugs, tournamentStatsOrder } from '@/src/stats/sportStatColumns';
import { minStatFilterSlugs } from '@/src/stats/sportStatFilters';
import { TournamentStatsTable } from './TournamentStatsTable';
import type {
  StatsFilterOption,
  TournamentStatsFilterLabels
} from './TournamentStatsFilters';

// The tournament-wide stats table moves as rarely as a team's roster, so the
// rendered HTML can be reused for minutes at a time instead of hitting the
// API on every view.
// Fifteen minutes: rosters and stats move slower than the games they come from.
export const revalidate = 900;

// The tournament list is unbounded, so nothing is prerendered at build time —
// declaring the params is what puts this route on the ISR path.
export async function generateStaticParams() {
  return [];
}

interface PlayerStatsPageParams {
  locale: string;
  org: string;
  tournament: string;
}

const playerStatsPagePath = ({ org, tournament }: PlayerStatsPageParams): string =>
  `/${org}/${tournament}/stats`;

// The stats card carries no padding of its own — its header band runs edge
// to edge, the same trim the team page's roster card uses.
const SECTION_CLASS = 'shadow-[0_2px_10px_var(--shadow-elevated)]';

// generateMetadata and the page both need the tournament; cache() keeps that
// to a single request instead of fetching it twice per view.
const loadTournament = cache(
  async (
    org: string,
    tournament: string
  ): Promise<TournamentWithTeamsEntity | null> => {
    try {
      return await getTournamentBySlug(org, tournament);
    } catch (error) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }
);

// The sport's game-level catalogue orders the stat columns; without it the
// table still renders, as the statistics the tournament named in API order.
const loadSport = (sportSlug: string): Promise<SportEntity | null> =>
  sportSlug ? getSportBySlug(sportSlug).catch(() => null) : Promise.resolve(null);

// The logs are a companion to the roster, same as the team page's: an
// unreachable endpoint leaves the roster standing with a dash in every
// column.
const loadTournamentStats = (
  tournamentId: string
): Promise<AggregatedPlayerStatsLogEntity[]> =>
  getAggregatedPlayerStatsByFilter({ tournamentId }).catch(() => []);

interface PlayerStatsView {
  tournament: TournamentWithTeamsEntity;
  sport: SportEntity | null;
  statsLogs: AggregatedPlayerStatsLogEntity[];
}

const loadPlayerStatsView = async (
  org: string,
  tournamentSlug: string
): Promise<PlayerStatsView> => {
  const tournament = await loadTournament(org, tournamentSlug);
  if (!tournament) notFound();

  const [sport, statsLogs] = await Promise.all([
    loadSport(tournament.sportSlug),
    loadTournamentStats(tournament.id)
  ]);

  return { tournament, sport, statsLogs };
};

export async function generateMetadata({
  params
}: {
  params: Promise<PlayerStatsPageParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug } = routeParams;
  const [tournament, t, tTeam] = await Promise.all([
    loadTournament(org, tournamentSlug),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'team' })
  ]);

  const values = {
    tournament: tournament ? tournament.name : tTeam('unknownTournament')
  };

  return buildPageMetadata({
    locale,
    path: playerStatsPagePath(routeParams),
    title: t('playerStatsTitle', values),
    description: t('playerStatsDescription', values),
    noIndex: !tournament
  });
}

interface StatsTableSectionProps {
  tournamentId: string;
  players: PickedPlayer[];
  teams: PickedTeam[];
  rows: TournamentStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  playerHrefBase: string;
  teamHrefBase: string;
  defaultSortSlugs: Record<string, string>;
  phases: StatsFilterOption[];
  minStatFilters: StatsFilterOption[];
  filterLabels: TournamentStatsFilterLabels;
  labels: {
    title: string;
    statsScope: string;
    glossary: string;
    position: string;
    playerName: string;
    teamColumn: string;
    sortByStat: string;
    noStats: string;
    noFilteredStats: string;
  };
}

// A tournament with no players carrying a recorded stat has nothing for the
// table to list (`rows` is already filtered to those, see
// `tournamentStatRows`); the empty state is decided here rather than by the
// table returning nothing for itself.
function StatsTableSection({
  tournamentId,
  players,
  teams,
  rows,
  columnsByScope,
  scopes,
  scopeLabels,
  playerHrefBase,
  teamHrefBase,
  defaultSortSlugs,
  phases,
  minStatFilters,
  filterLabels,
  labels
}: StatsTableSectionProps) {
  return rows.length > 0 ? (
    <Surface
      as="section"
      className={`${SECTION_CLASS} overflow-hidden`}
      data-testid="tournament-stats"
    >
      <TournamentStatsTable
        tournamentId={tournamentId}
        players={players}
        teams={teams}
        rows={rows}
        columnsByScope={columnsByScope}
        scopes={scopes}
        scopeLabels={scopeLabels}
        title={labels.title}
        scopeLegend={labels.statsScope}
        glossaryLabel={labels.glossary}
        numberLabel={labels.position}
        nameLabel={labels.playerName}
        sortLabel={labels.sortByStat}
        teamColumnLabel={labels.teamColumn}
        playerHrefBase={playerHrefBase}
        teamHrefBase={teamHrefBase}
        defaultSortSlugs={defaultSortSlugs}
        phases={phases}
        minStatFilters={minStatFilters}
        filterLabels={filterLabels}
        noFilteredStatsLabel={labels.noFilteredStats}
      />
    </Surface>
  ) : (
    <Surface as="section" className={`${SECTION_CLASS} p-6`} data-testid="tournament-stats">
      <p className="text-sm text-muted">{labels.noStats}</p>
    </Surface>
  );
}

export default async function PlayerStatsPage({
  params
}: {
  params: Promise<PlayerStatsPageParams>;
}) {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug } = routeParams;
  setRequestLocale(locale);

  const [view, t, tTeam, tCommon] = await Promise.all([
    loadPlayerStatsView(org, tournamentSlug),
    getTranslations('playerStats'),
    getTranslations('team'),
    getTranslations('common')
  ]);

  const { tournament, sport, statsLogs } = view;

  const statDescriptions = tTeam.raw('statDescriptions') as Record<string, string>;
  const rows = tournamentStatRows(tournament.players, statsLogs, tournament.teams);
  const columnOrder = tournamentStatsOrder(tournament.sportSlug);
  const scopes = availableScopes(tournament.playerStats, sport, columnOrder);
  const columnsByScope = columnViewsByScope(
    statColumnsByScope(tournament.playerStats, sport, scopes, columnOrder),
    tTeam.raw('statColumns') as Record<string, string>,
    statDescriptions
  );

  const phases = [...tournament.phases]
    .sort((left, right) => left.order - right.order)
    .map(phase => ({ id: phase.id, label: phase.title }));
  const minStatFilters = minStatFilterSlugs(
    tournament.sportSlug,
    tournament.playerStats
  ).map(slug => ({
    id: slug,
    label: t('minStatFilter', { stat: statDescriptions[slug] || slug })
  }));

  const tournamentHref = publicPath(`/${org}/${tournamentSlug}`);
  const playerHrefBase = publicPath(`/${org}/${tournamentSlug}/athlete/`);
  const teamHrefBase = publicPath(`/${org}/${tournamentSlug}/team/`);

  return (
    <main
      data-testid="player-stats-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href={tournamentHref}
            className="text-sm font-semibold text-primary-dark hover:underline"
          >
            {tournament.name}
          </Link>
          <ManageButton
            organizationId={tournament.organization.id}
            org={org}
            tournament={tournamentSlug}
            label={tCommon('manage')}
          />
        </div>

        <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
          {t('title')}
        </h1>

        <StatsTableSection
          tournamentId={tournament.id}
          players={pickPlayers(tournament.players)}
          teams={pickTeams(tournament.teams)}
          rows={rows}
          columnsByScope={columnsByScope}
          scopes={scopes}
          scopeLabels={{
            aggregate: tTeam('scopeAggregate'),
            per_game: tTeam('scopePerGame')
          }}
          playerHrefBase={playerHrefBase}
          teamHrefBase={teamHrefBase}
          defaultSortSlugs={defaultSortSlugs(tournament.sportSlug)}
          phases={phases}
          minStatFilters={minStatFilters}
          filterLabels={{
            legend: t('filters'),
            phase: t('phaseFilter'),
            allPhases: t('allPhases'),
            team: t('teamFilter'),
            allTeams: t('allTeams')
          }}
          labels={{
            title: t('title'),
            statsScope: tTeam('statsScope'),
            glossary: tTeam('glossary'),
            position: tTeam('position'),
            playerName: tTeam('playerName'),
            teamColumn: t('teamColumn'),
            sortByStat: tTeam.raw('sortByStat') as string,
            noStats: t('noStats'),
            noFilteredStats: t('noFilteredStats')
          }}
        />
      </div>
    </main>
  );
}
