import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getGame,
  getTournamentBySlug,
  type GameEntity
} from '@gochamps/api-client';
import { isNotFoundError } from '../../../../../../src/api/isNotFoundError';
import { CMS_URL } from '../../../../../../src/config/cms';
import { formatGameDateTime } from '../../../../../../src/games/gameDateTime';
import {
  gameTeamNames,
  type GameTeamNames
} from '../../../../../../src/games/gameTeams';
import { gameVenue } from '../../../../../../src/games/gameVenue';
import { isLiveGame } from '../../../../../../src/games/liveScore';
import { buildPageMetadata } from '../../../../../../src/seo/metadata';
import { Scoreboard } from './Scoreboard';

// The same red the CMS live indicator uses; it is a status signal, not part of
// the brand palette, so it stays out of the theme tokens.
const LIVE_RED = '#FF4136';

// Live scores come from the scoreboard app, which is the only service that
// knows the running total of a game still being played.
const SCOREBOARD_URL = process.env.NEXT_PUBLIC_SCOREBOARD_APP_URL || '';

interface GamePageParams {
  locale: string;
  org: string;
  tournament: string;
  gameId: string;
}

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

export async function generateMetadata({
  params
}: {
  params: Promise<GamePageParams>;
}): Promise<Metadata> {
  const { locale, org, tournament, gameId } = await params;
  const [game, t, tGame] = await Promise.all([
    loadGame(gameId),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'game' })
  ]);

  const names = gameTeamNames(game, tGame('undecidedTeam'));

  return buildPageMetadata({
    locale,
    path: `/${org}/${tournament}/jogos/${gameId}`,
    title: t('gameTitle', names),
    description: t('gameDescription', names)
  });
}

interface TeamIdentityProps {
  name: string;
  logoUrl: string;
}

function TeamIdentity({ name, logoUrl }: TeamIdentityProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {logoUrl && (
        // Team logos live on arbitrary user-uploaded hosts: next/image would
        // need each one allow-listed in next.config.js.
        <img
          src={logoUrl}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
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
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
      <iframe
        src={`https://www.youtube.com/embed/${youTubeCode}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
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
    <article className="rounded-xl border border-border bg-surface p-4 md:p-8">
      <header className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span className="notranslate">{datetime}</span>
        <span>{venue}</span>
      </header>

      {isLive && <LiveIndicator label={liveLabel} />}

      <div className="mt-6 grid grid-cols-3 items-center gap-2 md:gap-6">
        <TeamIdentity name={names.homeTeam} logoUrl={game.homeTeam.logoUrl} />
        <Scoreboard
          gameId={game.id}
          scoreboardUrl={scoreboardUrl}
          isLive={isLive}
          homeScore={game.homeScore}
          awayScore={game.awayScore}
        />
        <TeamIdentity name={names.awayTeam} logoUrl={game.awayTeam.logoUrl} />
      </div>

      {game.info && (
        <p className="mt-6 text-center text-sm text-muted">{game.info}</p>
      )}
    </article>
  );
}

export default async function GamePage({
  params
}: {
  params: Promise<GamePageParams>;
}) {
  const { locale, org, tournament, gameId } = await params;
  setRequestLocale(locale);

  const [game, tournamentEntity, t] = await Promise.all([
    loadGame(gameId),
    loadTournament(org, tournament),
    getTranslations('game')
  ]);

  if (!game) notFound();

  return (
    <main
      data-testid="game-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6">
        {/* Tournament pages still live in the CMS until the _redirects rollout
            moves them here, so this link must stay absolute. */}
        <a
          href={`${CMS_URL}/${org}/${tournament}`}
          className="text-sm font-semibold text-primary-dark hover:underline"
        >
          {tournamentEntity ? tournamentEntity.name : t('backToTournament')}
        </a>

        <GameCard
          game={game}
          names={gameTeamNames(game, t('undecidedTeam'))}
          datetime={formatGameDateTime(game.datetime, locale)}
          venue={gameVenue(game.location, game.city)}
          liveLabel={t('live')}
          scoreboardUrl={SCOREBOARD_URL}
        />

        {game.youTubeCode && (
          <GameVideo youTubeCode={game.youTubeCode} title={t('videoTitle')} />
        )}
      </div>
    </main>
  );
}
