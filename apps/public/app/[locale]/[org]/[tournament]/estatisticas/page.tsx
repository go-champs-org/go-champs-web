import type { Metadata } from 'next';
import Link from 'next/link';
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
import { CMS_URL } from '@/src/config/cms';
import { buildPageMetadata } from '@/src/seo/metadata';
import {
  availableScopes,
  columnViewsByScope,
  statColumnsByScope,
  statTotalsByScope,
  type StatColumnView,
  type StatScope
} from '@/src/stats/rosterStats';
import { tournamentStatRows, type TournamentStatRow } from '@/src/stats/tournamentStats';
import { RosterStatsTable } from '../times/[teamId]/RosterStatsTable';

// The tournament-wide stats table moves as rarely as a team's roster, so the
// rendered HTML can be reused for minutes at a time instead of hitting the
// API on every view.
export const revalidate = 300;

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
  `/${org}/${tournament}/estatisticas`;

// The stats card carries no padding of its own — its header band and totals
// band run edge to edge, the same trim the team page's roster card uses.
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
  rows: TournamentStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  totalsByScope: Record<string, Record<string, string>>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  playerHrefBase: string;
  labels: {
    title: string;
    statsScope: string;
    glossary: string;
    total: string;
    shirtNumber: string;
    playerName: string;
    teamColumn: string;
    sortByStat: string;
    noStats: string;
  };
}

// A tournament with no players yet has nothing for the table to list; the
// empty state is decided here rather than by the table returning nothing for
// itself.
function StatsTableSection({
  rows,
  columnsByScope,
  totalsByScope,
  scopes,
  scopeLabels,
  playerHrefBase,
  labels
}: StatsTableSectionProps) {
  return rows.length > 0 ? (
    <Surface
      as="section"
      className={`${SECTION_CLASS} overflow-hidden`}
      data-testid="tournament-stats"
    >
      <RosterStatsTable
        rows={rows}
        columnsByScope={columnsByScope}
        totalsByScope={totalsByScope}
        scopes={scopes}
        scopeLabels={scopeLabels}
        title={labels.title}
        scopeLegend={labels.statsScope}
        glossaryLabel={labels.glossary}
        numberLabel={labels.shirtNumber}
        nameLabel={labels.playerName}
        totalLabel={labels.total}
        sortLabel={labels.sortByStat}
        hasTeamColumn
        teamColumnLabel={labels.teamColumn}
        playerHrefBase={playerHrefBase}
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

  const [view, t, tTeam] = await Promise.all([
    loadPlayerStatsView(org, tournamentSlug),
    getTranslations('playerStats'),
    getTranslations('team')
  ]);

  const { tournament, sport, statsLogs } = view;

  const rows = tournamentStatRows(tournament.players, statsLogs, tournament.teams);
  const scopes = availableScopes(tournament.playerStats, sport);
  const columnsByScope = columnViewsByScope(
    statColumnsByScope(tournament.playerStats, sport, scopes),
    tTeam.raw('statColumns') as Record<string, string>
  );
  const totalsByScope = statTotalsByScope(rows, columnsByScope);

  const tournamentHref = `${CMS_URL}/${org}/${tournamentSlug}`;
  const playerHrefBase = `/${locale}/${org}/${tournamentSlug}/jogadores/`;

  return (
    <main
      data-testid="player-stats-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        <a
          href={tournamentHref}
          className="text-sm font-semibold text-primary-dark hover:underline"
        >
          {tournament.name}
        </a>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
            {t('title')}
          </h1>
          <Link
            href={`/${locale}/${org}/${tournamentSlug}/estatisticas/resumo`}
            className="text-sm font-semibold text-primary-dark hover:underline"
          >
            {t('viewSummary')}
          </Link>
        </div>

        <StatsTableSection
          rows={rows}
          columnsByScope={columnsByScope}
          totalsByScope={totalsByScope}
          scopes={scopes}
          scopeLabels={{
            aggregate: tTeam('scopeAggregate'),
            per_game: tTeam('scopePerGame')
          }}
          playerHrefBase={playerHrefBase}
          labels={{
            title: t('title'),
            statsScope: tTeam('statsScope'),
            glossary: tTeam('glossary'),
            total: tTeam('total'),
            shirtNumber: tTeam('shirtNumber'),
            playerName: tTeam('playerName'),
            teamColumn: t('teamColumn'),
            sortByStat: tTeam.raw('sortByStat') as string,
            noStats: t('noStats')
          }}
        />
      </div>
    </main>
  );
}
