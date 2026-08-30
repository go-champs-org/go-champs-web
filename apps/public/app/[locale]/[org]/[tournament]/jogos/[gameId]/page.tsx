import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getGame,
  getPlayerStatsLogsByGame,
  getSportBySlug,
  getTeamStatsLogsByGame,
  getTournamentBySlug,
  type GameAssetEntity,
  type GameEntity,
  type LiveSiteUpdate,
  type PlayerStatsLogEntity,
  type SportEntity,
  type TeamStatsLogEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import { FaFileAlt, FaTable } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { RemoteImage, Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import {
  boxScoreColumnViews,
  boxScoreRows,
  playerNamesById,
  shouldShowBoxScore,
  splitLogsByTeam,
  teamTotals,
  type BoxScoreColumnLabel
} from '@/src/games/boxScore';
import { formatGameDateTime } from '@/src/games/gameDateTime';
import {
  gameStructuredData,
  serializeStructuredData
} from '@/src/games/gameStructuredData';
import { gameTeamNames, type GameTeamNames } from '@/src/games/gameTeams';
import { gameVenue } from '@/src/games/gameVenue';
import { isLiveGame } from '@/src/games/liveScore';
import { buildPageMetadata, pageUrl } from '@/src/seo/metadata';
import { BoxScore } from './BoxScore';
import { Scoreboard } from './Scoreboard';

// The same red the CMS live indicator uses; it is a status signal, not part of
// the brand palette, so it stays out of the theme tokens.
const LIVE_RED = '#FF4136';

const SCOREBOARD_URL = process.env.NEXT_PUBLIC_SCOREBOARD_APP_URL || '';

// The rendered HTML only has to be fresh enough to open on: a game in progress
// corrects its own score from the scoreboard after hydration, and everything
// else on the page (teams, venue, kickoff) barely moves. Without this every
// single view would hit the API twice.
export const revalidate = 30;

// Nothing is worth prerendering at build time — the game list is unbounded and
// changes daily — but declaring the params is what puts this route on the ISR
// path instead of rendering it from scratch on every request.
export async function generateStaticParams() {
  return [];
}

interface GamePageParams {
  locale: string;
  org: string;
  tournament: string;
  gameId: string;
}

const gamePagePath = ({ org, tournament, gameId }: GamePageParams): string =>
  `/${org}/${tournament}/jogos/${gameId}`;

// generateMetadata and the page both need the game; cache() keeps that to a
// single request instead of fetching it twice per view.
const loadGame = cache(async (gameId: string): Promise<GameEntity | null> => {
  try {
    return await getGame(gameId);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
});

// The tournament only labels the link back to it, so an unreachable API must
// not take the game page down with it.
const loadTournament = cache(async (org: string, tournament: string) =>
  getTournamentBySlug(org, tournament).catch(() => null)
);

// The box score is a companion to the game, same as the tournament link: an
// unreachable endpoint leaves the page with no logs rather than taking it
// down. Neither call needs the tournament, so both start alongside it instead
// of waiting on it.
const loadPlayerStatsLogs = (
  gameId: string
): Promise<PlayerStatsLogEntity[]> =>
  getPlayerStatsLogsByGame(gameId).catch(() => []);

const loadTeamStatsLogs = (gameId: string): Promise<TeamStatsLogEntity[]> =>
  getTeamStatsLogsByGame(gameId).catch(() => []);

// The tournament only names its statistics; which of them belong to a box
// score is the sport's own catalogue. Without it every visible statistic the
// tournament configured becomes a column, in the order the API sent them
// (src/games/boxScore.ts `boxScoreColumns`).
const loadSport = (sportSlug: string): Promise<SportEntity | null> =>
  sportSlug
    ? getSportBySlug(sportSlug).catch(() => null)
    : Promise.resolve(null);

export async function generateMetadata({
  params
}: {
  params: Promise<GamePageParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, gameId } = routeParams;
  const [game, t, tGame] = await Promise.all([
    loadGame(gameId),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'game' })
  ]);

  const names = gameTeamNames(game, tGame('undecidedTeam'));

  return buildPageMetadata({
    locale,
    path: gamePagePath(routeParams),
    title: t('gameTitle', names),
    description: t('gameDescription', names),
    // A game the API no longer has renders as a 404; keeping that URL out of
    // the index stops the crawler from re-serving a dead fixture.
    noIndex: !game
  });
}

