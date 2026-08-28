import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getPhase,
  getGamesByPhaseId,
  getTournamentBySlug,
  type DrawEntity,
  type EliminationEntity,
  type EliminationStatEntity,
  type PhaseEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import { Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { buildPageMetadata } from '@/src/seo/metadata';
import { gamesByDate, type GameDay } from '@/src/games/gamesByDate';
import { formatGameTime } from '@/src/games/gameDateTime';
import { teamDisplayName } from '@/src/games/gameTeams';

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

// generateMetadata and the page both need the tournament; cache() keeps that to
// a single request instead of fetching it twice per view.
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
  const { locale, org, tournament: tournamentSlug, phaseId } = routeParams;
  const [phase, tournament, t, tGame] = await Promise.all([
    loadPhase(phaseId),
    loadTournament(org, tournamentSlug),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'game' })
  ]);

  const values = {
    phase: phase ? phase.title : t('phase.unknownPhase'),
    tournament: tournament ? tournament.name : tGame('unknownTournament')
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
  undecidedLabel: string;
}

function GamesSchedule({ days, locale, undecidedLabel }: GamesScheduleProps) {
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
                homeTeamName={teamDisplayName(
                  game.homeTeam,
                  game.homePlaceholder,
                  undecidedLabel
                )}
                awayTeamName={teamDisplayName(
                  game.awayTeam,
                  game.awayPlaceholder,
                  undecidedLabel
                )}
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

// A team stat row can name a team the tournament's roster no longer carries
// (or none at all yet, for a group still being seeded) — the empty entity
// lets teamDisplayName fall through to the placeholder/fallback label instead
// of every caller null-checking the lookup.
const EMPTY_TEAM: TeamEntity = {
  id: '',
  name: '',
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
};

// Same crest treatment as the team and game pages (times/[teamId]/page.tsx,
// jogos/[gameId]/page.tsx) — no shared component yet (packages/ui Task 16
// tech debt), so this is this file's own copy of the established pattern.
function TeamCrest({
  logoUrl,
  isDimmed = false
}: {
  logoUrl: string;
  isDimmed?: boolean;
}) {
  return (
    // Team logos live on arbitrary user-uploaded hosts: next/image would need
    // each one allow-listed in next.config.js.
    <img
      src={logoUrl}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      className={`h-5 w-5 shrink-0 rounded-full object-cover ${isDimmed ? 'opacity-60' : ''}`}
    />
  );
}

// A tournament that failed to resolve leaves every team display falling
// through to its placeholder/fallback label, the same non-fatal shape as an
// unreachable companion fetch elsewhere on this page.
const teamById = (
  tournament: TournamentWithTeamsEntity | null
): Record<string, TeamEntity> =>
  Object.fromEntries((tournament?.teams || []).map(team => [team.id, team]));

interface PhaseTabsProps {
  routeParams: PhasePageParams;
  phases: PhaseEntity[];
}

// Every phase of the tournament is a tab; each tab is a plain link to that
// phase's own page — no client state, the URL is the source of truth for
// which tab is active.
function PhaseTabs({ routeParams, phases }: PhaseTabsProps) {
  if (phases.length < 2) return null;

  const { locale, org, tournament } = routeParams;

  return (
    <nav className="flex flex-wrap gap-2 border-b border-border">
      {[...phases]
        .sort((phaseA, phaseB) => phaseA.order - phaseB.order)
        .map(phase => {
          const isActive = phase.id === routeParams.phaseId;

          return (
            <Link
              key={phase.id}
              href={`/${locale}/${org}/${tournament}/fases/${phase.id}`}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {phase.title}
            </Link>
          );
        })}
    </nav>
  );
}

// Same visual language as the roster/player stats tables
// (times/[teamId]/RosterStatsTable.tsx, estatisticas' PlayerStatsTable.tsx) —
// opaque color-mix band, sticky rank+team columns, tabular-nums stat cells.
// No shared table primitive yet (packages/ui Task 16 tech debt calls this
// out across all three), so these tokens are this file's own copy.
const HEADER_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_40%,var(--color-surface))]';
const RANK_CELL = 'sticky left-0 z-20 w-12 px-4 md:px-6';
const TEAM_CELL =
  'sticky left-12 z-20 whitespace-nowrap pr-6 shadow-[8px_0_6px_-6px_var(--shadow-elevated)] md:left-16';
const STAT_CELL = 'whitespace-nowrap px-3 text-right last:pr-6 md:px-4';
const ROW_HEIGHT = 'h-[43px] md:h-[49px]';
const BAND_LABEL = 'text-left text-xs font-bold uppercase tracking-[0.5px]';

interface StandingsGroupProps {
  elimination: EliminationEntity;
  stats: EliminationStatEntity[];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamLabel: string;
}

