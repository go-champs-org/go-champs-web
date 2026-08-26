import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getAggregatedPlayerStatsByFilter,
  getPlayer,
  getSportBySlug,
  getTournamentBySlug,
  type AggregatedPlayerStatsLogEntity,
  type PlayerEntity,
  type SportEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import { Surface } from '@gochamps/ui';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { CMS_URL } from '@/src/config/cms';
import { buildPageMetadata } from '@/src/seo/metadata';
import {
  availableScopes,
  columnViewsByScope,
  statColumnsByScope,
  type StatColumnView,
  type StatScope
} from '@/src/stats/rosterStats';
import { firstPlayerStats, hasAnyColumns } from '@/src/stats/playerAggregatedStats';
import { AggregatedStats } from './AggregatedStats';

// A player's profile moves as rarely as a team's roster, so the rendered HTML
// can be reused for minutes at a time instead of hitting the API on every
// view.
export const revalidate = 300;

// The player list is unbounded, so nothing is prerendered at build time —
// declaring the params is what puts this route on the ISR path.
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

// The athlete and official profile pages of the CMS lift every block off the
// page with a soft shadow; Surface already owns the radius, border and
// background, so this is only the elevation it does not carry.
const SECTION_CLASS = 'p-6 shadow-[0_2px_10px_var(--shadow-elevated)]';

// generateMetadata and the page both need the player; cache() keeps that to a
// single request instead of fetching it twice per view.
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

// The tournament only names the team on the banner and the statistic
// catalogue the aggregated log is read against; a missing tournament still
// leaves a player worth showing, so it is not what decides the 404 here.
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

// The tournament only names its statistics; which of them are totals and
// which are per game averages is the sport's own catalogue. Without it the
// tiles still render, as the single list of statistics the tournament named.
const loadSport = (sportSlug: string): Promise<SportEntity | null> =>
  sportSlug ? getSportBySlug(sportSlug).catch(() => null) : Promise.resolve(null);

// The aggregated log is a companion to the banner, not the page itself: an
// unreachable endpoint leaves the profile standing without its numbers
// instead of taking the page down.
const loadPlayerStats = (
  tournamentId: string,
  playerId: string
): Promise<AggregatedPlayerStatsLogEntity[]> =>
  getAggregatedPlayerStatsByFilter({ tournamentId, playerId }).catch(() => []);

// The sport and the aggregated log both need the tournament first — one for
// its statistic catalogue, the other for its id — so this waits for the
// tournament instead of racing it. Without one there is neither to load.
const loadSportAndPlayerStats = (
  tournament: TournamentWithTeamsEntity | null,
  player: PlayerEntity
): Promise<[SportEntity | null, AggregatedPlayerStatsLogEntity[]]> =>
  tournament
    ? Promise.all([
        loadSport(tournament.sportSlug),
        loadPlayerStats(tournament.id, player.id)
      ])
    : Promise.resolve([null, []]);

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
    // A player the API no longer has renders as a 404; keeping that URL out
    // of the index stops the crawler from re-serving a dead profile.
    noIndex: !player
  });
}

interface PlayerStatsView {
  stats: Record<string, string>;
  columnsByScope: Record<string, StatColumnView[]>;
  scopes: StatScope[];
}

// The catalogue that decides the columns lives on the tournament, so a
// missing tournament leaves nothing to read the log against. A log with no
// visible column in either scope is read the same way: there is nothing for
// the island to switch between.
const resolvePlayerStatsView = (
  tournament: TournamentWithTeamsEntity | null,
  sport: SportEntity | null,
  statsLogs: AggregatedPlayerStatsLogEntity[],
  abbreviations: Record<string, string>
): PlayerStatsView | null => {
  const stats = firstPlayerStats(statsLogs);
  if (!tournament || !stats) return null;

  const scopes = availableScopes(tournament.playerStats, sport);
  const columnsByScope = columnViewsByScope(
    statColumnsByScope(tournament.playerStats, sport, scopes),
    abbreviations
  );

  return hasAnyColumns(columnsByScope) ? { stats, columnsByScope, scopes } : null;
};

// The team only names the banner: a player whose team the tournament no longer
// lists still shows, with the team left off the shirt line rather than blank.
const teamNameOf = (
  tournament: TournamentWithTeamsEntity | null,
  teamId: string
): string => tournament?.teams.find(team => team.id === teamId)?.name || '';

// The shirt line of the CMS banner: team, number and shirt name joined, each
// dropped when the athlete has none (apps/cms/src/Players/Banner.tsx).
const buildShirtContent = (teamName: string, player: PlayerEntity): string =>
  [teamName, player.shirtNumber && `#${player.shirtNumber}`, player.shirtName]
    .filter(Boolean)
    .join(' | ');

// The tournament pages still live in the CMS, so the back link names the
// tournament when it loaded and falls back to a generic label when it did not.
const tournamentLinkLabel = (
  tournament: TournamentWithTeamsEntity | null,
  fallback: string
): string => (tournament ? tournament.name : fallback);

// The green bar the profile pages put before every section title
// (apps/cms/src/Pages/AthleteProfilePage.scss). It is decoration: the heading
// text alone is what a screen reader announces.
function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
      <span
        aria-hidden="true"
        className="inline-block h-[1.1rem] w-1 rounded-full bg-primary"
      />
      {children}
    </h2>
  );
}