function GameStructuredData({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }}
    />
  );
}

interface TeamIdentityProps {
  name: string;
  logoUrl: string;
}

function TeamIdentity({ name, logoUrl }: TeamIdentityProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {logoUrl && (
        <RemoteImage
          src={logoUrl}
          alt=""
          width={64}
          height={64}
          className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
        />
      )}
      <span className="text-sm font-semibold text-foreground md:text-lg">
        {name}
      </span>
    </div>
  );
}

function LiveIndicator({ label }: { label: string }) {
  return (
    <div
      className="mt-4 flex items-center justify-center gap-2 text-xs font-bold uppercase"
      style={{ color: LIVE_RED }}
    >
      <span
        className="h-2.5 w-2.5 animate-pulse rounded-full"
        style={{ backgroundColor: LIVE_RED }}
        aria-hidden="true"
      />
      {label}
    </div>
  );
}

interface GameVideoProps {
  youTubeCode: string;
  title: string;
}

function GameVideo({ youTubeCode, title }: GameVideoProps) {
  return (
    <Surface className="aspect-video w-full overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${youTubeCode}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        allowFullScreen
        className="h-full w-full"
      />
    </Surface>
  );
}

interface GameCardProps {
  game: GameEntity;
  names: GameTeamNames;
  datetime: string;
  venue: string;
  liveLabel: string;
  scoreboardUrl: string;
}

function GameCard({
  game,
  names,
  datetime,
  venue,
  liveLabel,
  scoreboardUrl
}: GameCardProps) {
  const isLive = isLiveGame(game.liveState);

  return (
    <Surface as="article" className="p-4 md:p-8">
      <header className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span className="notranslate">{datetime}</span>
        <span>{venue}</span>
      </header>

      {isLive && <LiveIndicator label={liveLabel} />}

      <div className="mt-6 grid grid-cols-3 items-center gap-2 md:gap-6">
        <TeamIdentity name={names.homeTeam} logoUrl={game.homeTeam.logoUrl} />
        {/* Keyed by the game: navigating between two game pages reuses this
            client island, and a finished game never polls to correct itself. */}
        <Scoreboard
          key={game.id}
          gameId={game.id}
          scoreboardUrl={scoreboardUrl}
          isLive={isLive}
          homeScore={game.homeScore}
          awayScore={game.awayScore}
          homeTeamName={names.homeTeam}
          awayTeamName={names.awayTeam}
        />
        <TeamIdentity name={names.awayTeam} logoUrl={game.awayTeam.logoUrl} />
      </div>

      {game.info && (
        <p className="mt-6 text-center text-sm text-muted">{game.info}</p>
      )}
    </Surface>
  );
}

// Only these two asset types have a place on the public page — a folder of
// photos is a CMS-only convenience, not something worth a link here.
const GAME_ASSET_LABEL_KEYS: Record<string, string> = {
  'fiba-scoresheet': 'assetFibaScoresheet',
  'fiba-boxscore': 'assetFibaBoxscore'
};

const GAME_ASSET_ICONS: Record<string, IconType> = {
  'fiba-scoresheet': FaFileAlt,
  'fiba-boxscore': FaTable
};

interface GameAssetLinksProps {
  assets: GameAssetEntity[];
  labels: Record<string, string>;
}

// The API is the only source of `asset.url`; only http(s) is safe to render
// into an <a href> — a `javascript:`/`data:` URL would execute on click.
const isSafeAssetUrl = (url: string): boolean => {
  try {
    return ['http:', 'https:'].includes(new URL(url).protocol);
  } catch {
    return false;
  }
};