// A phase's ranking criteria include internal tie-breakers (head-to-head
// record) alongside the columns organizers actually publish — only the
// "overall" ones are meant to be seen (apps/cms/src/Phases/selectors.ts
// visibleEliminationStats).
const visibleEliminationStats = (
  stats: EliminationStatEntity[]
): EliminationStatEntity[] =>
  stats.filter(stat => stat.rankingCriteria === 'overall');

function StandingsGroup({
  elimination,
  stats,
  teams,
  undecidedLabel,
  teamLabel
}: StandingsGroupProps) {
  const visibleStats = visibleEliminationStats(stats);

  return (
    <Surface className="overflow-hidden">
      {elimination.title && (
        <h2 className="border-b border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-muted">
          {elimination.title}
        </h2>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className={`${HEADER_BAND} ${ROW_HEIGHT} text-foreground`}>
              <th scope="col" className={`${RANK_CELL} ${HEADER_BAND} ${BAND_LABEL}`} />
              <th scope="col" className={`${TEAM_CELL} ${HEADER_BAND} ${BAND_LABEL}`}>
                {teamLabel}
              </th>
              {visibleStats.map(stat => (
                <th key={stat.id} scope="col" className={`${STAT_CELL} ${BAND_LABEL}`}>
                  {stat.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {elimination.teamStats.map((teamStat, index) => {
              const team = teamOrEmpty(teams, teamStat.teamId);

              return (
                <tr key={teamStat.id} className={`${ROW_HEIGHT} border-b border-border/60`}>
                  <td className={`${RANK_CELL} bg-surface text-xs tabular-nums text-muted`}>
                    {index + 1}
                  </td>
                  <td className={`${TEAM_CELL} bg-surface text-sm font-semibold text-foreground`}>
                    <span className="flex items-center gap-2">
                      {team.logoUrl && <TeamCrest logoUrl={team.logoUrl} />}
                      <span className="truncate">
                        {teamDisplayName(team, teamStat.placeholder, undecidedLabel)}
                      </span>
                    </span>
                  </td>
                  {visibleStats.map(stat => (
                    <td key={stat.id} className={`${STAT_CELL} notranslate text-xs tabular-nums`}>
                      {teamStat.stats[stat.id] ?? ''}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

interface EliminationStandingsProps {
  eliminations: EliminationEntity[];
  stats: EliminationStatEntity[];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamLabel: string;
}

function EliminationStandings({
  eliminations,
  stats,
  teams,
  undecidedLabel,
  teamLabel
}: EliminationStandingsProps) {
  return (
    <div className="flex flex-col gap-6">
      {[...eliminations]
        .sort((eliminationA, eliminationB) => eliminationA.order - eliminationB.order)
        .map(elimination => (
          <StandingsGroup
            key={elimination.id}
            elimination={elimination}
            stats={stats}
            teams={teams}
            undecidedLabel={undecidedLabel}
            teamLabel={teamLabel}
          />
        ))}
    </div>
  );
}

interface DrawMatchCardProps {
  match: DrawEntity['matches'][number];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
}

const scoreOf = (rawScore: string): number => Number(rawScore) || 0;

const teamOrEmpty = (
  teams: Record<string, TeamEntity>,
  teamId: string
): TeamEntity => teams[teamId] || EMPTY_TEAM;

function DrawMatchName({ name }: { name: string }) {
  if (!name) return null;

  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
      {name}
    </p>
  );
}

function DrawMatchInfo({ info }: { info: string }) {
  if (!info) return null;

  return <p className="mt-2 text-center text-xs text-muted">{info}</p>;
}

interface DrawScoreSideProps {
  team: TeamEntity;
  placeholder: string;
  undecidedLabel: string;
  isWinner: boolean;
  align: 'left' | 'right';
}

function DrawScoreSide({
  team,
  placeholder,
  undecidedLabel,
  isWinner,
  align
}: DrawScoreSideProps) {
  const emphasis = isWinner ? 'font-bold text-foreground' : 'text-muted';
  const isRight = align === 'right';

  return (
    <span
      className={`flex min-w-0 items-center gap-2 ${isRight ? 'flex-row-reverse' : ''}`}
    >
      {team.logoUrl && <TeamCrest logoUrl={team.logoUrl} isDimmed={!isWinner} />}
      <span className={`truncate ${emphasis}`}>
        {teamDisplayName(team, placeholder, undecidedLabel)}
      </span>
    </span>
  );
}

function DrawMatchCard({ match, teams, undecidedLabel }: DrawMatchCardProps) {
  const firstScore = scoreOf(match.firstTeamScore);
  const secondScore = scoreOf(match.secondTeamScore);

  return (
    <Surface className="p-4">
      <DrawMatchName name={match.name} />
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
        <DrawScoreSide
          team={teamOrEmpty(teams, match.firstTeamId)}
          placeholder={match.firstTeamPlaceholder}
          undecidedLabel={undecidedLabel}
          isWinner={firstScore > secondScore}
          align="left"
        />
        <span className="tabular-nums font-semibold text-foreground">
          {firstScore} x {secondScore}
        </span>
        <DrawScoreSide
          team={teamOrEmpty(teams, match.secondTeamId)}
          placeholder={match.secondTeamPlaceholder}
          undecidedLabel={undecidedLabel}
          isWinner={secondScore > firstScore}
          align="right"
        />
      </div>
      <DrawMatchInfo info={match.info} />
    </Surface>
  );
}

interface DrawBracketProps {
  draws: DrawEntity[];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
}

function DrawBracket({ draws, teams, undecidedLabel }: DrawBracketProps) {
  return (
    <div className="flex flex-col gap-6">
      {[...draws]
        .sort((drawA, drawB) => drawA.order - drawB.order)
        .map(draw => (
          <div key={draw.id} className="flex flex-col gap-2">
            {draw.title && (
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {draw.title}
              </h2>
            )}
            <div className="flex flex-col gap-3">
              {draw.matches.map(match => (
                <DrawMatchCard
                  key={match.id}
                  match={match}
                  teams={teams}
                  undecidedLabel={undecidedLabel}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

// Whether a phase has a main content block to show above its games, and
// which one — kept as pure lookups so no component branches on both the
// type and the data in the same expression.
const hasStandings = (phase: PhaseEntity): boolean =>
  phase.type === 'elimination' && phase.eliminations.length > 0;

const hasBracket = (phase: PhaseEntity): boolean =>
  phase.type === 'draw' && phase.draws.length > 0;

interface PhaseMainContentProps {
  phase: PhaseEntity;
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamLabel: string;
}

function PhaseMainContent({
  phase,
  teams,
  undecidedLabel,
  teamLabel
}: PhaseMainContentProps) {
  if (hasStandings(phase)) {
    return (
      <EliminationStandings
        eliminations={phase.eliminations}
        stats={phase.eliminationStats}
        teams={teams}
        undecidedLabel={undecidedLabel}
        teamLabel={teamLabel}
      />
    );
  }

  if (hasBracket(phase)) {
    return (
      <DrawBracket draws={phase.draws} teams={teams} undecidedLabel={undecidedLabel} />
    );
  }

  return null;
}

interface PhaseGamesSectionProps {
  days: GameDay[];
  locale: string;
  undecidedLabel: string;
  noGamesLabel: string;
}

function PhaseGamesSection({
  days,
  locale,
  undecidedLabel,
  noGamesLabel
}: PhaseGamesSectionProps) {
  if (days.length === 0) {
    return (
      <Surface className="p-6">
        <p className="text-sm text-muted">{noGamesLabel}</p>
      </Surface>
    );
  }

  return <GamesSchedule days={days} locale={locale} undecidedLabel={undecidedLabel} />;
}

interface PhaseBodyProps {
  routeParams: PhasePageParams;
  phase: PhaseEntity;
  tournament: TournamentWithTeamsEntity | null;
  games: GameDay[];
  locale: string;
  undecidedLabel: string;
  teamLabel: string;
  noGamesLabel: string;
}

// Everything below the page title branches on the phase and the (optional)
// tournament — isolated here so PhasePage itself only has to decide whether
// the phase exists at all.
function PhaseBody({
  routeParams,
  phase,
  tournament,
  games,
  locale,
  undecidedLabel,
  teamLabel,
  noGamesLabel
}: PhaseBodyProps) {
  return (
    <>
      {tournament && (
        <PhaseTabs routeParams={routeParams} phases={tournament.phases} />
      )}
      {/* Same shape as the CMS's PhaseHome: main content on the wide side,
          the phase's games as a sidebar next to it — stacked on mobile. */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-6 lg:flex-[2]">
          <PhaseMainContent
            phase={phase}
            teams={teamById(tournament)}
            undecidedLabel={undecidedLabel}
            teamLabel={teamLabel}
          />
        </div>
        <aside className="lg:flex-1">
          <PhaseGamesSection
            days={games}
            locale={locale}
            undecidedLabel={undecidedLabel}
            noGamesLabel={noGamesLabel}
          />
        </aside>
      </div>
    </>
  );
}

export default async function PhasePage({
  params
}: {
  params: Promise<PhasePageParams>;
}) {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug, phaseId } = routeParams;
  setRequestLocale(locale);

  const [phase, tournament, games, tPhase, tGame] = await Promise.all([
    loadPhase(phaseId),
    loadTournament(org, tournamentSlug),
    loadGames(phaseId),
    getTranslations('phase'),
    getTranslations('game')
  ]);

  if (!phase) notFound();

  return (
    <main
      data-testid="phase-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
          {phase.title}
        </h1>
        <PhaseBody
          routeParams={routeParams}
          phase={phase}
          tournament={tournament}
          games={gamesByDate(games, locale)}
          locale={locale}
          undecidedLabel={tGame('undecidedTeam')}
          teamLabel={tPhase('team')}
          noGamesLabel={tPhase('noGames')}
        />
      </div>
    </main>
  );
}
