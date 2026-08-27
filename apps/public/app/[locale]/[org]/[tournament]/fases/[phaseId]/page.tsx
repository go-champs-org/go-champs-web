import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPhase, getGamesByPhaseId, type PhaseEntity } from '@gochamps/api-client';
import { Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { buildPageMetadata } from '@/src/seo/metadata';
import { gamesByDate, type GameDay } from '@/src/games/gamesByDate';
import { formatGameTime } from '@/src/games/gameDateTime';

// Games in a phase move frequently, so the rendered HTML is reused for a short
// window instead of hitting the API on every view.
export const revalidate = 60;

// The phase list is unbounded, so nothing is prerendered at build time —
// declaring the params is what puts this route on the ISR path.
export async function generateStaticParams() {
  return [];
}

interface PhasePageParams {
  locale: string;
  org: string;
  tournament: string;
  phaseId: string;
}

const phasePagePath = ({ org, tournament, phaseId }: PhasePageParams): string =>
  `/${org}/${tournament}/fases/${phaseId}`;

// generateMetadata and the page both need the phase; cache() keeps that to a
// single request instead of fetching it twice per view.
const loadPhase = cache(
  async (phaseId: string): Promise<PhaseEntity | null> => {
    try {
      return await getPhase(phaseId);
    } catch (error) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }
);

// The games are a companion to the phase: an unreachable endpoint leaves the
// phase standing with an empty list instead of taking the page down.
const loadGames = (phaseId: string) =>
  getGamesByPhaseId(phaseId).catch(() => []);

export async function generateMetadata({
  params
}: {
  params: Promise<PhasePageParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, phaseId } = routeParams;
  const [phase, t] = await Promise.all([
    loadPhase(phaseId),
    getTranslations({ locale, namespace: 'metadata' })
  ]);

  const values = {
    phase: phase ? phase.title : 'Fase'
  };

  return buildPageMetadata({
    locale,
    path: phasePagePath(routeParams),
    title: t('phaseTitle', values),
    description: t('phaseDescription', values),
    noIndex: !phase
  });
}

interface GameRowProps {
  gameId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  time: string;
}

function GameRow({
  gameId,
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
  time
}: GameRowProps) {
  return (
    <div
      key={gameId}
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-border px-3 py-3 text-sm last:border-0"
    >
      <span className="truncate font-medium text-foreground">{homeTeamName}</span>
      <div className="flex flex-col items-center">
        <span className="flex items-center gap-1 tabular-nums">
          {homeScore} x {awayScore}
        </span>
        <span className="notranslate text-xs text-muted">{time}</span>
      </div>
      <span className="truncate font-medium text-foreground text-right">
        {awayTeamName}
      </span>
    </div>
  );
}

interface GamesScheduleProps {
  days: GameDay[];
  locale: string;
}

function GamesSchedule({ days, locale }: GamesScheduleProps) {
  return (
    <div className="space-y-6">
      {days.map(day => (
        <div key={day.key} className="flex flex-col gap-2">
          {day.label && (
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {day.label}
            </h2>
          )}
          <Surface className="overflow-hidden rounded-xl border border-border">
            {day.games.map(game => (
              <GameRow
                key={game.id}
                gameId={game.id}
                homeTeamName={game.homeTeam.name}
                awayTeamName={game.awayTeam.name}
                homeScore={game.homeScore}
                awayScore={game.awayScore}
                time={formatGameTime(game.datetime, locale)}
              />
            ))}
          </Surface>
        </div>
      ))}
    </div>
  );
}

export default async function PhasePage({
  params
}: {
  params: Promise<PhasePageParams>;
}) {
  const routeParams = await params;
  const { locale, phaseId } = routeParams;
  setRequestLocale(locale);

  const [phase, games, t] = await Promise.all([
    loadPhase(phaseId),
    loadGames(phaseId),
    getTranslations('phase')
  ]);

  if (!phase) notFound();

  const days = gamesByDate(games, locale);

  return (
    <main
      data-testid="phase-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
          {phase.title}
        </h1>

        {days.length > 0 ? (
          <GamesSchedule days={days} locale={locale} />
        ) : (
          <Surface className="p-6">
            <p className="text-sm text-muted">{t('noGames')}</p>
          </Surface>
        )}
      </div>
    </main>
  );
}