function GameAssetLinks({ assets, labels }: GameAssetLinksProps) {
  const linkableAssets = (assets || []).filter(
    asset => GAME_ASSET_LABEL_KEYS[asset.type] && isSafeAssetUrl(asset.url)
  );

  if (linkableAssets.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {linkableAssets.map(asset => {
        const Icon = GAME_ASSET_ICONS[asset.type];
        return (
          <a
            key={asset.id || asset.url}
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-primary-dark hover:bg-primary/10"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {labels[GAME_ASSET_LABEL_KEYS[asset.type]]}
          </a>
        );
      })}
    </div>
  );
}

// The box score of a single game: the columns the sport orders, and each
// side's rows and totals resolved against them. Kept as its own function so
// the page component reads as one flat sequence of steps rather than the
// derivation inlined into it.
const gameBoxScoreView = (
  game: GameEntity,
  tournamentEntity: TournamentWithTeamsEntity,
  playerStatsLogs: PlayerStatsLogEntity[],
  teamStatsLogs: TeamStatsLogEntity[],
  sport: SportEntity | null,
  statColumnAbbreviations: Record<string, string>,
  basketballColumnLabels: Record<string, BoxScoreColumnLabel>
) => {
  const logs = splitLogsByTeam(
    playerStatsLogs,
    game.homeTeam.id,
    game.awayTeam.id
  );
  const namesById = playerNamesById(tournamentEntity.players);
  const columns = boxScoreColumnViews(
    tournamentEntity.playerStats,
    sport,
    statColumnAbbreviations,
    basketballColumnLabels
  );

  return {
    columns,
    logs,
    home: {
      teamName: game.homeTeam.name,
      logoUrl: game.homeTeam.logoUrl,
      rows: boxScoreRows(logs.home, namesById),
      totals: teamTotals(teamStatsLogs, game.homeTeam.id)
    },
    away: {
      teamName: game.awayTeam.name,
      logoUrl: game.awayTeam.logoUrl,
      rows: boxScoreRows(logs.away, namesById),
      totals: teamTotals(teamStatsLogs, game.awayTeam.id)
    }
  };
};

const sportSlugOf = (
  tournament: TournamentWithTeamsEntity | null
): string => tournament?.sportSlug || '';

// The tournament pages still live in the CMS, so the back link names the
// tournament when it loaded and falls back to a generic label when it did not.
const tournamentLinkLabel = (
  tournament: TournamentWithTeamsEntity | null,
  fallback: string
): string => (tournament ? tournament.name : fallback);

// The box score only shows once it has a column to show and the CMS gate lets
// it through (src/games/boxScore.ts `shouldShowBoxScore`).
const boxScoreVisible = (
  view: { columns: unknown[]; logs: { home: unknown[]; away: unknown[] } },
  liveState: string,
  liveSiteUpdate: LiveSiteUpdate
): boolean =>
  view.columns.length > 0 &&
  shouldShowBoxScore(liveState, liveSiteUpdate, view.logs.home, view.logs.away);

// Only a live game the tournament opted into full live updates for keeps
// polling the scoreboard; everything else renders once from the static logs.
const pollLiveFor = (isLive: boolean, liveSiteUpdate: LiveSiteUpdate): boolean =>
  isLive && liveSiteUpdate === 'full-live-update';

