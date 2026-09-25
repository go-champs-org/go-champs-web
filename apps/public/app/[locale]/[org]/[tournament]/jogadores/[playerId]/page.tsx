import type { Metadata } from 'next';
import Link from 'next/link';
import { CMS_URL } from '@/src/config/cms';
import { TournamentQrCode } from '@/src/components/TournamentQrCode';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getPlayer,
  getPlayerStatsLogsByPlayer,
  getSportBySlug,
  getTournamentBySlug,
  type PhaseEntity,
  type PlayerEntity,
  type PlayerStatEntity,
  type PlayerStatsLogEntity,
  type SportEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import { FaUser } from 'react-icons/fa';
import { ProfileBanner, RemoteImage, Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { buildPageMetadata } from '@/src/seo/metadata';
import { statColumnViews, type StatColumnView } from '@/src/stats/rosterStats';
import {
  playerPhaseTable,
  playerProfileColumns,
  type PlayerPhaseTable
} from '@/src/stats/playerPhaseStats';
import { PlayerStatsTable } from './PlayerStatsTable';

// A player's profile moves as rarely as a team's roster, so the rendered HTML
// can be reused for minutes at a time.
// Fifteen minutes: rosters and stats move slower than the games they come from.
export const revalidate = 900;

export async function generateStaticParams() {
  return [];
}

interface PlayerPageParams {
  locale: string;
  org: string;
  tournament: string;
  playerId: string;
}

const playerPagePath = ({
  org,
  tournament,
  playerId
}: PlayerPageParams): string => `/${org}/${tournament}/jogadores/${playerId}`;

// The stats card carries no padding of its own — its header band and totals
// band run edge to edge; the banner and its shadow are the elevated block.
const SECTION_CLASS = 'shadow-[0_2px_10px_var(--shadow-elevated)]';

// ProfileBanner supplies the gradient; this is only shape/padding/text-color.
const BANNER_CLASS = 'rounded-2xl p-5 text-neutral-100 md:px-8 md:py-6';

// generateMetadata and the page both need the player and tournament; cache()
// keeps each to a single request per view.
const loadPlayer = cache(
  async (playerId: string): Promise<PlayerEntity | null> => {
    try {
      return await getPlayer(playerId);
    } catch (error) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }
);

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

// The per-game logs are what the phase table is built from — an unreachable
// endpoint leaves the banner standing with an empty table.
const loadLogs = (playerId: string): Promise<PlayerStatsLogEntity[]> =>
  getPlayerStatsLogsByPlayer(playerId).catch(() => []);

const teamNameOf = (
  tournament: TournamentWithTeamsEntity | null,
  teamId: string
): string => tournament?.teams.find(team => team.id === teamId)?.name || '';

// A player without a team (never assigned one, or one the tournament removed)
// has no team page to link to.
const teamHrefOf = (
  locale: string,
  org: string,
  tournamentSlug: string,
  teamId: string
): string => (teamId ? `/${locale}/${org}/${tournamentSlug}/times/${teamId}` : '');

const sportSlugOf = (
  tournament: TournamentWithTeamsEntity | null
): string => tournament?.sportSlug || '';

// The fields the table reads off the tournament, each defaulted so a missing
// tournament leaves the banner standing with an empty stats section.
const tournamentFields = (
  tournament: TournamentWithTeamsEntity | null
): { tournamentName: string; playerStats: PlayerStatEntity[]; phases: PhaseEntity[] } => ({
  tournamentName: tournament ? tournament.name : '',
  playerStats: tournament ? tournament.playerStats : [],
  phases: tournament ? tournament.phases : []
});

interface PlayerView {
  player: PlayerEntity;
  tournamentName: string;
  teamName: string;
  sport: SportEntity | null;
  logs: PlayerStatsLogEntity[];
  playerStats: PlayerStatEntity[];
  phases: PhaseEntity[];
}

const loadPlayerView = async (
  org: string,
  tournamentSlug: string,
  playerId: string
): Promise<PlayerView> => {
  // The logs need only the player id from the route, so they start alongside
  // the player and tournament rather than waiting on either.
  const [player, tournament, logs] = await Promise.all([
    loadPlayer(playerId),
    loadTournament(org, tournamentSlug),
    loadLogs(playerId)
  ]);

  if (!player) notFound();

  const sport = await loadSport(sportSlugOf(tournament));

  return {
    player,
    teamName: teamNameOf(tournament, player.teamId),
    sport,
    logs,
    ...tournamentFields(tournament)
  };
};

export async function generateMetadata({
  params
}: {
  params: Promise<PlayerPageParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug, playerId } = routeParams;
  const [player, tournament, t, tPlayer] = await Promise.all([
    loadPlayer(playerId),
    loadTournament(org, tournamentSlug),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'player' })
  ]);

  const values = {
    player: player ? player.name : tPlayer('unknownPlayer'),
    tournament: tournament ? tournament.name : tPlayer('unknownTournament')
  };

  return buildPageMetadata({
    locale,
    path: playerPagePath(routeParams),
    title: t('playerTitle', values),
    description: t('playerDescription', values),
    noIndex: !player
  });
}