function PlayerAvatarInitial({ name }: { name: string }) {
  return (
    <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full bg-neutral-100 text-3xl font-extrabold text-muted md:h-[120px] md:w-[120px]">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

interface PlayerPhotoProps {
  photoUrl: string;
  name: string;
}

function PlayerPhoto({ photoUrl, name }: PlayerPhotoProps) {
  // Player photos live on arbitrary user-uploaded hosts: next/image would
  // need each one allow-listed in next.config.js.
  return photoUrl ? (
    <img
      src={photoUrl}
      alt=""
      width={120}
      height={120}
      decoding="async"
      className="h-[84px] w-[84px] shrink-0 rounded-full border-4 border-border bg-neutral-100 object-cover md:h-[120px] md:w-[120px]"
    />
  ) : (
    <PlayerAvatarInitial name={name} />
  );
}

interface SocialLink {
  key: 'instagram' | 'twitter' | 'facebook';
  href: (handle: string) => string;
  Icon: IconType;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    key: 'instagram',
    href: handle => `https://instagram.com/${handle}`,
    Icon: FaInstagram
  },
  {
    key: 'twitter',
    href: handle => `https://twitter.com/${handle}`,
    Icon: FaTwitter
  },
  {
    key: 'facebook',
    href: handle => `https://facebook.com/${handle}`,
    Icon: FaFacebook
  }
];

// Only a handle the athlete actually filled in earns a link — the CMS banner
// leaves the icon out entirely rather than pointing at an empty profile.
function SocialLinks({ player }: { player: PlayerEntity }) {
  return (
    <div className="flex items-center gap-3" data-testid="player-social-links">
      {SOCIAL_LINKS.filter(({ key }) => player[key]).map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href(player[key] as string)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-primary-dark"
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

interface PlayerBannerProps {
  player: PlayerEntity;
  shirtContent: string;
}

// What sits inside the banner card: the athlete's photo, name and shirt line,
// ported off the Bulma banner of the CMS profile (apps/cms/src/Players/Banner.tsx).
function PlayerBanner({ player, shirtContent }: PlayerBannerProps) {
  const hasSocialLinks = Boolean(
    player.instagram || player.twitter || player.facebook
  );

  return (
    <div
      data-testid="player-banner"
      className="flex flex-col items-center gap-4 text-center md:flex-row md:gap-6 md:text-left"
    >
      <PlayerPhoto photoUrl={player.photoUrl} name={player.name} />

      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
          {player.name}
        </h1>

        {shirtContent && (
          <p
            data-testid="player-shirt-line"
            className="text-sm font-semibold uppercase tracking-wide text-muted"
          >
            {shirtContent}
          </p>
        )}

        {hasSocialLinks && (
          <div className="mt-3 flex justify-center md:justify-start">
            <SocialLinks player={player} />
          </div>
        )}
      </div>
    </div>
  );
}

interface PlayerStatsSectionProps {
  statsView: PlayerStatsView | null;
  scopeLabels: Record<string, string>;
  scopeLegend: string;
  glossaryLabel: string;
  noStatsLabel: string;
}

// The island only exists once the page resolved a scope with columns in it;
// otherwise the section reads as a plain "no stats" line rather than an empty
// scope filter over an empty grid.
function PlayerStatsSection({
  statsView,
  scopeLabels,
  scopeLegend,
  glossaryLabel,
  noStatsLabel
}: PlayerStatsSectionProps) {
  return statsView ? (
    <div className="mt-4">
      <AggregatedStats
        stats={statsView.stats}
        columnsByScope={statsView.columnsByScope}
        scopes={statsView.scopes}
        scopeLabels={scopeLabels}
        scopeLegend={scopeLegend}
        glossaryLabel={glossaryLabel}
      />
    </div>
  ) : (
    <p className="mt-4 text-sm text-muted">{noStatsLabel}</p>
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

  const [player, tournament, t, tTeam, tGame] = await Promise.all([
    loadPlayer(playerId),
    loadTournament(org, tournamentSlug),
    getTranslations('player'),
    getTranslations('team'),
    getTranslations('game')
  ]);

  if (!player) notFound();

  const [sport, statsLogs] = await loadSportAndPlayerStats(tournament, player);

  const shirtContent = buildShirtContent(
    teamNameOf(tournament, player.teamId),
    player
  );
  // Which scope the tiles offer, and the columns of each, are decided here:
  // the client island only switches between what the page resolved.
  const statsView = resolvePlayerStatsView(
    tournament,
    sport,
    statsLogs,
    tTeam.raw('statColumns') as Record<string, string>
  );

  return (
    <main
      data-testid="player-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6">
        {/* Tournament pages still live in the CMS until the _redirects
            rollout moves them here, so this link must stay absolute. */}
        <a
          href={`${CMS_URL}/${org}/${tournamentSlug}`}
          className="text-sm font-semibold text-primary-dark hover:underline"
        >
          {tournamentLinkLabel(tournament, tGame('backToTournament'))}
        </a>

        <Surface as="section" className={SECTION_CLASS}>
          <PlayerBanner player={player} shirtContent={shirtContent} />
        </Surface>

        <Surface
          as="section"
          className={SECTION_CLASS}
          data-testid="player-stats"
        >
          <SectionTitle>{t('statsTitle')}</SectionTitle>

          <PlayerStatsSection
            statsView={statsView}
            scopeLabels={{
              aggregate: t('scopeAggregate'),
              per_game: t('scopePerGame')
            }}
            scopeLegend={t('statsTitle')}
            glossaryLabel={t('glossary')}
            noStatsLabel={t('noStats')}
          />
        </Surface>
      </div>
    </main>
  );
}