// The whole box score decision in one place, so the page component never has
// to branch on it: a null result is a page with no box score section at all.
const resolveBoxScore = (
  game: GameEntity,
  tournament: TournamentWithTeamsEntity | null,
  playerStatsLogs: PlayerStatsLogEntity[],
  teamStatsLogs: TeamStatsLogEntity[],
  sport: SportEntity | null,
  abbreviations: Record<string, string>,
  basketballColumnLabels: Record<string, BoxScoreColumnLabel>,
  isLive: boolean
) => {
  if (!tournament) return null;

  const view = gameBoxScoreView(
    game,
    tournament,
    playerStatsLogs,
    teamStatsLogs,
    sport,
    abbreviations,
    basketballColumnLabels
  );
  const { liveSiteUpdate } = tournament.scoreboardSetting;

  if (!boxScoreVisible(view, game.liveState, liveSiteUpdate)) return null;

  return {
    columns: view.columns,
    home: view.home,
    away: view.away,
    pollLive: pollLiveFor(isLive, liveSiteUpdate),
    sportSlug: tournament.sportSlug
  };
};

export default async function GamePage({
  params
}: {
  params: Promise<GamePageParams>;
}) {
  const routeParams = await params;
  const { locale, org, tournament, gameId } = routeParams;
  setRequestLocale(locale);

  // The box score needs only the game id, not the tournament, so both of its
  // logs start alongside it instead of waiting on it — a second round trip is
  // only spent on the sport, once the tournament says which one it is.
  const [
    game,
    tournamentEntity,
    playerStatsLogs,
    teamStatsLogs,
    t,
    tBoxScore,
    tTeam
  ] = await Promise.all([
    loadGame(gameId),
    loadTournament(org, tournament),
    loadPlayerStatsLogs(gameId),
    loadTeamStatsLogs(gameId),
    getTranslations('game'),
    getTranslations('boxScore'),
    getTranslations('team')
  ]);

  if (!game) notFound();

  const sport = await loadSport(sportSlugOf(tournamentEntity));

  const names = gameTeamNames(game, t('undecidedTeam'));
  const venue = gameVenue(game.location, game.city);
  const isLive = isLiveGame(game.liveState);
  const playerHrefBase = `/${locale}/${org}/${tournament}/jogadores/`;
  const backLabel = tournamentLinkLabel(tournamentEntity, t('backToTournament'));

  // The whole box score decision resolves here, so the page below only asks
  // whether there is one to render, not how to decide it.
  const boxScore = resolveBoxScore(
    game,
    tournamentEntity,
    playerStatsLogs,
    teamStatsLogs,
    sport,
    tTeam.raw('statColumns') as Record<string, string>,
    tBoxScore.raw('basketballColumns') as Record<string, BoxScoreColumnLabel>,
    isLive
  );

  return (
    <main
      data-testid="game-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <GameStructuredData
        schema={gameStructuredData({
          game,
          names,
          url: pageUrl(locale, gamePagePath(routeParams)),
          venue
        })}
      />

      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href={`/${locale}/${org}/${tournament}`}
            className="text-sm font-semibold text-primary-dark hover:underline"
          >
            {backLabel}
          </Link>

          <GameAssetLinks
            assets={game.assets}
            labels={{
              assetFibaScoresheet: t('assetFibaScoresheet'),
              assetFibaBoxscore: t('assetFibaBoxscore')
            }}
          />
        </div>

        <GameCard
          game={game}
          names={names}
          datetime={formatGameDateTime(game.datetime, locale)}
          venue={venue}
          liveLabel={t('live')}
          scoreboardUrl={SCOREBOARD_URL}
        />

        {game.youTubeCode && (
          <GameVideo youTubeCode={game.youTubeCode} title={t('videoTitle')} />
        )}

        {boxScore && (
          <BoxScore
            key={game.id}
            gameId={game.id}
            scoreboardUrl={SCOREBOARD_URL}
            isLive={isLive}
            pollLive={boxScore.pollLive}
            sportSlug={boxScore.sportSlug}
            columns={boxScore.columns}
            home={boxScore.home}
            away={boxScore.away}
            playerHrefBase={playerHrefBase}
            labels={{
              player: tBoxScore('player'),
              totals: tBoxScore('totals'),
              title: tBoxScore('title'),
              glossary: tBoxScore('glossary'),
              sortByStat: tBoxScore.raw('sortByStat') as string
            }}
          />
        )}
      </div>
    </main>
  );
}