interface BreadcrumbProps {
  homeHref: string;
  homeLabel: string;
  tournamentHref: string;
  tournamentLabel: string;
  currentLabel: string;
}

function Breadcrumb({
  homeHref,
  homeLabel,
  tournamentHref,
  tournamentLabel,
  currentLabel
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href={homeHref} className="hover:text-primary-dark">
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href={tournamentHref} className="hover:text-primary-dark">
            {tournamentLabel}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-semibold text-primary-dark" aria-current="page">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}

function PlayerAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full border-4 border-[#a6cd63] bg-neutral-100 text-3xl font-extrabold text-[#4d6b2c] md:h-[104px] md:w-[104px]">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function PlayerPhoto({ photoUrl, name }: { photoUrl: string; name: string }) {
  return photoUrl ? (
    <RemoteImage
      src={photoUrl}
      alt=""
      width={104}
      height={104}
      loading="eager"
      className="h-[84px] w-[84px] shrink-0 rounded-full border-4 border-[#a6cd63] bg-neutral-100 object-cover md:h-[104px] md:w-[104px]"
    />
  ) : (
    <PlayerAvatar name={name} />
  );
}

interface PlayerBannerProps {
  name: string;
  photoUrl: string;
  overline: string;
  teamName: string;
  teamHref: string;
  gamesText: string;
  profileHref: string;
  profileLabel: string;
}

// The team name is a plain label when the player has none to link to — a
// removed roster spot never resolves to a team id worth a page.
function PlayerBannerTeamName({ teamName, teamHref }: { teamName: string; teamHref: string }) {
  if (!teamHref) return teamName;

  return (
    <Link href={teamHref} className="hover:underline">
      {teamName}
    </Link>
  );
}

// A separator only belongs between the two parts when both are there to join.
const subtitleSeparator = (teamName: string, gamesText: string): string =>
  teamName && gamesText ? ' · ' : '';

// A player with neither a team nor a single game played has nothing this
// line would say — the caller only renders it once one of the two is there.
const hasSubtitle = (teamName: string, gamesText: string): boolean =>
  Boolean(teamName || gamesText);

interface PlayerBannerSubtitleProps {
  teamName: string;
  teamHref: string;
  gamesText: string;
}

function PlayerBannerSubtitle({
  teamName,
  teamHref,
  gamesText
}: PlayerBannerSubtitleProps) {
  return (
    <p className="text-sm font-semibold opacity-90">
      {teamName && <PlayerBannerTeamName teamName={teamName} teamHref={teamHref} />}
      {subtitleSeparator(teamName, gamesText)}
      {gamesText}
    </p>
  );
}

function PlayerBanner({
  name,
  photoUrl,
  overline,
  teamName,
  teamHref,
  gamesText,
  profileHref,
  profileLabel
}: PlayerBannerProps) {
  return (
    <ProfileBanner className={BANNER_CLASS} testId="player-banner">
      <div className="relative z-[1] flex flex-col items-center gap-4 text-center md:flex-row md:gap-6 md:text-left">
        <PlayerPhoto photoUrl={photoUrl} name={name} />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {overline && (
            <p className="text-xs font-bold uppercase tracking-[0.08em] opacity-85">
              {overline}
            </p>
          )}
          <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
            {name}
          </h1>
          {hasSubtitle(teamName, gamesText) && (
            <PlayerBannerSubtitle
              teamName={teamName}
              teamHref={teamHref}
              gamesText={gamesText}
            />
          )}

          <a
            href={profileHref}
            className="mt-1 inline-flex w-fit items-center gap-2 self-center rounded-full bg-neutral-100/15 px-4 py-2 text-xs font-semibold transition-colors hover:bg-neutral-100/30 md:self-start"
          >
            <FaUser aria-hidden="true" className="h-3.5 w-3.5" />
            {profileLabel}
          </a>
        </div>
      </div>
    </ProfileBanner>
  );
}

interface StatsSectionProps {
  hasStats: boolean;
  table: PlayerPhaseTable;
  columns: StatColumnView[];
  labels: {
    title: string;
    phase: string;
    games: string;
    total: string;
    scopeAggregate: string;
    scopePerGame: string;
    scopeLegend: string;
    glossary: string;
    noStats: string;
  };
}

function StatsSection({ hasStats, table, columns, labels }: StatsSectionProps) {
  return hasStats ? (
    <Surface
      as="section"
      className={`${SECTION_CLASS} overflow-hidden`}
      data-testid="player-stats"
    >
      <PlayerStatsTable
        rows={table.rows}
        total={table.total}
        columns={columns}
        title={labels.title}
        phaseLabel={labels.phase}
        gamesLabel={labels.games}
        totalLabel={labels.total}
        scopeLabels={{
          aggregate: labels.scopeAggregate,
          per_game: labels.scopePerGame
        }}
        scopeLegend={labels.scopeLegend}
        glossaryLabel={labels.glossary}
      />
    </Surface>
  ) : (
    <Surface as="section" className={`${SECTION_CLASS} p-6`} data-testid="player-stats">
      <p className="text-sm text-muted">{labels.noStats}</p>
    </Surface>
  );
}

export default async function PlayerPage({
  params
}: {
  params: Promise<PlayerPageParams>;
}) {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug, playerId } = routeParams;
  setRequestLocale(locale);

  const [view, t, tTeam, tPhase] = await Promise.all([
    loadPlayerView(org, tournamentSlug, playerId),
    getTranslations('player'),
    getTranslations('team'),
    getTranslations('phase')
  ]);

  const tournamentLabel =
    view.tournamentName || t('breadcrumbTournament');

  const columns = statColumnViews(
    playerProfileColumns(view.playerStats, view.sport),
    tTeam.raw('statColumns') as Record<string, string>
  );
  const table = playerPhaseTable(view.logs, view.phases);
  const gamesText =
    table.total.games > 0
      ? t('gamesPlayedCount', { count: table.total.games })
      : '';
  const hasStats = table.rows.length > 0 && columns.length > 0;
  const teamHref = teamHrefOf(locale, org, tournamentSlug, view.player.teamId);

  const tournamentHref = `/${locale}/${org}/${tournamentSlug}`;

  return (
    <main
      data-testid="player-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Breadcrumb
            homeHref={`/${locale}`}
            homeLabel={t('breadcrumbHome')}
            tournamentHref={tournamentHref}
            tournamentLabel={tournamentLabel}
            currentLabel={t('profile')}
          />
          <TournamentQrCode
            path={`/${org}/${tournamentSlug}`}
            openLabel={tPhase('shareQrCode')}
            closeLabel={tPhase('closeQrCode')}
            caption={tournamentLabel}
            scanLabel={tPhase('scanQrCode')}
          />
        </div>

        <PlayerBanner
          name={view.player.name}
          photoUrl={view.player.photoUrl}
          overline={view.tournamentName}
          teamName={view.teamName}
          teamHref={teamHref}
          gamesText={gamesText}
          profileHref={`${CMS_URL}/${org}/${tournamentSlug}/Player/${playerId}`}
          profileLabel={t('fullProfile')}
        />

        <StatsSection
          hasStats={hasStats}
          table={table}
          columns={columns}
          labels={{
            title: t('detailedStats'),
            phase: t('phaseColumn'),
            games: t('gamesColumn'),
            total: t('total'),
            scopeAggregate: t('scopeAggregate'),
            scopePerGame: t('scopePerGame'),
            scopeLegend: t('statsScope'),
            glossary: t('glossary'),
            noStats: t('noStats')
          }}
        />
      </div>
    </main>
  );
}
