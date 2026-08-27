import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getFixedPlayerStatsTablesByFilter,
  getTournamentBySlug,
  type FixedPlayerStatsTableEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import { Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { CMS_URL } from '@/src/config/cms';
import { buildPageMetadata } from '@/src/seo/metadata';
import { fixedStatsTableRows, type FixedStatsTableRow } from '@/src/stats/tournamentStats';

// The leaderboard cards are admin-curated and move as rarely as the roster,
// so the rendered HTML can be reused for minutes at a time instead of hitting
// the API on every view.
export const revalidate = 300;

// The tournament list is unbounded, so nothing is prerendered at build time —
// declaring the params is what puts this route on the ISR path.
export async function generateStaticParams() {
  return [];
}

interface PlayerStatsSummaryPageParams {
  locale: string;
  org: string;
  tournament: string;
}

const playerStatsSummaryPagePath = ({
  org,
  tournament
}: PlayerStatsSummaryPageParams): string =>
  `/${org}/${tournament}/estatisticas/resumo`;

const SECTION_CLASS = 'shadow-[0_2px_10px_var(--shadow-elevated)]';

// generateMetadata and the page both need the tournament; cache() keeps that
// to a single request instead of fetching it twice per view. Both the team
// and player pages already duplicate this exact wrapper rather than share a
// loader module, so this route follows the same precedent.
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

const loadFixedStatsTables = (
  tournamentId: string
): Promise<FixedPlayerStatsTableEntity[]> =>
  getFixedPlayerStatsTablesByFilter({ tournamentId }).catch(() => []);

interface PlayerStatsSummaryView {
  tournament: TournamentWithTeamsEntity;
  tables: FixedPlayerStatsTableEntity[];
}

const loadPlayerStatsSummaryView = async (
  org: string,
  tournamentSlug: string
): Promise<PlayerStatsSummaryView> => {
  const tournament = await loadTournament(org, tournamentSlug);
  if (!tournament) notFound();

  const tables = await loadFixedStatsTables(tournament.id);

  return { tournament, tables };
};

export async function generateMetadata({
  params
}: {
  params: Promise<PlayerStatsSummaryPageParams>;
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
    path: playerStatsSummaryPagePath(routeParams),
    title: t('playerStatsSummaryTitle', values),
    description: t('playerStatsSummaryDescription', values),
    noIndex: !tournament
  });
}

interface LeaderboardCardProps {
  table: FixedStatsTableRow;
  playerHref: (playerId: string) => string;
  rankLabel: string;
  valueLabel: string;
}

// One admin-curated leaderboard: a stat title and its ranked entries, already
// in the order the API returned — nothing here re-sorts them.
function LeaderboardCard({
  table,
  playerHref,
  rankLabel,
  valueLabel
}: LeaderboardCardProps) {
  return (
    <Surface
      as="section"
      className={`${SECTION_CLASS} flex flex-col gap-3 p-4 md:p-6`}
      data-testid="leaderboard-card"
    >
      <h2 className="text-lg font-bold text-foreground">{table.title}</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs font-bold uppercase tracking-[0.5px] text-muted">
            <th scope="col" className="w-8 pb-2">
              {rankLabel}
            </th>
            <th scope="col" className="pb-2" />
            <th scope="col" className="pb-2 text-right">
              {valueLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {table.entries.map((entry, index) => (
            <tr key={entry.playerId} className="border-t border-border/60">
              <td className="py-2 text-xs tabular-nums text-muted">{index + 1}</td>
              <td className="py-2">
                <Link
                  href={playerHref(entry.playerId)}
                  className="font-semibold text-foreground hover:underline"
                >
                  {entry.playerName}
                </Link>
                {entry.teamName && (
                  <span className="ml-1 text-xs text-muted">{entry.teamName}</span>
                )}
              </td>
              <td className="notranslate py-2 text-right text-xs tabular-nums">
                {entry.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Surface>
  );
}

interface LeaderboardsSectionProps {
  tables: FixedStatsTableRow[];
  playerHref: (playerId: string) => string;
  rankLabel: string;
  valueLabel: string;
  noStatsLabel: string;
}

// A tournament with no fixed stats tables configured yet has nothing to grid;
// the empty state is decided here rather than by the grid returning nothing
// for itself.
function LeaderboardsSection({
  tables,
  playerHref,
  rankLabel,
  valueLabel,
  noStatsLabel
}: LeaderboardsSectionProps) {
  return tables.length > 0 ? (
    <div
      data-testid="leaderboards"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {tables.map(table => (
        <LeaderboardCard
          key={table.id}
          table={table}
          playerHref={playerHref}
          rankLabel={rankLabel}
          valueLabel={valueLabel}
        />
      ))}
    </div>
  ) : (
    <Surface as="section" className={`${SECTION_CLASS} p-6`} data-testid="leaderboards">
      <p className="text-sm text-muted">{noStatsLabel}</p>
    </Surface>
  );
}

export default async function PlayerStatsSummaryPage({
  params
}: {
  params: Promise<PlayerStatsSummaryPageParams>;
}) {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug } = routeParams;
  setRequestLocale(locale);

  const [view, t] = await Promise.all([
    loadPlayerStatsSummaryView(org, tournamentSlug),
    getTranslations('playerStats')
  ]);

  const { tournament, tables } = view;
  const leaderboards = fixedStatsTableRows(
    tables,
    tournament.playerStats,
    tournament.players,
    tournament.teams
  );

  const tournamentHref = `${CMS_URL}/${org}/${tournamentSlug}`;
  const playerHref = (playerId: string) =>
    `/${locale}/${org}/${tournamentSlug}/jogadores/${playerId}`;

  return (
    <main
      data-testid="player-stats-summary-page"
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
            {t('summaryTitle')}
          </h1>
          <Link
            href={`/${locale}/${org}/${tournamentSlug}/estatisticas`}
            className="text-sm font-semibold text-primary-dark hover:underline"
          >
            {t('viewAll')}
          </Link>
        </div>

        <LeaderboardsSection
          tables={leaderboards}
          playerHref={playerHref}
          rankLabel={t('rankColumn')}
          valueLabel={t('valueColumn')}
          noStatsLabel={t('noStats')}
        />
      </div>
    </main>
  );
}
